// ==========================================
// ПУТЬ К ПАПКЕ С ФАЙЛАМИ
// ==========================================
const F = 'Апгрейдер предметов CS2 _ Официальный Сайт UPGRADER_files/';

// ==========================================
// БАЗА СКИНОВ (используем avif из папки)
// ==========================================
const DB = [
  {id:1,  name:'AWP | Dragon Lore',       price:8500.00, rarity:'Covert', color:'#EB4B4B', img:F+'weapon_awp_cu_medieval_dragon_awp_light_png.avif'},
  {id:2,  name:'★ Butterfly | Black Pearl',price:6200.00, rarity:'Covert', color:'#EB4B4B', img:F+'weapon_knife_butterfly_am_blackpearl_marbleized_b_light_png.avif'},
  {id:3,  name:'★ Butterfly | Ruby',      price:5800.00, rarity:'Covert', color:'#EB4B4B', img:F+'weapon_knife_butterfly_am_ruby_marbleized_light_png.avif'},
  {id:4,  name:'★ Flip | Sapphire',       price:4200.00, rarity:'Covert', color:'#EB4B4B', img:F+'weapon_knife_flip_am_sapphire_marbleized_light_png.avif'},
  {id:5,  name:'★ M9 Bayonet | Black Pearl',price:5500.00, rarity:'Covert', color:'#EB4B4B', img:F+'weapon_knife_m9_bayonet_am_blackpearl_marbleized_light_png.avif'},
  {id:6,  name:'★ M9 Bayonet | Ruby',     price:6000.00, rarity:'Covert', color:'#EB4B4B', img:F+'weapon_knife_m9_bayonet_am_ruby_marbleized_light_png.avif'},
  {id:7,  name:'AK-47 | Redline',         price:45.50,   rarity:'Classified', color:'#8847FF', img:F+'64fx64f'},
  {id:8,  name:'AWP | Asiimov',           price:120.00,  rarity:'Covert',   color:'#EB4B4B', img:F+'128fx128f'},
  {id:9,  name:'M4A4 | Howl',             price:3500.00, rarity:'Contraband', color:'#EB4B4B', img:F+'128fx128f(1)'},
  {id:10, name:'USP-S | Kill Confirmed',  price:85.00,   rarity:'Covert',   color:'#EB4B4B', img:F+'128fx128f(2)'},
  {id:11, name:'Glock-18 | Water Elemental', price:12.50,rarity:'Restricted',color:'#8847FF', img:F+'128fx128f(3)'},
  {id:12, name:'Karambit | Doppler',      price:850.00,  rarity:'Covert',   color:'#EB4B4B', img:F+'128fx128f(4)'},
  {id:13, name:'Desert Eagle | Blaze',    price:95.00,   rarity:'Restricted',color:'#8847FF',img:F+'128fx128f(5)'},
  {id:14, name:'M4A1-S | Hyper Beast',    price:55.00,   rarity:'Covert',   color:'#EB4B4B', img:F+'128fx128f(6)'},
  {id:15, name:'SSG 08 | Blood in the Water', price:75.00,rarity:'Covert',  color:'#EB4B4B', img:F+'128fx128f(7)'},
  {id:16, name:'P250 | See Ya Later',     price:8.00,    rarity:'Restricted',color:'#8847FF',img:F+'128fx128f(8)'},
  {id:17, name:'FAMAS | Roll Cage',       price:18.00,   rarity:'Classified',color:'#8847FF',img:F+'128fx128f(9)'},
  {id:18, name:'SG 553 | Integrale',      price:25.00,   rarity:'Classified',color:'#8847FF',img:F+'128fx128f(10)'},
  {id:19, name:'Galil AR | Chatterbox',   price:65.00,   rarity:'Covert',   color:'#EB4B4B', img:F+'128fx128f(11)'},
  {id:20, name:'MAC-10 | Neon Rider',     price:22.00,   rarity:'Covert',   color:'#EB4B4B', img:F+'128fx128f(12)'}
];

// ==========================================
// STATE
// ==========================================
const state = {
  balance: 1500,
  inventory: JSON.parse(JSON.stringify(DB)),
  selected: null,
  target: null,
  busy: false,
  nextId: 1000,
  authorized: false,
  user: {
    nick: 'GEMER777',
    avatar: F + 'default-avatar-200.webp'
  }
};

