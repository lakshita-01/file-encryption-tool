 'use strict';

  // Utils for array buffer and Hex converters to show keys if needed
  function bufToHex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
  }

  async function deriveKey(password, salt, keyUsage) {
    // Password key -> PBKDF2 salt -> AES-GCM key
    const enc = new TextEncoder();
    const passKey = await crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      passKey,
      { name: 'AES-GCM', length: 256 },
      false,
      keyUsage
    );
  }

  async function encryptData(password, data) {
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt, ['encrypt']);
    const encrypted = await crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );
    // Structure of encrypted data:
    // [salt(16 bytes)] + [iv(12 bytes)] + [ciphertext]
    const combined = new Uint8Array(salt.byteLength + iv.byteLength + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.byteLength);
    combined.set(new Uint8Array(encrypted), salt.byteLength + iv.byteLength);
    return combined.buffer;
  }

  async function decryptData(password, encryptedBuffer) {
    const combined = new Uint8Array(encryptedBuffer);
    if (combined.length < 16 + 12 + 16) {
      // minimal ciphertext length check (salt + iv + tag)
      throw new Error('Data too short or corrupted.');
    }
    const salt = combined.slice(0,16);
    const iv = combined.slice(16,28);
    const ciphertext = combined.slice(28);
    const key = await deriveKey(password, salt, ['decrypt']);
    const decrypted = await crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      ciphertext
    );
    return decrypted;
  }

  // File helpers
  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsArrayBuffer(file);
    });
  }

  function downloadFile(buffer, filename) {
    const blob = new Blob([buffer], {type: 'application/octet-stream'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }

  // UI state toggling and validation helpers
  function validateEncryptForm() {
    const file = document.getElementById('encrypt-file').files[0];
    const pw = document.getElementById('encrypt-password').value;
    document.getElementById('encrypt-btn').disabled = !(file && pw.length >= 4);
  }

  function validateDecryptForm() {
    const file = document.getElementById('decrypt-file').files[0];
    const pw = document.getElementById('decrypt-password').value;
    document.getElementById('decrypt-btn').disabled = !(file && pw.length >= 4);
  }

  // Event handlers
  document.getElementById('encrypt-file').addEventListener('change', validateEncryptForm);
  document.getElementById('encrypt-password').addEventListener('input', validateEncryptForm);

  document.getElementById('decrypt-file').addEventListener('change', validateDecryptForm);
  document.getElementById('decrypt-password').addEventListener('input', validateDecryptForm);

  document.getElementById('encrypt-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('encrypt-status');
    statusEl.textContent = 'Encrypting... Please wait.';
    const fileInput = document.getElementById('encrypt-file');
    const password = document.getElementById('encrypt-password').value;
    if (!fileInput.files.length) {
      statusEl.textContent = 'Please select a file to encrypt.';
      return;
    }
    try {
      const file = fileInput.files[0];
      const fileData = await readFileAsArrayBuffer(file);
      const encryptedData = await encryptData(password, fileData);
      const encryptedFilename = file.name + '.enc';
      downloadFile(encryptedData, encryptedFilename);
      statusEl.textContent = `Encryption successful! Downloading "${encryptedFilename}"`;
    } catch (err) {
      statusEl.textContent = 'Encryption failed: ' + err.message;
    }
  });

  document.getElementById('decrypt-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('decrypt-status');
    statusEl.textContent = 'Decrypting... Please wait.';
    const fileInput = document.getElementById('decrypt-file');
    const password = document.getElementById('decrypt-password').value;
    if (!fileInput.files.length) {
      statusEl.textContent = 'Please select a file to decrypt.';
      return;
    }
    try {
      const file = fileInput.files[0];
      const encryptedData = await readFileAsArrayBuffer(file);
      const decryptedData = await decryptData(password, encryptedData);
      // Attempt to auto-remove .enc extension or use original name
      let originalFilename = file.name;
      if (originalFilename.endsWith('.enc')) {
        originalFilename = originalFilename.slice(0, -4);
      } else {
        originalFilename = 'decrypted_' + originalFilename;
      }
      downloadFile(decryptedData, originalFilename);
      statusEl.textContent = `Decryption successful! Downloading "${originalFilename}"`;
    } catch (err) {
      if (err.name === 'OperationError') {
        statusEl.textContent = 'Decryption failed: Incorrect key or corrupted file.';
      } else {
        statusEl.textContent = 'Decryption failed: ' + err.message;
      }
    }
  });

  // Hero CTA button focus moves to encrypt password input
  document.getElementById('focusEncrypt').addEventListener('click', () => {
    document.getElementById('encrypt-password').focus();
  });
