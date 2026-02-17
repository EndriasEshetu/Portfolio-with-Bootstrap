# Portfolio | Endrias Eshetu

A Bootstrap-based personal portfolio site with sections for skills, experience, achievements, projects, certificates, and contact details. Includes a certificate form that saves entries to localStorage on the current device.

## Features

- Hero, about, skills, experience, achievements, projects, and contact sections
- Certificate form with localStorage persistence and clear-all option
- Responsive layout with Bootstrap 5.3.8 and custom styling
- Skip link and semantic sections for improved accessibility
- Dynamic footer year

## Tech Stack

- HTML5, CSS3, JavaScript (vanilla)
- Bootstrap 5.3.8 (CDN)
- Google Fonts: Playfair Display, Space Grotesk

## Getting Started

1. Clone the repository.
2. Open `bootstrap.html` in your browser.

Optional: use a local server (VS Code Live Server) for the best experience.

## Project Structure

```
bootstrap.html         # Main page
style.css              # Theme and layout styles
index.js               # Certificates logic and footer year
jsconfig.json          # JS tooling config
types/
  bootstrap-global.d.ts # Bootstrap global type hints
```

## Customize

- Update text and links directly in `bootstrap.html`.
- Update contact details and social links in the contact section.
- Replace the hero image with your own image URL.
- Adjust colors and typography in `style.css`.

## Notes

- Certificates are stored in browser localStorage on the same device.
- No build step is required.
