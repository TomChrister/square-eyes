document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    const cartData = localStorage.getItem('cartDataForConfirmation');
    // Parse the JSON string to get the cart array
    const cartArray = JSON.parse(cartData);

    // Display cart information (for example, in a list)
    const cartListElement = document.getElementById('confirmationCartList');
    if (cartArray && cartArray.length > 0) {
        cartArray.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.title} - $${item.price} (Quantity: ${item.quantity})`;
            cartListElement.appendChild(listItem);
        });
    } else {
        // Handle case when cart is empty
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartListElement.appendChild(emptyCartMessage);
    }
});
