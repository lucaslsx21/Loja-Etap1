// Cart functionality
let cartCount = 0;  // Armazena a quantidade de itens no carrinho
const cartCountElement = document.querySelector('.cart-count');  // Elemento que exibe a quantidade de itens no carrinho

// Search functionality
const searchInput = document.querySelector('.search-bar input');  // Elemento do campo de pesquisa
const searchButton = document.querySelector('.search-button');  // Botão de pesquisa

// Produtos iniciais para exibição
const products = [
    {
        id: 1,
        name: 'Camiseta Básica Branca',
        price: 79.90,
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Roupas'
    },
    {
        id: 2,
        name: 'Jaqueta Jeans Moderna',
        price: 199.90,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Roupas'
    },
    {
        id: 3,
        name: 'Calça Social Slim',
        price: 159.90,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Roupas'
    },
    {
        id: 4,
        name: 'Vestido Casual Elegante',
        price: 229.90,
        image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Roupas'
    },
    {
        id: 5,
        name: 'Blazer Moderno',
        price: 299.90,
        image: 'https://images.unsplash.com/photo-1617952986600-802f965dcdbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        category: 'Roupas'
    }
];

// Função para adicionar itens ao carrinho
function addToCart(productId) {
    cartCount++;  // Incrementa o número de itens no carrinho
    cartCountElement.textContent = cartCount;  // Atualiza a exibição da quantidade de itens no carrinho
    
    // Efeito de animação para a quantidade no carrinho
    cartCountElement.classList.add('cart-count-animation');
    setTimeout(() => {
        cartCountElement.classList.remove('cart-count-animation');
    }, 300);
}

// Função para filtrar e exibir produtos baseados na pesquisa
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();  // Obtém o termo de pesquisa em minúsculo
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||  // Filtra pelo nome do produto
        product.category.toLowerCase().includes(searchTerm)  // Filtra pela categoria do produto
    );
    updateProductsDisplay(filteredProducts);  // Atualiza os produtos exibidos
}

// Função para atualizar a exibição de produtos
function updateProductsDisplay(productsToShow) {
    const productsGrid = document.querySelector('.products-grid');  // Obtém a grade de produtos
    productsGrid.innerHTML = '';  // Limpa a exibição atual de produtos

    // Para cada produto, cria um cartão de produto e o adiciona à grid
    productsToShow.forEach(product => {
        const productHTML = `
            <div class="product-card">
                <div class="product-image">
                    <span class="new-tag">Novo</span>
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-title">${product.name}</p>
                    <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productHTML;  // Adiciona o HTML do produto à grid
    });
}

// Função para exibir e ocultar o menu de categorias
const dropdownBtn = document.querySelector('.dropdown-btn');  // Botão para abrir/fechar o menu de categorias
const categoriesDropdown = document.createElement('div');  // Cria um novo elemento para o menu de categorias
categoriesDropdown.className = 'categories-menu';  // Atribui uma classe ao menu
categoriesDropdown.style.display = 'none';  // Inicia o menu oculto

// Lista de categorias que aparecerão no menu
const categories = ['Roupas', 'Calçados', 'Acessórios', 'Esportes', 'Casual', 'Formal', 'Infantil', 'Ofertas'];

// Preenche o menu de categorias com a lista de categorias
categoriesDropdown.innerHTML = categories.map(category => 
    `<div class="category-item">${category}</div>`  // Cada categoria é transformada em um item de menu
).join('');

// Adiciona o menu de categorias ao elemento pai do botão
dropdownBtn.parentElement.appendChild(categoriesDropdown);

// Adiciona evento de clique para alternar a exibição do menu
dropdownBtn.addEventListener('click', () => {
    categoriesDropdown.style.display = 
        categoriesDropdown.style.display === 'none' ? 'block' : 'none';  // Alterna a visibilidade do menu
});

// Fecha o menu de categorias quando o usuário clicar fora
document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !categoriesDropdown.contains(e.target)) {
        categoriesDropdown.style.display = 'none';  // Fecha o menu se o clique for fora do menu ou do botão
    }
});

// Adiciona eventos de pesquisa ao campo de pesquisa
searchInput.addEventListener('input', handleSearch);  // Chama a função de pesquisa sempre que o usuário digitar
searchButton.addEventListener('click', handleSearch);  // Chama a função de pesquisa quando o botão de pesquisa for clicado

// Inicializa os cartões de produto e adiciona eventos de clique para adicionar ao carrinho
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', () => {
        const productId = parseInt(card.dataset.productId);  // Obtém o ID do produto do atributo de dados
        addToCart(productId);  // Adiciona o produto ao carrinho
    });
});

// Gerencia o carrinho de compras com funcionalidade de modal
document.addEventListener('DOMContentLoaded', () => {
    let cart = [];  // Array para armazenar os itens do carrinho
    const cartCountElement = document.querySelector('.cart-count');  // Elemento que exibe a quantidade de itens no carrinho
    const cartButton = document.getElementById('cart-button');  // Botão que abre o modal do carrinho
    const cartModal = document.getElementById('cart-modal');  // Modal que exibe o carrinho
    const cartItemsList = document.getElementById('cart-items');  // Lista de itens no carrinho
    const closeCartButton = document.getElementById('close-cart');  // Botão para fechar o modal do carrinho

    // Função para atualizar a exibição do carrinho
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';  // Limpa a lista de itens no carrinho
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - R$ ${item.price.toFixed(2)}`;  // Exibe o nome e o preço de cada item
            cartItemsList.appendChild(li);  // Adiciona o item à lista
        });
        cartCountElement.textContent = cart.length;  // Atualiza a quantidade de itens no carrinho
    }

    // Função para adicionar um produto ao carrinho
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);  // Encontra o produto pelo ID
        if (product) {
            cart.push(product);  // Adiciona o produto ao carrinho
            updateCartDisplay();  // Atualiza a exibição do carrinho
        }
    }

    // Exibe os produtos no grid de produtos
    document.getElementById('products-grid').innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <p class="product-title">${product.name}</p>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            </div>
        </div>
    `).join('');  // Cria o HTML de cada produto dinamicamente

    // Abre o modal do carrinho ao clicar no botão do carrinho
    cartButton.addEventListener('click', () => {
        cartModal.classList.toggle('hidden');  // Alterna a visibilidade do modal
    });

    // Fecha o modal do carrinho ao clicar no botão de fechar
    closeCartButton.addEventListener('click', () => {
        cartModal.classList.add('hidden');  // Adiciona a classe 'hidden' para esconder o modal
    });

    // Fecha o modal do carrinho se o usuário clicar fora dele
    document.addEventListener('click', (e) => {
        if (!cartModal.contains(e.target) && e.target !== cartButton) {
            cartModal.classList.add('hidden');  // Fecha o modal se o clique for fora do modal ou do botão
        }
    });
});
