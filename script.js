/* Import Inter font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap');

:root {
  --color-bg: #2a3d4b;
  --color-text-body: #d1d5db;
  --color-text-dark: #f9fafb;
  --color-primary-bg: #ffffff;
  --color-primary-text: #2a3d4b;
  --shadow-light: rgba(0,0,0,0.2);
  --shadow-medium: rgba(0,0,0,0.4);
  --radius: 0.75rem;
}

/* Reset and base styles */
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--color-bg);
  color: var(--color-text-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  min-height: 100vh;
  isolation: isolate;
}

/* Vignette overlay */
body::before {
  content: "";
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 999;
  background:
    radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 40%,
      rgba(0, 0, 0, 0.5) 90%
    );
  mix-blend-mode: multiply;
  opacity: 0.6;
}

a {
  color: var(--color-primary-bg);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover,
a:focus {
  color: #e5e7eb;
  outline: none;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem 6rem;
}

header {
  position: sticky;
  top: 0;
  background-color: #1f2b38;
  box-shadow: 0 2px 12px var(--shadow-medium);
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 800;
  font-size: 1.5rem;
  color: var(--color-primary-bg);
  letter-spacing: 0.05em;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  padding: 0;
  margin: 0;
}

/* Tablist style */
.tablist {
  display: flex;
  gap: 1.5rem;
}

.tablist button {
  background: none;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-primary-bg);
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: var(--radius);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tablist button[aria-selected="true"] {
  background-color: var(--color-primary-bg);
  color: var(--color-primary-text);
  cursor: default;
}

.tablist button:focus-visible {
  outline: 2px solid var(--color-primary-bg);
  outline-offset: 2px;
}

.hero {
  text-align: center;
  padding-top: 8rem;
  padding-bottom: 4rem;
}

.hero h1 {
  font-weight: 800;
  color: var(--color-primary-bg);
  font-size: 3rem;
  max-width: 700px;
  margin: 0 auto 1rem;
  line-height: 1.1;
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 4rem;
  }
}

.hero p {
  font-weight: 500;
  font-size: 1.25rem;
  max-width: 560px;
  margin: 0 auto 2.5rem;
  color: #d1d5db;
}

.hero .cta-button {
  background-color: var(--color-primary-bg);
  color: var(--color-primary-text);
  font-weight: 700;
  font-size: 1.25rem;
  padding: 1rem 3rem;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255 255 255 / 0.4);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.hero .cta-button:hover,
.hero .cta-button:focus {
  background-color: #f4f4f5;
  outline: none;
  transform: scale(1.05);
}

/* Hide panels by default */
[role="tabpanel"] {
  display: none;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

[role="tabpanel"].active {
  display: block;
  opacity: 1;
  transform: translateY(0);
}

/* About section styling (inside about tab) */
.about-section {
  background-color: #324759;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px var(--shadow-medium);
  padding: 3rem 2.5rem;
  max-width: 800px;
  margin: 0 auto;
  color: var(--color-primary-bg);
}

.about-section h2 {
  font-weight: 800;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-section p {
  font-weight: 500;
  font-size: 1.125rem;
  color: #d1d5db;
  line-height: 1.6;
}

.main-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .main-section {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  background-color: #3f536a;
  border-radius: var(--radius);
  box-shadow: 0 4px 12px var(--shadow-medium);
  padding: 2.5rem 2rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: var(--color-primary-bg);
}

.card h2 {
  font-weight: 700;
  color: var(--color-primary-bg);
  font-size: 1.75rem;
  margin: 0 0 1rem;
}

label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-primary-bg);
  font-size: 1rem;
}

input[type="file"] {
  font-size: 1rem;
  color: var(--color-primary-bg);
  background-color: #516b87;
  border: none;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

input[type="file"]:hover,
input[type="file"]:focus {
  background-color: #6380ac;
  outline: none;
}

input[type="password"] {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1.5px solid #6b7e99;
  border-radius: 0.5rem;
  background-color: #516b87;
  color: var(--color-primary-bg);
  transition: border-color 0.3s ease;
}

input[type="password"]::placeholder {
  color: #cbd5e1;
}

input[type="password"]:focus {
  border-color: var(--color-primary-bg);
  outline: none;
  background-color: #6380ac;
}

button.action-btn {
  background-color: var(--color-primary-bg);
  color: var(--color-primary-text);
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  border-radius: var(--radius);
  border: none;
  cursor: pointer;
  align-self: start;
  box-shadow: 0 4px 14px rgba(255 255 255 / 0.5);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button.action-btn:disabled {
  background-color: #7a8a9e;
  cursor: not-allowed;
  box-shadow: none;
}

button.action-btn:hover:not(:disabled),
button.action-btn:focus:not(:disabled) {
  background-color: #e2e8f0;
  color: var(--color-bg);
  outline: none;
  transform: scale(1.05);
}

.status-message {
  font-weight: 600;
  font-size: 1rem;
  color: var(--color-primary-bg);
  min-height: 1.25rem;
  user-select: none;
  white-space: pre-wrap;
}

.download-link {
  margin-top: 0.8rem;
  display: inline-block;
  font-weight: 600;
  color: var(--color-primary-bg);
  text-decoration: underline;
  cursor: pointer;
}

.download-link:hover,
.download-link:focus {
  color: #f0f9ff;
  outline: none;
}

