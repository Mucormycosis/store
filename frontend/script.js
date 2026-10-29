const products = [
 {id:1,title:"Процессор AMD Ryzen 5 5600X",price:4299,old:4999,cat:"cpu",img:"img/cpu1.jpg"},
 {id:2,title:"Процессор Intel Core i5-12400F",price:4599,old:5199,cat:"cpu",img:"img/cpu1.jpg"},
 {id:3,title:"Видеокарта NVIDIA RTX 4060",price:9499,old:10999,cat:"gpu",img:"img/gpu1.jpg"},
 {id:4,title:"Видеокарта AMD RX 7600",price:8999,old:9999,cat:"gpu",img:"img/gpu1.jpg"},
 {id:5,title:"Материнская плата ASUS B550",price:3299,old:3799,cat:"mb",img:"img/mb1.jpg"},
 {id:6,title:"Материнская плата MSI B660",price:3599,old:null,cat:"mb",img:"img/mb1.jpg"},
 {id:7,title:"Оперативная память 16GB DDR4",price:1199,old:null,cat:"ram",img:"img/ram1.jpg"},
 {id:8,title:"Оперативная память 32GB DDR5",price:2799,old:null,cat:"ram",img:"img/ram1.jpg"},
 {id:9,title:"SSD 1TB NVMe",price:1899,old:null,cat:"storage",img:"img/ssd1.jpg"},
 {id:10,title:"SSD 2TB NVMe",price:3499,old:null,cat:"storage",img:"img/ssd1.jpg"},
 {id:11,title:"HDD 2TB",price:1299,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=HDD"},
 {id:12,title:"Блок питания 650W",price:1699,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=PSU"},
 {id:13,title:"Блок питания 750W",price:2199,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=PSU"},
 {id:14,title:"Корпус ATX",price:1499,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=Case"},
 {id:15,title:"Кулер для процессора",price:699,old:null,cat:"cpu",img:"img/cpu1.jpg"},
 {id:16,title:"Термопаста",price:199,old:null,cat:"cpu",img:"https://via.placeholder.com/200x160?text=Paste"},
 {id:17,title:"Вентилятор 120mm",price:249,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=Fan"},
 {id:18,title:"Wi-Fi адаптер",price:399,old:null,cat:"mb",img:"https://via.placeholder.com/200x160?text=WIFI"},
 {id:19,title:"Кабель SATA",price:49,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=Cable"},
 {id:20,title:"Коврик для мыши XL",price:299,old:null,cat:"storage",img:"https://via.placeholder.com/200x160?text=Pad"}
];
let cart=JSON.parse(localStorage.getItem('cart')||'[]');
let favs=JSON.parse(localStorage.getItem('favs')||'[]');
let currentCat='all';
let query='';
function render(){
  var grid=document.getElementById('product-grid');
  if(!grid)return;
  var list=products.filter(function(p){var okCat=currentCat==='all'||p.cat===currentCat;var okQ=p.title.toLowerCase().indexOf(query.toLowerCase())>=0;return okCat&&okQ;});
  grid.innerHTML=list.map(function(p){
    var favIcon=favs.indexOf(p.id)>=0?String.fromCharCode(10084,65039):String.fromCharCode(9825);
    var oldHtml=p.old?'<span class="old">'+p.old+' лей</span>':'';
    return '<div class="card"><img src="'+p.img+'" alt="'+p.title+'"><div class="info"><div class="title">'+p.title+'</div><div class="price-row"><span class="price">'+p.price+' лей</span>'+oldHtml+'</div><div class="actions"><button class="add" data-id="'+p.id+'">В корзину</button><button class="fav" data-id="'+p.id+'">'+favIcon+'</button></div></div></div>';
  }).join('');
  var adds=grid.querySelectorAll('.add');for(var i=0;i<adds.length;i++){adds[i].onclick=function(){addToCart(+this.getAttribute('data-id'));};}
  var fbs=grid.querySelectorAll('.fav');for(var j=0;j<fbs.length;j++){fbs[j].onclick=function(){toggleFav(+this.getAttribute('data-id'));};}
  updateCounts();
}
function addToCart(id){var item=null;for(var i=0;i<cart.length;i++){if(cart[i].id===id){item=cart[i];break;}}if(item){item.qty++;}else{var p=null;for(var k=0;k<products.length;k++){if(products[k].id===id){p=products[k];break;}}if(p){cart.push({id:p.id,title:p.title,price:p.price,qty:1});}}saveCart();updateCounts();}
function toggleFav(id){var idx=favs.indexOf(id);if(idx>=0){favs.splice(idx,1);}else{favs.push(id);}localStorage.setItem('favs',JSON.stringify(favs));render();}
function saveCart(){localStorage.setItem('cart',JSON.stringify(cart));}
function updateCounts(){var cc=document.getElementById('cart-count');var fc=document.getElementById('fav-count');var c=0;for(var i=0;i<cart.length;i++){c+=cart[i].qty;}if(cc)cc.textContent=c;if(fc)fc.textContent=favs.length;}
function renderCart(){var box=document.getElementById('cart-items');var totalEl=document.getElementById('cart-total');if(!box)return;if(cart.length===0){box.innerHTML='<p>Корзина пуста</p>';if(totalEl)totalEl.textContent=0;return;}box.innerHTML=cart.map(function(c){return '<div class=\"cart-item\"><div>'+c.title+'</div><div class=\"qty\"><button data-id=\"'+c.id+'\" data-act=\"dec\">-</button><span>'+c.qty+'</span><button data-id=\"'+c.id+'\" data-act=\"inc\">+</button></div><div>'+(c.price*c.qty)+' лей</div></div>';}).join('');var bts=box.querySelectorAll('button');for(var i=0;i<bts.length;i++){bts[i].onclick=function(){var id=+this.getAttribute('data-id');var it=null;for(var j=0;j<cart.length;j++){if(cart[j].id===id){it=cart[j];break;}}if(!it)return;if(this.getAttribute('data-act')==='inc'){it.qty++;}else{it.qty--;if(it.qty<=0){var nc=[];for(var k=0;k<cart.length;k++){if(cart[k].id!==id)nc.push(cart[k]);}cart=nc;}}saveCart();renderCart();updateCounts();};}var total=0;for(var m=0;m<cart.length;m++){total+=cart[m].price*cart[m].qty;}if(totalEl)totalEl.textContent=total;}
var searchEl=document.getElementById('search');if(searchEl){searchEl.oninput=function(e){query=e.target.value;render();};}
var cbs=document.querySelectorAll('.cat-btn');for(var ci=0;ci<cbs.length;ci++){cbs[ci].onclick=function(){var allc=document.querySelectorAll('.cat-btn');for(var x=0;x<allc.length;x++){allc[x].classList.remove('active');}this.classList.add('active');currentCat=this.getAttribute('data-cat');render();};}
var cartBtn=document.getElementById('cart-btn');if(cartBtn){cartBtn.onclick=function(){renderCart();var mm=document.getElementById('cart-modal');if(mm)mm.classList.remove('hidden');};}
var closeCart=document.getElementById('close-cart');if(closeCart){closeCart.onclick=function(){var mm=document.getElementById('cart-modal');if(mm)mm.classList.add('hidden');};}
render();updateCounts();
