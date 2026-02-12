// =========================================================
//  CUSTOMIZE: ZAMBIAN PROPERTY DATA
//  Prices are in ZMW (Kwacha).
//  To add a new property: Copy an existing object { ... }, paste it after the last one, and edit the values.
//  To remove: Delete an object.
//  For images: Use URLs from Unsplash or upload to assets/images/ and change src to "assets/images/yourfile.jpg"
// =========================================================

const properties = [
    {
        id: 1,
        title: "Modern 4-Bed House in Kabulonga",
        price: 4500000,
        type: "sale",
        location: "Lusaka - Kabulonga",
        beds: 4,
        baths: 3.5,
        sqm: 450,
        image: "assets/images/house1.jpg",
        description: "Executive family home in the heart of Kabulonga. Features a large swimming pool, manicured gardens, electric fence, and borehole. Close to Centro Mall and international schools."
    },
    {
        id: 2,
        title: "Riverside Family Home",
        price: 2800000,
        type: "sale",
        location: "Kitwe - Riverside",
        beds: 3,
        baths: 2,
        sqm: 300,
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
        description: "Spacious 3-bedroom standalone house in a secure neighborhood. Includes a servant's quarter, paved driveway, and established fruit trees. Perfect for a growing family."
    },
    {
        id: 3,
        title: "Newly Built Flat in Ibex Hill",
        price: 12000,
        type: "rent",
        location: "Lusaka - Ibex Hill",
        beds: 2,
        baths: 2,
        sqm: 120,
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
        description: "Modern 2-bedroom apartment in a secure complex. Fully fitted kitchen, air conditioning, and 24/7 security guards. Rent includes water and garbage collection."
    },
    {
        id: 4,
        title: "Prime Residential Plot",
        price: 250000,
        type: "sale",
        location: "Ndola - Hillcrest",
        beds: 0,
        baths: 0,
        sqm: 1200, // Land size
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
        description: "1200sqm wall-fenced plot ready for development. Title deeds available. Located near the tarmac road with ZESCO power connection nearby."
    },
    {
        id: 5,
        title: "Luxury Townhouse",
        price: 22000,
        type: "rent",
        location: "Lusaka - Roma Park",
        beds: 3,
        baths: 3,
        sqm: 250,
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
        description: "High-end living in Roma Park. This townhouse offers premium finishes, backup inverter system, communal gym, and swimming pool access."
    },
    {
        id: 6,
        title: "Farm Land / Small Holding",
        price: 850000,
        type: "sale",
        location: "Chongwe",
        beds: 0,
        baths: 0,
        sqm: 50000, // 5 Hectares approx
        image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=800&q=80",
        description: "5 Hectare small holding perfect for poultry or vegetable farming. River frontage and partially fenced. Located 15km from Chongwe town center."
    },
    {
        id: 7,
        title: "Cozy Garden Flat",
        price: 4500,
        type: "rent",
        location: "Kitwe - Parklands",
        beds: 1,
        baths: 1,
        sqm: 80,
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
        description: "Neat 1-bedroom flat suitable for a bachelor or young professional. Close to Copperhill Mall. Water tank and motorized gate."
    },
    {
        id: 8,
        title: "Holiday Home / Lodge Style",
        price: 3500000,
        type: "sale",
        location: "Livingstone",
        beds: 5,
        baths: 5,
        sqm: 600,
        image: "assets/images/house8.jpg",
        description: "Investment opportunity. Large 5-bedroom house designed as a bed & breakfast. Thatch roof features, large veranda, and proximity to Victoria Falls."
    },
    {
        id: 9,
        title: "Unfinished House (Shell)",
        price: 650000,
        type: "sale",
        location: "Lusaka - Chalala",
        beds: 3,
        baths: 2,
        sqm: 180,
        image: "assets/images/house9.jpg",
        description: "Roof-level 3-bedroom house on a 30x20m plot. Plumbing piping done. Great opportunity to finish to your own taste."
    }
];

// =========================================================
//  APP LOGIC
//  Do not change below unless you know JS; this handles filtering and display.
// =========================================================

// DOM Elements
// CUSTOMIZE: If you add new elements in HTML, add getElementById here if needed
const listingsGrid = document.getElementById('listings-grid');
const locationSelect = document.getElementById('filter-location');
const typeSelect = document.getElementById('filter-type');
const priceInput = document.getElementById('filter-price');
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const noResultsMsg = document.getElementById('no-results');

