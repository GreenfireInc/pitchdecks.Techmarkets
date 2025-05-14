// Define paths to markdown files
const pitchdeckPaths = {
    guyKawasaki: './pitchdecks/20250513.Techmarkets.pitchdeckType.guyKawasaki.md',
    theHustle: './pitchdecks/20250513.Techmarkets.pitchdeckType.theHustle.md',
    saidBusinessSchool: './pitchdecks/20250513.Techmarkets.pitchdeckType.saidBusinessSchool.md',
    customCurated: './pitchdecks/20250513.Techmarkets.pitchdeckType.customCurated.md',
    googleVentures: './pitchdecks/20250513.Techmarkets.pitchdeckType.googleVentures.md',
    macConwell: './pitchdecks/20250513.Techmarkets.pitchdeckType.macConwell.md',
    ibtikarFund: './pitchdecks/20250513.Techmarkets.pitchdeckType.ibtikarFund.md',
    yCombinator: './pitchdecks/20250513.Techmarkets.pitchdeckType.yCombinator.md',
    pillar: './pitchdecks/20250513.Techmarkets.pitchdeckType.pillar.md',
    jasonChen: './pitchdecks/20250513.Techmarkets.pitchdeckType.jasonChen.md'
};

// DOM elements
const deckTypeSelect = document.getElementById('deck-type');
const deckContent = document.getElementById('deck-content');

// Set up marked options
marked.setOptions({
    breaks: true,
    gfm: true,
    headerIds: true,
    highlight: function (code, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
                console.error(err);
            }
        }
        return code;
    }
});

// Function to load a pitchdeck by key
async function loadPitchdeck(key) {
    try {
        deckContent.innerHTML = '<div class="loading">Loading...</div>';
        
        // Add cache-busting parameter to avoid caching issues
        const url = `${pitchdeckPaths[key]}?t=${new Date().getTime()}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const markdown = await response.text();
            deckContent.innerHTML = marked.parse(markdown);
            
            // Process image URLs for Ibtikar Fund pitchdeck
            if (key === 'ibtikarFund') {
                processIbtikarImages();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (fetchError) {
            console.error('Fetch error:', fetchError);
            
            // Fallback to XMLHttpRequest if fetch fails
            const xhr = new XMLHttpRequest();
            xhr.open('GET', pitchdeckPaths[key], true);
            
            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 400) {
                    const markdown = xhr.responseText;
                    deckContent.innerHTML = marked.parse(markdown);
                    
                    // Process image URLs for Ibtikar Fund pitchdeck
                    if (key === 'ibtikarFund') {
                        processIbtikarImages();
                    }
                } else {
                    showError(`Failed to load file (status: ${xhr.status})`);
                }
            };
            
            xhr.onerror = function() {
                showError('Network error occurred');
            };
            
            xhr.send();
        }
    } catch (error) {
        showError(error.message);
    }
}

// Helper function to show error message
function showError(message) {
    console.error('Error loading pitchdeck:', message);
    deckContent.innerHTML = `
        <div class="error">
            <h3>Error loading pitchdeck</h3>
            <p>${message}</p>
            <p>If you're viewing this locally, make sure you're using a local server instead of opening the file directly.</p>
            <p>For example, you can use: <code>python -m http.server</code> or <code>npx serve</code></p>
        </div>
    `;
}

// Function to replace placeholder images in Ibtikar Fund pitchdeck
function processIbtikarImages() {
    // We'll replace the placeholder techmarkets.io URLs with actual demo images
    const images = {
        'logo.png': 'https://via.placeholder.com/200x60?text=TechMarkets+Logo',
        'secure-transaction.png': 'https://via.placeholder.com/800x400?text=Secure+Transaction+Demo',
        'trust-gap.png': 'https://via.placeholder.com/800x400?text=Trust+Gap+Illustration',
        'smart-contract.png': 'https://via.placeholder.com/800x400?text=Smart+Contract+Diagram',
        'platform-demo.png': 'https://via.placeholder.com/800x450?text=Platform+Demo+Screenshot',
        'market-growth.png': 'https://via.placeholder.com/800x400?text=Market+Growth+Chart',
        'revenue-streams.png': 'https://via.placeholder.com/800x400?text=Revenue+Streams+Diagram',
        'roadmap.png': 'https://via.placeholder.com/800x400?text=Development+Roadmap',
        'competitive-matrix.png': 'https://via.placeholder.com/800x400?text=Competitive+Matrix',
        'acquisition-funnel.png': 'https://via.placeholder.com/800x400?text=Customer+Acquisition+Funnel',
        'team.png': 'https://via.placeholder.com/800x400?text=Team+Photo',
        'funding-allocation.png': 'https://via.placeholder.com/800x400?text=Funding+Allocation+Chart',
        'exit-path.png': 'https://via.placeholder.com/800x400?text=Exit+Strategy+Diagram',
        'vision.png': 'https://via.placeholder.com/800x400?text=Vision+Illustration'
    };
    
    const imgElements = deckContent.querySelectorAll('img');
    imgElements.forEach(img => {
        const src = img.getAttribute('src');
        if (src.includes('techmarkets.io')) {
            // Extract filename from URL
            const filename = src.split('/').pop();
            if (images[filename]) {
                img.setAttribute('src', images[filename]);
            }
        }
    });
}

// Event listener for dropdown change
deckTypeSelect.addEventListener('change', function() {
    loadPitchdeck(this.value);
});

// Load default pitchdeck on page load
document.addEventListener('DOMContentLoaded', function() {
    loadPitchdeck(deckTypeSelect.value);
}); 