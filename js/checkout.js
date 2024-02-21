document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    const cartData = localStorage.getItem('cart');
    // Parse the JSON string to get the cart array
    const cartArray = JSON.parse(cartData);

    // Display cart information (for example, in a list)
    const cartListElement = document.getElementById('cartList');
    if (cartArray && cartArray.length > 0) {
        cartArray.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.title} - $${item.price} (Quantity: ${item.quantity})`;
            cartListElement.appendChild(listItem);
        });

        // Add purchase button
        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Purchase';
        purchaseButton.addEventListener('click', function() {
            // Store cart data in localStorage
            localStorage.setItem('cartDataForConfirmation', JSON.stringify(cartArray));
            // Redirect to order confirmation page
            window.location.href = 'confirmation.html'; // Change the URL to your order confirmation page
        });
        cartListElement.appendChild(purchaseButton);

    } else {
        // Handle case when cart is empty
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartListElement.appendChild(emptyCartMessage);
    }
});


