document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    const cartData = localStorage.getItem('cart');
    // Parse the JSON string to get the cart array
    const cartArray = JSON.parse(cartData);

    // Display cart information (for example, in a list)
    const cartListElement = document.getElementById('cartList');
    let totalSum = 0;

    if (cartArray && cartArray.length > 0) {
        cartArray.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.title} - $${item.price} (Quantity: ${item.quantity})`;
            cartListElement.appendChild(listItem);

            totalSum += item.price * item.quantity;
        });

        const purchaseButton = document.createElement('button');
        purchaseButton.textContent = 'Purchase';
        purchaseButton.classList.add('purchase-button');

        // Define the function to handle the click event
        function purchaseButtonClickHandler() {
            // Store cart data in localStorage
            localStorage.setItem('cartDataForConfirmation', JSON.stringify(cartArray));
            // Redirect to order confirmation page
            window.location.href = 'confirmation.html'; // Change the URL to your order confirmation page
        }

        // Attach the event listener to the new button
        purchaseButton.addEventListener('click', purchaseButtonClickHandler);

        // Find the form-div element in the HTML
        const formDiv = document.querySelector('.form-div');

        // Check if the form-div element exists
        if (formDiv) {
            // Append the purchaseButton HTML to the form-div
            formDiv.appendChild(purchaseButton);
        }

        const totalSumElement = document.createElement('p');
        totalSumElement.textContent = `Total: $${totalSum.toFixed(2)}`;
        cartListElement.appendChild(totalSumElement);
    } else {
        // Handle case when cart is empty
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartListElement.appendChild(emptyCartMessage);
    }
});