// Modal Elements
// CUSTOMIZE: If you change modal HTML IDs, update here
const modal = document.getElementById('property-modal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const modalLocation = document.getElementById('modal-location');
const modalTag = document.getElementById('modal-tag');
const modalBeds = document.getElementById('modal-beds');
const modalBaths = document.getElementById('modal-baths');
const modalSqft = document.getElementById('modal-sqft');
const modalDesc = document.getElementById('modal-description');

// 1. Initialize Application
// CUSTOMIZE: Add init calls if you extend functionality
function init() {
    populateLocationFilter();
    renderProperties(properties);
}

// 2. Format Currency (ZMW)
// CUSTOMIZE: Change currency symbol or formatting if needed
// Formats numbers like 4,500,000 -> "ZMW 4,500,000"
const formatter = new Intl.NumberFormat('en-ZM', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
});

function formatPrice(price, type) {
    const formatted = "ZMW " + formatter.format(price);
    return type === 'rent' ? `${formatted} / month` : formatted;
}

// 3. Populate Location Dropdown automatically
// CUSTOMIZE: If you want manual locations, hardcode options in HTML instead
function populateLocationFilter() {
    const locations = [...new Set(properties.map(p => p.location))];
    locations.sort();
    
    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        locationSelect.appendChild(option);
    });
}

// 4. Render Properties to the Grid
// CUSTOMIZE: Change card HTML structure if needed, but update modal too
function renderProperties(data) {
    listingsGrid.innerHTML = ''; // Clear existing
    
    if (data.length === 0) {
        noResultsMsg.classList.remove('hidden');
    } else {
        noResultsMsg.classList.add('hidden');
        
        data.forEach(property => {
            const card = document.createElement('div');
            card.className = 'card';
            card.onclick = () => openModal(property);
            
            const priceDisplay = formatPrice(property.price, property.type);
            
            // Handle beds/baths display for plots (0 beds)
            const featureDisplay = property.beds === 0 
                ? `<span>📏 ${formatter.format(property.sqm)} sqm</span> <span>Land/Plot</span>`
                : `<span>🛏️ ${property.beds} Beds</span> <span>🛁 ${property.baths} Baths</span>`;

            card.innerHTML = `
                <img src="${property.image}" alt="${property.title}" class="card-image">
                <div class="card-content">
                    <span class="tag">${property.type}</span>
                    <h3 class="card-title">${property.title}</h3>
                    <p class="card-price">${priceDisplay}</p>
                    <p class="card-location">📍 ${property.location}</p>
                    <div class="card-features">
                        ${featureDisplay}
                    </div>
                </div>
            `;
            
            listingsGrid.appendChild(card);
        });
    }
}

// 5. Filter Logic
// CUSTOMIZE: Add more filter criteria by adding conditions here
function applyFilters() {
    const selectedLocation = locationSelect.value;
    const selectedType = typeSelect.value;
    const maxPrice = priceInput.value ? parseFloat(priceInput.value) : Infinity;

    const filtered = properties.filter(p => {
        const matchesLocation = selectedLocation === 'all' || p.location === selectedLocation;
        const matchesType = selectedType === 'all' || p.type === selectedType;
        const matchesPrice = p.price <= maxPrice;

        return matchesLocation && matchesType && matchesPrice;
    });

    renderProperties(filtered);
}

// 6. Reset Logic
// CUSTOMIZE: Reset additional filters if you add more
function resetFilters() {
    locationSelect.value = 'all';
    typeSelect.value = 'all';
    priceInput.value = '';
    renderProperties(properties);
}

// 7. Modal Logic
// CUSTOMIZE: Add more property details to display in modal
function openModal(property) {
    modalImage.src = property.image;
    modalTitle.textContent = property.title;
    modalPrice.textContent = formatPrice(property.price, property.type);
    modalLocation.textContent = "📍 " + property.location;
    modalTag.textContent = property.type.toUpperCase();
    modalBeds.textContent = property.beds;
    modalBaths.textContent = property.baths;
    modalSqft.textContent = formatter.format(property.sqm);
    modalDesc.textContent = property.description;
    
    modal.style.display = "flex";
}

// Close modal interactions
// CUSTOMIZE: Add keyboard close (e.g., Escape key) if desired
closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// 8. Contact Form Logic (Demo)
// CUSTOMIZE: Change alert message or add more validation
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    alert(`Mwabombeni, ${name}! We have received your inquiry. We will call you at ${phone} shortly.`);
    e.target.reset();
});

// Event Listeners
// CUSTOMIZE: Add listeners for new buttons if extended
searchBtn.addEventListener('click', applyFilters);
resetBtn.addEventListener('click', resetFilters);

// Run on load
init();