# TechMarkets Pitchdeck Showcase

This repository hosts the TechMarkets pitchdeck showcase website, which presents the TechMarkets platform pitch in various formats following established pitchdeck methodologies.

## About TechMarkets

TechMarkets is a decentralized marketplace for buying and selling electronic devices using cryptocurrency. The platform facilitates transactions between buyers and sellers of new and used tech hardware, with all transactions denominated in Tezos (XTZ).

## Pitchdeck Methodologies

The showcase includes the following pitchdeck formats:

1. **Guy Kawasaki Method** - A 10-slide format focused on key aspects of the business
2. **theHustle.co Method** - An 11-slide structure emphasizing vision, problem, solution, and market
3. **Oxford Business School Method** - A structured approach to presenting business concepts
4. **Google Ventures Method** - A comprehensive format with appendix for additional information
5. **Mac Conwell Method** - A 13-slide format with storytelling approach
6. **Jason Chen Method** - A question-based format focused on problem-solving
7. **Ibtikar Fund Method** - An image-heavy presentation with minimal text

## How to Use

Simply visit the website and use the dropdown menu to switch between different pitchdeck formats.

## Local Development

To run this site locally:

1. Clone this repository
2. **Important**: You must serve the files through a local web server rather than opening them directly as files. This is because the site uses fetch requests to load the markdown files, which don't work with the `file://` protocol due to browser security restrictions.

You can use one of these methods to run a local server:

### Using Python (easiest)
```bash
# If you have Python installed:
# Navigate to the project directory, then run:
python -m http.server
# Then open your browser to: http://localhost:8000
```

### Using Node.js
```bash
# If you have Node.js installed:
# Navigate to the project directory, then run:
npx serve
# Then open your browser to the URL shown in the terminal
```

### Using PHP
```bash
# If you have PHP installed:
# Navigate to the project directory, then run:
php -S localhost:8000
# Then open your browser to: http://localhost:8000
```

## Deployment

This site is designed to be easily deployed to GitHub Pages:

1. Push the repository to GitHub
2. Enable GitHub Pages in the repository settings (Settings > Pages)
3. Select the main branch as the source
4. Your site will be available at `https://[username].github.io/[repository-name]/`

## License

© 2025 Greenfire Inc. All rights reserved.

## Contact

For inquiries about TechMarkets, please contact:
- Website: [techmarkets.io](https://techmarkets.io)
- Email: [contact@greenfire.io](mailto:contact@greenfire.io) 