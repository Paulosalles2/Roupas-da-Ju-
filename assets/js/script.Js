// script.js

const cart = [];
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Atualiza o carrinho
function updateCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Carrinho vazio.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <p>${item.name} - R$ ${item.price.toFixed(2)} (x${item.quantity})</p>
                <button class="btn remove-from-cart" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalElement.textContent = total.toFixed(2);

    // Adiciona eventos para remover itens
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
}

// Adiciona produto ao carrinho
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.dataset.name;
    const productPrice = parseFloat(productCard.dataset.price);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Remove produto do carrinho
function removeFromCart(event) {
    const productId = event.target.dataset.id;
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
    }

    updateCart();
}

// Eventos de clique nos botões de adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', addToCart);
});

document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    // Alterna o menu ao clicar no botão hambúrguer
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});
