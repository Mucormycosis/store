const products = [
 {id:1,title:"Процессор AMD Ryzen 5 5600X",price:4299,old:4999,cat:"cpu",img:"https://via.placeholder.com/200x160?text=CPU"},
 {id:2,title:"Процессор Intel Core i5-12400F",price:4599,old:5199,cat:"cpu",img:"https://via.placeholder.com/200x160?text=CPU"},
 {id:3,title:"Видеокарта NVIDIA RTX 4060",price:9499,old:10999,cat:"gpu",img:"https://via.placeholder.com/200x160?text=GPU"},
 {id:4,title:"Видеокарта AMD RX 7600",price:8999,old:9999,cat:"gpu",img:"https://via.placeholder.com/200x160?text=GPU"},
 {id:5,title:"Материнская плата ASUS B550",price:3299,old:3799,cat:"mb",img:"https://via.placeholder.com/200x160?text=MB"},
 {id:6,title:"Материнская плата MSI B660",price:3599,old:3999,cat:"mb",img:"https://via.placeholder.com/200x160?text=MB"},
 {id:7,title:"Оперативная память 16GB DDR4",price:1199,old:1499,cat:"ram",img:"https://via.placeholder.com/200x160?text=RAM"},
 {id:8,title:"Оперативная память 32GB DDR5",price:2799,old:3299,cat:"ram",img:"https://via.placeholder.com/200x160?text=RAM"},
 {id:9,title:"SSD 1TB NVMe",price:1899,old:2299,cat:"storage",img:"https://via.placeholder.com/200x160?text=SSD"},
 {id:10,title:"SSD 2TB NVMe",price:3499,old:3999,cat:"storage",img:"https://via.placeholder.com/200x160?text=SSD"},
 {id:11,title:"HDD 2TB",price:1299,old:1599,cat:"storage",img:"https://via.placeholder.com/200x160?text=HDD"},
 {id:12,title:"Блок питания 650W",price:1699,old:1999,cat:"storage",img:"https://via.placeholder.com/200x160?text=PSU"},
 {id:13,title:"Блок питания 750W",price:2199,old:2599,cat:"storage",img:"https://via.placeholder.com/200x160?text=PSU"},
 {id:14,title:"Корпус ATX",price:1499,old:1799,cat:"storage",img:"https://via.placeholder.com/200x160?text=Case"},
 {id:15,title:"Кулер для процессора",price:699,old:899,cat:"cpu",img:"https://via.placeholder.com/200x160?text=Cooler"},
 {id:16,title:"Термопаста",price:199,old:299,cat:"cpu",img:"https://via.placeholder.com/200x160?text=Paste"},
 {id:17,title:"Вентилятор 120mm",price:249,old:349,cat:"storage",img:"https://via.placeholder.com/200x160?text=Fan"},
 {id:18,title:"Wi-Fi адаптер",price:399,old:499,cat:"mb",img:"https://via.placeholder.com/200x160?text=WIFI"},
 {id:19,title:"Кабель SATA",price:49,old:79,cat:"storage",img:"https://via.placeholder.com/200x160?text=Cable"},
 {id:20,title:"Коврик для мыши XL",price:299,old:399,cat:"storage",img:"https://via.placeholder.com/200x160?text=Pad"}
];

let cart = JSON.parse(localStorage.getItem('cart')||'[]');
let favs = JSON.parse(localStorage.getItem('favs')||'[]');
let currentCat = 'all';
let query = '';

function render(){
  const grid = document.getElementById('product-grid');
  const list = products.filter(p=>{
    const okCat = currentCat==='all' || p.cat===currentCat;
    const okQ = p.title.toLowerCase().includes(query.toLowerCase());
    return okCat && okQ;
  });
  grid.innerHTML = list.map(p=>`
    <div class="card">
      <img src="${p.img}" alt="${p.title}">
      <div class="info">
        <div class="title">${p.title}</div>
        <div class="price-row">
          <span class="price">${p.price} лей</span>
          <span class="old">${p.old} лей</span>
        </div>
        <div class="actions">
          <button class="add" data-id="${p.id}">В корзину</button>
          <button class="fav" data-id="${p.id}">${favs.includes(p.id)?'❤':'♡'}</button>
        </div>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('.add').forEach(b=>b.addEventListener('click',()=>addToCart(+b.dataset.id)));
  grid.querySelectorAll('.fav').forEach(b=>b.addEventListener('click',()=>toggleFav(+b.dataset.id)));
  updateCounts();
}

function addToCart(id){
  const item = cart.find(c=>c.id===id);
  if(item) item.qty++;
  else { const p=products.find(x=>x.id===id); cart.push({id:p.id,title:p.title,price:p.price,qty:1}); }
  saveCart();
  updateCounts();
}

function toggleFav(id){
  if(favs.includes(id)) favs=favs.filter(x=>x!==id); else favs.push(id);
  localStorage.setItem('favs',JSON.stringify(favs));
  render();
}

function saveCart(){ localStorage.setItem('cart',JSON.stringify(cart)); }

function updateCounts(){
  document.getElementById('cart-count').textContent = cart.reduce((s,c)=>s+c.qty,0);
  document.getElementById('fav-count').textContent = favs.length;
}

function renderCart(){
  const box = document.getElementById('cart-items');
  if(cart.length===0){ box.innerHTML='<p>Корзина пуста</p>'; document.getElementById('cart-total').textContent=0; return; }
  box.innerHTML = cart.map(c=>`
    <div class="cart-item">
      <div>${c.title}</div>
      <div class="qty">
        <button data-id="${c.id}" data-act="dec">-</button>
        <span>${c.qty}</span>
        <button data-id="${c.id}" data-act="inc">+</button>
      </div>
      <div>${c.price*c.qty} лей</div>
    </div>
  `).join('');
  box.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click',()=>{
      const id=+b.dataset.id; const it=cart.find(c=>c.id===id);
      if(b.dataset.act==='inc') it.qty++;
      else { it.qty--; if(it.qty<=0) cart=cart.filter(c=>c.id!==id); }
      saveCart(); renderCart(); updateCounts();
    });
  });
  const total = cart.reduce((s,c)=>s+c.price*c.qty,0);
  document.getElementById('cart-total').textContent = total;
}

document.getElementById('search').addEventListener('input',e=>{query=e.target.value;render();});
document.querySelectorAll('.cat-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.cat-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); currentCat=b.dataset.cat; render();
}));
document.getElementById('cart-btn').addEventListener('click',()=>{renderCart();document.getElementById('cart-modal').classList.remove('hidden');});
document.getElementById('close-cart').addEventListener('click',()=>document.getElementById('cart-modal').classList.add('hidden'));

render();
updateCounts();
