let moviesContainer = document.getElementById(`movie-container`);
let cartArray = [];
const cartCounterElement = document.querySelector(`.cart-counter`);
const closeButton = document.getElementById('closeButton');
const cartDropdown = document.getElementById('cartDropdown');
cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

function fetchAndDisplayMovies() {
    fetch(`https://api.noroff.dev/api/v1/square-eyes`)
        .then(response => response.json())
        .then(result => {
            moviesContainer.innerHTML = '';
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
                            <span class="description">${movie.released} - ${priceHTML}</span>                
                            <div class="button-div">
                                <button class="add-to-cart-btn" data-id="${movie.id}"
                                 data-title="${movie.title}"
                                 data-price="${movie.price}">
                                 Add to cart</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            document.querySelectorAll(`.add-to-cart-btn`). forEach(button => {
                button.addEventListener(`click`, handleAddToCart);
            });
        })
        .catch(_=> {
        });
}

updateCartUI();

function saveCartArrayToLocalStorage() {
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
}

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
    const existingItem = cartArray.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartArray.push({...item, quantity: 1});
    }

    saveCartArrayToLocalStorage();
}

function removeItemFromCart(id) {
    const index = cartArray.findIndex(item => item.id === id);
    if (index !== -1) {
        cartArray.splice(index, 1);
        updateCartUI();
        saveCartArrayToLocalStorage();
    }
}

function updateCartUI() {
    cartCounterElement.textContent = cartArray.reduce((total, item) => total + item.quantity, 0);

    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';

    let totalCost = 0;

    cartArray.forEach(item => {
        const listItem = document.createElement('li');
        let displayText = `${item.title} - $${item.price}`;
        if (item.quantity > 1) {
            displayText += ` (${item.quantity})`;
        }
        listItem.textContent = displayText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add(`remove-button`);
        removeButton.addEventListener('click', () => removeItemFromCart(item.id));

        listItem.appendChild(removeButton);

        cartItemsElement.appendChild(listItem);

        totalCost += item.price * item.quantity;
    });

    const totalCostElement = document.getElementById(`totalCost`);
    totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;
}

function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.toggle('show');
}

closeButton.addEventListener('click', function() {
    cartDropdown.classList.toggle('show');
});

function filterMovies(genre) {
    const movieContainers = document.querySelectorAll('.movie-container');
    movieContainers.forEach(container => {
        const movieGenre = container.dataset.genre;
        if (genre === 'All' || movieGenre === genre) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

document.getElementById("btnContainer").addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        const genre = event.target.textContent.trim();
        filterMovies(genre);
    }
});

document.getElementById('viewDetailsButton').addEventListener('click', function() {
    localStorage.setItem('cart', JSON.stringify(cartArray));
    window.location.href = 'checkout.html';
});

fetchAndDisplayMovies();
