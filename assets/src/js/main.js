var productsCart = [
    {
        imgSrc: '../src/imgs/tshirt.jpeg',
        title: 'T-Shirt',
        description: 'T-shirt white',
        price: 100
    },
    {
        imgSrc: '../src/imgs/tshirt.jpeg',
        title: 'T-Shirt2',
        description: 'T-shirt black',
        price: 200
    },
    {
        imgSrc: '../src/imgs/tshirt.jpeg',
        title: 'T-Shirt3',
        description: 'T-shirt red',
        price: 300
    },
    {
        imgSrc: '../src/imgs/tshirt.jpeg',
        title: 'T-Shirt',
        description: 'T-shirt white',
        price: 100
    },
    {
        imgSrc: '../src/imgs/tshirt.jpeg',
        title: 'T-Shirt2',
        description: 'T-shirt black',
        price: 200
    },
    {
        imgSrc: '../src/imgs/tshirt.jpeg',
        title: 'T-Shirt3',
        description: 'T-shirt red',
        price: 300
    }
];

var cartMain = document.querySelector("#cartMain");
var totalPriceElement = document.querySelector(".total-price");
var checkoutButton = document.querySelector("button");

function createProductCart(product, index) {
    const card = document.createElement("div");
    card.classList.add("cart-product");

    card.innerHTML = `
        <div class="cart-product-img">
            <img src="${product.imgSrc}" alt>
        </div>
        <div class="cart-product-info">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <h4>${product.price}</h4>
        </div>
        <i class="fa-solid fa-trash" data-index="${index}"></i>
    `;

    return card;
}

function updateTotalPrice() {
    let totalPrice = 0;
    productsCart.forEach(product => {
        totalPrice += product.price;
    });
    totalPriceElement.textContent = `$${totalPrice}`;
}

function removeProduct(index) {
    productsCart.splice(index, 1);
    renderCart();
    updateTotalPrice();
}

function renderCart() {
    cartMain.innerHTML = "";
    if (productsCart.length === 0) {
        cartMain.innerHTML = `<h4 class="noCart">Your Cart is Empty</h4>`;
        checkoutButton.disabled = true; // Disable the button when the cart is empty
    } else {
        productsCart.forEach((product, index) => {
            const card = createProductCart(product, index);
            cartMain.appendChild(card);
        });
        checkoutButton.disabled = false; // Enable the button when the cart has items
    }
}

cartMain.addEventListener('click', function (event) {
    if (event.target.classList.contains('fa-trash')) {
        const index = event.target.getAttribute('data-index');
        removeProduct(index);
    }
});

renderCart();
updateTotalPrice();