const $ = id => document.getElementById(id);

// ==========================================
// LIVE DROP
// ==========================================
function renderLiveDrop(){
  const el = $('liveDrop');
  el.innerHTML = '';
  const items = [...DB].sort(()=>Math.random()-.5).slice(0,14);
  items.forEach(it=>{
    const c = document.createElement('div');
    c.className = 'drop-card';
    c.innerHTML = `
      <div class="top-bar" style="background:${it.color}"></div>
      <img class="img" src="${it.img}" alt="">
      <div class="info">
        <div class="n">${it.name.split(' | ')[1]||it.name}</div>
        <div class="w">${it.name.split(' | ')[0]}</div>
      </div>
    `;
    el.appendChild(c);
  });
}

// ==========================================
// INVENTORY
// ==========================================
function renderInventory(){
  const el = $('invGrid');
  el.innerHTML = '';
  if(state.inventory.length === 0){
    el.innerHTML = '<div style="grid-column:1/-1;color:#a7a7a7;text-align:center;padding:30px;font-size:13px">Инвентарь пуст</div>';
    return;
  }
  state.inventory.forEach(it=>{
    const d = document.createElement('div');
    d.className = 'inv-item';
    if(state.selected && state.selected.id===it.id) d.classList.add('sel');
    d.innerHTML = `
      <div class="iw"><img src="${it.img}" alt="" loading="lazy"></div>
      <div class="nm">${it.name}</div>
      <div class="pr">$${it.price.toFixed(2)}</div>
      <div class="rb" style="background:${it.color}"></div>
    `;
    d.addEventListener('click', ()=>pickItem(it));
    el.appendChild(d);
  });
}

// ==========================================
// TILES
// ==========================================
function renderTiles(){
  const el = $('tiles');
  el.innerHTML = '';
  const list = [...DB].sort((a,b)=>b.price-a.price);
  list.forEach(it=>{
    const d = document.createElement('div');
    d.className = 'tile';
    d.style.borderBottomColor = it.color;
    d.innerHTML = `
      <div class="iw"><img src="${it.img}" alt="" loading="lazy"></div>
      <div class="nm">${it.name}</div>
      <div class="pr">$${it.price.toFixed(2)}</div>
    `;
    d.addEventListener('click', ()=>{
      if(state.busy) return;
      if(!state.selected){ showToast('Сначала выберите предмет из инвентаря','error'); return; }
      if(it.price <= state.selected.price){ showToast('Целевой предмет должен быть дороже','error'); return; }
      state.target = it;
      $('targetImg').src = it.img;
      $('targetName').textContent = it.name;
      $('targetPrice').textContent = '$'+it.price.toFixed(2);
      updateWheel();
    });
    el.appendChild(d);
  });
}

// ==========================================
// PICK ITEM
// ==========================================
function pickItem(item){
  if(state.busy) return;
  state.selected = item;
  $('yourImg').src = item.img;
  $('yourName').textContent = item.name;
  $('yourPrice').textContent = '$'+item.price.toFixed(2);
  autoTarget();
  renderInventory();
  updateWheel();
}

function autoTarget(){
  if(!state.selected) return;
  const pool = DB.filter(d=>d.price > state.selected.price*1.3 && d.price <= state.selected.price*6);
  const fallback = DB.filter(d=>d.price > state.selected.price);
  const arr = pool.length ? pool : fallback;
  if(arr.length){
    const t = arr[Math.floor(Math.random()*arr.length)];
    state.target = t;
    $('targetImg').src = t.img;
    $('targetName').textContent = t.name;
    $('targetPrice').textContent = '$'+t.price.toFixed(2);
  }
}

// ==========================================
// WHEEL
// ==========================================
function calcPercent(){
  if(!state.selected||!state.target) return 0;
  const r = state.selected.price / state.target.price;
  return Math.max(5, Math.min(90, Math.round(r*100)));
}

function updateWheel(){
  const p = calcPercent();
  const C = 2*Math.PI*85;
  const dash = (p/100)*C;
  const circle = $('pCircle');
  circle.setAttribute('stroke-dasharray', `${dash} ${C}`);
  $('percentLabel').textContent = p+'%';

  let col = '#23d70c';
  if(p<60) col = '#FDD911';
  if(p<30) col = '#EB4B4B';
  circle.setAttribute('stroke', col);
  $('percentLabel').style.color = col;

  const angle = (p/100)*360 - 90;
  $('pointer').style.transform = `rotate(${angle}deg)`;

  $('upgradeBtn').disabled = !state.selected || !state.target || state.busy;
}

