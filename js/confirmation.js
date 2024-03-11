document.addEventListener('DOMContentLoaded', function() {
    const cartData = localStorage.getItem('cartDataForConfirmation');
    const cartArray = JSON.parse(cartData);

    const cartListElement = document.getElementById('confirmationCartList');
    if (cartArray && cartArray.length > 0) {
        cartArray.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.title} - $${item.price} (Quantity: ${item.quantity})`;
            cartListElement.appendChild(listItem);
        });
    } else {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartListElement.appendChild(emptyCartMessage);
    }

    document.getElementById(`lastPageButton`).addEventListener("click", function () {
        localStorage.removeItem(`cartDataForConfirmation`);
    });
});

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('cartArray');
});
