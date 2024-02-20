let moviesContainer = document.getElementById(`movie-container`);


function fetchAndDisplayMovies() {
    fetch(`https://api.noroff.dev/api/v1/square-eyes`)
        .then(response => response.json())
        .then(result => {
            console.log(result);
            moviesContainer.innerHTML = ''; // Clear previous content
            result.forEach(movie => {
                let priceHTML;
                if (movie.onSale) {
                    priceHTML = `
                    <span class="regular-price">$${movie.price}</span>
                    <span>$${movie.discountedPrice}</span>
                    `;
                } else {
                    priceHTML = `
                    <span>$${movie.price}</span>
                    `;
                }
                moviesContainer.innerHTML += `
                    <div class="movie-container" data-genre="${movie.genre}">
                        <a href="product-page.html?id=${movie.id}" class="movie-link">
                            <div class="img-div">
                                <img src="${movie.image}" alt="poster">
                            </div>
                        </a>
                        <div class="info-div">
                            <h2 class="title">${movie.title}</h2>        
                            <span class="description">${movie.released}</span>
                            <span class="description">${movie.genre}</span>
                            <span class="rating">Rating ${movie.rating}</span>  
                            <span>${priceHTML}</span>
                            <div class="button-div">
                                <button class="add-to-cart-btn" data-id="${movie.id}" data-title="${movie.title}" data-price="${movie.price}">Add to cart</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.querySelectorAll(`.add-to-cart-btn`). forEach(button => {
                button.addEventListener(`click`, handleAddToCart);
            });
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

let cartArray = [];

function handleAddToCart (event) {
    const button = event.target;
    const id = button.dataset.id;
    const title = button.dataset.title;
    const price = button.dataset.price;

    const cartItem = { id, title, price };
    addToCartArray (cartItem);
    updateCartUI (cartItem);
}


function addToCartArray (item) {
    cartArray.push(item);
}

function updateCartUI (item) {
    const cartItemsElement = document.getElementById('cartDropdown');

    // Create a new list item element to represent the added item
    const listItem = document.createElement('li');
    listItem.textContent = `${item.title} - $${item.price}`;

    // Append the new list item to the cart items element
    cartItemsElement.appendChild(listItem);
}

function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.toggle('show');
}


const closeButton = document.getElementById('closeButton');
// Get the dropdown menu element
const cartDropdown = document.getElementById('cartDropdown');

// Add a click event listener to the close button
closeButton.addEventListener('click', function() {
    // Toggle the 'show' class of the dropdown menu
    cartDropdown.classList.toggle('show');
});


function filterMovies(genre) {
    const movieContainers = document.querySelectorAll('.movie-container');
    movieContainers.forEach(container => {
        const movieGenre = container.dataset.genre;
        if (genre === 'All' || movieGenre === genre) {
            container.style.display = 'block'; // Display movies matching the selected genre or when 'All' is selected
        } else {
            container.style.display = 'none'; // Hide movies that don't match the selected genre
        }
    });
}

// Event listener for genre buttons
document.getElementById("btnContainer").addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const genre = event.target.textContent.trim();
        filterMovies(genre);
    }
});

// Fetch and display movies initially
fetchAndDisplayMovies();

