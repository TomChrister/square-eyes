document.addEventListener('DOMContentLoaded', function() {
    const cartData = localStorage.getItem('cartArray');
    const cartArray = JSON.parse(cartData) || [];

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

        function purchaseButtonClickHandler() {
            localStorage.setItem('cartDataForConfirmation', JSON.stringify(cartArray));
            window.location.href = 'confirmation.html';
        }

        purchaseButton.addEventListener('click', purchaseButtonClickHandler);

        const formDiv = document.querySelector('.form-div');

        if (formDiv) {
            formDiv.appendChild(purchaseButton);
        }

        const totalSumWrapper = document.createElement('div');

        const totalSumElement = document.createElement('p');
        totalSumElement.classList.add(`p-total`)
        totalSumElement.textContent = `Total: $${totalSum.toFixed(2)}`;

        totalSumWrapper.appendChild(totalSumElement);

        cartListElement.parentNode.appendChild(totalSumWrapper);
    } else {
        const emptyCartMessage = document.createElement('p');
        emptyCartMessage.textContent = 'Your cart is empty.';
        cartListElement.appendChild(emptyCartMessage);
    }

});
