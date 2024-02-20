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

function handleAddToCart(event) {
    const button = event.target;
    const id = button.dataset.id;
    const title = button.dataset.title;
    const price = button.dataset.price;

    const cartItem = { id, title, price };
    addToCartArray(cartItem);
    updateCartUI();
}

function addToCartArray(item) {
    // Check if the item is already in the cart
    const existingItem = cartArray.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        // If it is, increment its quantity
        existingItem.quantity++;
    } else {
        // Otherwise, add the item to the cart with quantity 1
        cartArray.push({...item, quantity: 1});
    }
}

function removeItemFromCart(id) {
    // Find the index of the item in the cart array
    const index = cartArray.findIndex(item => item.id === id);
    if (index !== -1) {
        // Remove the item from the cart array
        cartArray.splice(index, 1);
        // Update the cart UI
        updateCartUI();
    }
}

function updateCartUI() {
    const cartItemsElement = document.getElementById('cartItems');
    // Clear the cart items element before updating
    cartItemsElement.innerHTML = '';

    // Iterate over the items in the cart and display them
    cartArray.forEach(item => {
        const listItem = document.createElement('li');
        let displayText = `${item.title} - $${item.price}`;
        // Display the item title and quantity only when quantity is greater than 2
        if (item.quantity > 2) {
            displayText += ` (${item.quantity})`;
        }
        listItem.textContent = displayText;

        const textElement = document.createElement('span');
        textElement.textContent = displayText;
        textElement.classList.add('item-text');

        // Create a remove button for each item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => removeItemFromCart(item.id));

        // Append the remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the cart items element
        cartItemsElement.appendChild(listItem);
    });
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

// Event listener for the "View Movie Details" button
document.getElementById('viewDetailsButton').addEventListener('click', function() {
    // Store cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cartArray));
    // Navigate to the next page
    window.location.href = 'checkout.html';
});

// Fetch and display movies initially
fetchAndDisplayMovies();