// ==========================================
// UPGRADE
// ==========================================
function doUpgrade(){
  if(state.busy||!state.selected||!state.target) return;
  state.busy = true;
  $('upgradeBtn').classList.add('loading');
  $('spinner').classList.add('show');

  const p = calcPercent();
  const sel = state.selected;
  const tgt = state.target;

  setTimeout(()=>{
    const win = Math.random()*100 < p;
    state.inventory = state.inventory.filter(i=>i.id!==sel.id);

    if(win){
      state.nextId++;
      state.inventory.push({...tgt, id: state.nextId});
      showResult(true, tgt);
    } else {
      showResult(false, sel);
    }

    state.selected = null;
    state.target = null;
    state.busy = false;
    $('upgradeBtn').classList.remove('loading');
    $('spinner').classList.remove('show');

    $('yourImg').src = F+'unknown-item.svg';
    $('yourName').textContent = '';
    $('yourPrice').textContent = '';
    $('targetImg').src = F+'unknown-item-2.svg';
    $('targetName').textContent = '';
    $('targetPrice').textContent = '';

    updateWheel();
    renderInventory();
  }, 2200);
}

// ==========================================
// RESULT
// ==========================================
function showResult(win, item){
  $('resultBox').className = 'result ' + (win?'win':'lose');
  $('rIcon').textContent = win?'🎉':'💀';
  $('rTitle').textContent = win?'Успех!':'Провал...';
  $('rImg').src = item.img;
  $('rName').textContent = win ? item.name : 'Предмет потерян';
  $('rPrice').textContent = win ? '$'+item.price.toFixed(2) : '';
  $('resultOverlay').classList.add('show');
}

$('rBtn').addEventListener('click', ()=>{
  $('resultOverlay').classList.remove('show');
});

// ==========================================
// AUTH
// ==========================================
function login(){
  state.authorized = true;
  $('authOverlay').style.display = 'none';
  $('steamBtnHeader').style.display = 'none';
  $('profileBox').style.display = 'flex';
  $('headerNick').textContent = state.user.nick;
  $('headerAvatar').src = state.user.avatar;
  updateBalanceView();
  showToast('Вы успешно вошли через Steam','success');
}

function updateBalanceView(){
  const v = '$' + state.balance.toFixed(2);
  $('headerBalance').textContent = v;
  $('modalBalance').textContent = v;
}

$('steamBtnHeader').addEventListener('click', login);
$('steamBtnInv').addEventListener('click', login);

// ==========================================
// UPGRADE BUTTON
// ==========================================
$('upgradeBtn').addEventListener('click', doUpgrade);

// ==========================================
// SETTINGS MODAL
// ==========================================
$('openSettings').addEventListener('click', ()=>{
  $('nickInput').value = state.user.nick;
  $('avatarPreviewImg').src = state.user.avatar;
  updateBalanceView();
  $('settingsModal').classList.add('show');
});

$('closeSettings').addEventListener('click', ()=> $('settingsModal').classList.remove('show'));
$('cancelSettings').addEventListener('click', ()=> $('settingsModal').classList.remove('show'));

$('avatarInput').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    $('avatarPreviewImg').src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

$('addBalance').addEventListener('click', ()=>{
  state.balance += 100;
  updateBalanceView();
});

$('saveSettings').addEventListener('click', ()=>{
  const newNick = $('nickInput').value.trim();
  if(newNick) state.user.nick = newNick;
  state.user.avatar = $('avatarPreviewImg').src;
  $('headerNick').textContent = state.user.nick;
  $('headerAvatar').src = state.user.avatar;
  $('settingsModal').classList.remove('show');
  showToast('Профиль сохранён','success');
});

// ==========================================
// TOAST
// ==========================================
function showToast(msg, type='info'){
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 3500);
}

// ==========================================
// INIT
// ==========================================
renderLiveDrop();
renderInventory();
renderTiles();
updateWheel();

setInterval(()=>{
  renderLiveDrop();
  const base = 5972;
  const delta = Math.floor(Math.random()*60)-30;
  $('onlineCount').textContent = (base+delta).toLocaleString('ru-RU');
}, 6000);