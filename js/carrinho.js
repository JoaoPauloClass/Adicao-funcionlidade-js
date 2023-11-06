document.addEventListener("DOMContentLoaded", function () {
    const openCartButton = document.getElementById("open-cart-button");
    const closeCartButton = document.getElementById("close-cart-button");
    const cartContainer = document.querySelector(".cart-container");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    closeCartButton.addEventListener("click", function () {
        closeCart();
    });

    openCartButton.addEventListener("click", function () {
        cartContainer.style.right = "0";
    });

    function closeCart() {
        cartContainer.style.right = "-110%";
    }

    window.addEventListener("click", function (event) {
        if (event.target !== cartContainer && event.target !== openCartButton) {
            closeCart();
        }
    });

    const buyButtons = document.querySelectorAll(".buy-button");
    const cart = [];

    buyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.parentElement;
            const carName = card.querySelector("h2").textContent;
            const carPriceText = card.querySelector(".price").textContent;
            const cardImage = card.querySelectorAll('img');
            const carPrice = parseFloat(carPriceText.replace("R$", "").replace(/\./g, "").replace(",", "."));
            let image = "";

            if (cardImage.length > 0) {
                const carImage = cardImage[0];
                image = carImage.src;
            }

            const existingItem = cart.find(item => item.name === carName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: carName, price: carPrice, quantity: 1, img: image });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(function (item) {
            const listItem = document.createElement("li");
            listItem.classList.add("cart-item"); // Adicione uma classe ao item do carrinho para estilização personalizada

            const itemTotal = item.price * item.quantity;

            const imageComponent = document.createElement("img");
            imageComponent.src = item.img;
            imageComponent.alt = item.name;
            imageComponent.style.maxWidth = "100px";
            imageComponent.style.marginRight = "10px";
            imageComponent.style.borderRadius = "7px";

            const nameComponent = document.createElement("span");
            nameComponent.textContent = item.name;
            nameComponent.classList.add("cart-item-name"); // Adicione uma classe para o nome do item

            const quantityComponent = document.createElement("span");
            quantityComponent.textContent = `x${item.quantity}`;
            quantityComponent.classList.add("cart-item-quantity"); // Adicione uma classe para a quantidade

            const priceComponent = document.createElement("span");
            priceComponent.textContent = `${itemTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`;
            priceComponent.classList.add("cart-item-price"); // Adicione uma classe para o preço

            listItem.appendChild(imageComponent);
            listItem.appendChild(quantityComponent);
            listItem.appendChild(nameComponent);
            listItem.appendChild(priceComponent);

            cartItems.appendChild(listItem);

            total += itemTotal;
        });

        cartTotal.textContent = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

});
