const closeButton = document.getElementById('closeButton');
const cartDropdown = document.getElementById('cartDropdown');
const cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];

document.addEventListener("DOMContentLoaded", function (){
    const params = new URLSearchParams(window.location.search);
    const movieID = params.get("id");

    fetch(`https://api.noroff.dev/api/v1/square-eyes/${movieID}`)
        .then(response => response.json())
        .then(movieDetails => {
            const productContainer = document.getElementById("product-container");
            productContainer.innerHTML = `
            <div>
                <div class="img-container">
                    <img src="${movieDetails.image}" alt="poster">
                </div>
            <div class="movie-info">
                <h2>${movieDetails.title}</h2>
                <p>${movieDetails.description}</p>
                <p>Genre: ${movieDetails.genre}</p>
                <p>Released: ${movieDetails.released}</p>
                <p>Rating: ${movieDetails.rating}</p>
                <button class="add-to-cart-btn" data-id="${movieDetails.id}"
                 data-title="${movieDetails.title}"
                  data-price="${movieDetails.price}">
                  Add to cart $${movieDetails.discountedPrice}</button>
            </div>
            </div>
            `;

            const buyButton = document.querySelector('.add-to-cart-btn');
            buyButton.addEventListener('click', handleAddToCart);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
});

function renderCartItems() {
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

document.addEventListener("DOMContentLoaded", function () {
    renderCartItems();
    updateCartCounter();
});

function updateCartCounter() {
    const cartCounterElement = document.querySelector(`.cart-counter`);
    cartCounterElement.textContent = cartArray.reduce((total, item) => total + item.quantity, 0);
}

function saveCartArrayToLocalStorage() {
    localStorage.setItem('cartArray', JSON.stringify(cartArray));
}

function addToCartArray(item) {
    return new Promise((resolve) => {
        const existingItem = cartArray.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartArray.push({ ...item, quantity: 1 });
        }
        saveCartArrayToLocalStorage();
        resolve();
    });
}

function handleAddToCart(event) {
    const button = event.target;
    const id = button.dataset.id;
    const title = button.dataset.title;
    const price = button.dataset.price;

    const cartItem = { id, title, price };
    addToCartArray(cartItem)
        .then(() => {
            updateCartCounter();
            saveCartArrayToLocalStorage();
            renderCartItems();
        });
}

function removeItemFromCart(id) {
    const index = cartArray.findIndex(item => item.id === id);
    if (index !== -1) {
        cartArray.splice(index, 1);
        updateCartCounter();
        renderCartItems();
        saveCartArrayToLocalStorage();
    }
}

function toggleCart() {
    const cartDropdown = document.getElementById('cartDropdown');
    cartDropdown.classList.toggle('show');
}
closeButton.addEventListener('click', function() {
    cartDropdown.classList.toggle('show');
});

document.getElementById('viewDetailsButton').addEventListener('click', function() {
    return new Promise(resolve => {
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        resolve();
    }).then(() => {
        window.location.href = 'checkout.html';
    });
});
