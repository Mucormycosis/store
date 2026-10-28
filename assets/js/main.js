const products = [
    { id: 1, title: 'Процессор AMD Ryzen 5 5600X', price: 14990, category: 'Процессоры', image: '../assets/images/cpu.png' },
    { id: 2, title: 'Видеокарта NVIDIA RTX 4060', price: 32990, category: 'Видеокарты', image: '../assets/images/gpu.png' },
    { id: 3, title: 'Материнская плата ASUS B550', price: 11990, category: 'Материнские платы', image: '../assets/images/mb.png' },
    { id: 4, title: 'Оперативная память 16GB DDR4', price: 4990, category: 'Память', image: '../assets/images/ram.png' },
    { id: 5, title: 'SSD 1TB NVMe', price: 6990, category: 'Накопители', image: '../assets/images/ssd.png' },
    { id: 6, title: 'Блок питания 650W', price: 5990, category: 'Блоки питания', image: '../assets/images/psu.png' },
];

function renderProducts(list) {
    const grid = document.getElementById('featured-products');
    if (!grid) return;
    grid.innerHTML = list.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.title}" onerror="this.src='https://via.placeholder.com/240x180?text=PC'">
            <div class="info">
                <div class="title">${p.title}</div>
                <div class="price">${p.price.toLocaleString('ru-RU')} лей</div>
                <button class="add-btn" data-id="${p.id}">В корзину</button>
            </div>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const item = products.find(p => p.id == id);
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            btn.textContent = 'Добавлено';
            setTimeout(() => btn.textContent = 'В корзину', 1200);
        });
    });
});
