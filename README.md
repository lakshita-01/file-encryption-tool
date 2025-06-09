# File Encryption/Decryption Tool

A secure and user-friendly web application that lets you encrypt and decrypt files directly in your browser using AES-GCM encryption. No data ever leaves your device, ensuring your sensitive information stays private and protected.

---
URL: encrypt-decrypt-manager.netlify.app

## Features

- **Client-side file encryption and decryption** with a password of your choice  
- Modern **AES-GCM** encryption with strong key derivation (PBKDF2 + SHA-256)  
- Simple, elegant interface optimized for ease of use and clarity  
- Responsive design with a clean, minimal aesthetic and well-structured layout  
- Ability to select any file to encrypt or decrypt  
- Instant download of encrypted (.enc) or decrypted files  
- All operations run locally; no data is uploaded or transmitted  

---

## Design & User Experience

This project follows a modern, minimalistic design inspired by high-end developer tools and component libraries:

- Dark blue-gray background (#2a3d4b) with a subtle vignette effect for depth  
- Bold, elegant typography using the Inter font for clear hierarchy  
- Cards with soft rounded corners and subtle shadows for focus and separation  
- Sticky top navigation with accessible, keyboard-navigable tabbed pages (Home/About)  
- Smooth transitions and interactive feedback on buttons and navigation  
- Clear visual hierarchy with ample whitespace for readability and focus  

---

## Getting Started

### Prerequisites

- A modern web browser with support for the Web Crypto API (most current browsers)  

### Installation

Clone or download the `file-encryption-tool` directory with the following files:

- `index.html` — Main markup and layout  
- `styles.css` — CSS styles with dark theme and vignette  
- `script.js` — JavaScript functionality for encryption, decryption, and navigation  

Open `index.html` in your browser to use the app immediately; no build steps are required.

---

## How to Use

1. **Encrypt a File:**  
   - Navigate to the Home tab if not there already.  
   - Select a file to encrypt.  
   - Enter a password (minimum 4 characters).  
   - Click "Encrypt File".  
   - Download prompt will appear for the encrypted file with the `.enc` extension.

2. **Decrypt a File:**  
   - Select an encrypted file (*.enc).  
   - Enter the password used to encrypt it.  
   - Click "Decrypt File".  
   - Download prompt will appear for the decrypted file with the original filename (or prefixed with `decrypted_` if original extension not detected).

3. **About Tab:**  
   - Learn about the app purpose and design philosophy.

---

## Security Notes

- Encryption and decryption happen locally in the browser using the Web Crypto API; no file data is sent over the network.  
- The encryption key is derived from your password using PBKDF2 with 100,000 iterations and SHA-256 hashing.  
- The encrypted file stores the salt and initialization vector (IV) internally to enable decryption.  
- Strong passwords are recommended to ensure security.  

---

## Technologies Used

- HTML5 with semantic elements and ARIA roles for accessibility  
- Modern CSS including custom properties, grid and flexbox layouts, and advanced selectors  
- JavaScript leveraging the Web Crypto API for secure cryptographic operations  

---

## License

This project is open-source and free to use or modify.

---

## Acknowledgments

Inspired by minimalist and elegant developer tools prioritizing clarity, usability, and strong visual hierarchy.

