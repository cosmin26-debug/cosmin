A bilingual personal portfolio website built with React and Vite. The site is a fully static application, requiring no backend or server-side rendering. After building, it consists of standard HTML, CSS, and JavaScript files that can be hosted on any static hosting platform.

The project is currently deployed with GitHub Pages, which provides a simple, free, and reliable hosting solution well suited for static websites.

# Tech Stack
React
Vite
JavaScript
CSS
GitHub Pages
Features
Fully responsive design
English and Italian localization
Accessible navigation and interactions
SEO-friendly metadata and structured sharing previews
Static deployment with no backend dependencies
Internationalization

*The website supports both English and Italian.*

# Language selection follows this priority:

A previously selected language stored in localStorage
The visitor's browser language (Italian browsers default to Italian)
English as the fallback language

# All interface text is managed in:

src/i18n/translations.js

Each string is defined in both English and Italian, allowing the entire interface to switch languages consistently.

Project content is also localized within:

src/data/projects.js
Project Data

Projects displayed in the Work section are generated from the data stored in:

src/data/projects.js

# Each project contains information such as:

- title
- year
- status
- location
- localized descriptions
- technology tags
- external link
- preview image

The Work section is rendered dynamically from this data.

# SEO

The project includes SEO scaffolding for deployment on a custom domain.

Several files contain placeholder URLs that should be replaced with the production domain before deployment:

index.html
public/robots.txt
public/sitemap.xml

The repository also includes:

canonical URLs
Open Graph metadata
Twitter Card metadata
sitemap
robots.txt

Social media previews use:

public/og-image.png

The recommended image size is 1200 × 630 px.

After deployment, the sitemap can be submitted to Google Search Console to improve indexing, and the Open Graph preview can be verified using tools such as OpenGraph.xyz.

# Accessibility

Accessibility was considered throughout the project.

Implemented features include:

support for prefers-reduced-motion
visible keyboard focus indicators
skip-to-content navigation
dynamic <html lang> updates
localized page titles and descriptions
WCAG-conscious color contrast improvements for readability

Interactive animations automatically disable for users who prefer reduced motion while maintaining the overall visual appearance of the site.

Deployment

The application is designed for static hosting and can be deployed to platforms including:

GitHub Pages
Netlify
Vercel
Cloudflare Pages
Any static web server

Running a production build generates static assets that require no server-side processing.
