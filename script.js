const commands={
 marriage:[['/marry','Propose to a member or bot'],['/marrystate','Check a marriage status'],['/partner','See someone’s partner'],['/anniversary','Count your days together'],['/divorce','End your marriage'],['/ship','Check your compatibility'],['/soulmate','Find a possible soulmate']],
 social:[['/hug','Give someone a warm hug'],['/kiss','Send a sweet kiss'],['/cuddle','Cuddle with someone'],['/pat','Give a gentle pat'],['/slap','A playful slap'],['/poke','Poke a friend'],['/highfive','Celebrate together'],['/wink','Send a wink'],['/handhold','Hold hands'],['/compliment','Say something kind']],
 economy:[['/daily','Claim 500 coins daily'],['/work','Earn 100–400 coins hourly'],['/balance','Check your wallet'],['/deposit','Save coins in the bank'],['/withdraw','Take coins from the bank'],['/pay','Give coins to a member'],['/shop','See items and prices'],['/buy','Buy a shop item'],['/sell','Sell an item'],['/inventory','See what you own'],['/leaderboard','Top coin collectors'],['/coinflip','Try your luck']],
 fun:[['/eightball','Ask a mysterious question'],['/rate','Rate anything'],['/choose','Let Sakura choose'],['/roll','Roll the dice'],['/rps','Rock paper scissors'],['/reverse','Reverse your message'],['/ship','Love compatibility']],
 utility:[['/help','Browse commands'],['/avatar','View a profile picture'],['/banner','View a profile banner'],['/userinfo','Learn about a user'],['/serverinfo','Learn about the server'],['/ping','Check bot latency'],['/reminder','Set a reminder']]
};
const shop=[['🌹','Rose',100],['💍','Ring',1000],['👑','Crown',5000],['🍪','Cookie',25],['🧸','Teddy',250]];
const list=document.querySelector('#commandList');
function showCommands(category){list.replaceChildren();commands[category].forEach(([name,description])=>{const row=document.createElement('div');row.className='command-item';const code=document.createElement('code');code.textContent=name;const detail=document.createElement('span');detail.textContent=description;row.append(code,detail);list.append(row)});}
showCommands('marriage');
document.querySelectorAll('.tab').forEach(tab=>tab.addEventListener('click',()=>{document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active');showCommands(tab.dataset.cat)}));
const shopGrid=document.querySelector('#shopGrid');shop.forEach(([emoji,name,price])=>{const item=document.createElement('article');item.className='shop-item';item.innerHTML=`<div class="shop-emoji">${emoji}</div><h3>${name}</h3><p>🪙 ${price.toLocaleString()}</p>`;const btn=document.createElement('button');btn.textContent='Try buying ↗';btn.addEventListener('click',()=>buy(name,price));item.append(btn);shopGrid.append(item)});
let coins=500,claimed=false,married=false;const coinAmount=document.querySelector('#coinAmount'),title=document.querySelector('#previewTitle'),description=document.querySelector('#previewText'),image=document.querySelector('#previewImage');let toastTimeout;
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('show'),2600)}
function update(){coinAmount.textContent=coins.toLocaleString()}
function preview(head,body,photo='sakura-girl'){title.textContent=head;description.textContent=body;image.src=`assets/${photo}.webp`}
function buy(name,price){if(coins<price){toast(`You need ${(price-coins).toLocaleString()} more coins for ${name} ♡`);preview('Not enough coins! ♡',`You need ${price} coins to buy ${name}. Try /daily or /work.`);return}coins-=price;update();preview('A little gift for you! 🎁',`You bought a ${name} for ${price} demo coins. Enjoy your treasure!`);toast(`${name} added to your demo inventory! ✿`)}
document.querySelector('#dailyBtn').addEventListener('click',()=>{if(claimed){toast('Daily reward already claimed in this demo ♡');return}claimed=true;coins+=500;update();preview('Daily gift received! 🎀','Sakura gave you 500 shiny demo coins. Come back tomorrow in the real bot!');toast('+500 coins ✿')});
document.querySelector('#workBtn').addEventListener('click',()=>{const amount=100+Math.floor(Math.random()*301);coins+=amount;update();preview('Lovely work! ✿',`You earned ${amount} demo coins. Sakura is proud of you!`);toast(`+${amount} coins ♡`)});
document.querySelector('#marryBtn').addEventListener('click',()=>{const name=document.querySelector('#partnerName').value.trim();if(!name){toast('Write your partner’s name first ♡');return}if(married){toast('You are already married in this demo ♡');return}married=true;preview('Just Married! 💍',`You ♡ ${name} — Together, under the cherry blossoms. Congratulations!`,'sakura-couple');toast('A beautiful new story begins ✿')});
document.querySelector('#resetBtn').addEventListener('click',()=>{coins=500;claimed=false;married=false;document.querySelector('#partnerName').value='';update();preview('Welcome, sweetheart! ♡','Try the buttons on the left to see Sakura’s adorable replies.');toast('Demo reset ✿')});
const menuBtn=document.querySelector('#menuBtn'), nav=document.querySelector('#nav');
menuBtn.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(opened));});
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');}));

/* Accessible theme switcher; saves the visitor's choice on this device. */
(() => {
  const root=document.documentElement,toggle=document.querySelector('#themeToggle');
  if(!toggle)return;
  const icon=toggle.querySelector('.theme-icon'),label=toggle.querySelector('.theme-label'),meta=document.querySelector('#themeColorMeta');
  let saved=null;try{saved=localStorage.getItem('sakura-theme')}catch(_){}
  const systemDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  function applyTheme(theme){
    root.dataset.theme=theme;const dark=theme==='dark';
    if(icon)icon.textContent=dark?'☀':'☾';
    if(label)label.textContent=dark?'Light mode':'Dark mode';
    toggle.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode');
    toggle.setAttribute('aria-pressed',String(dark));
    if(meta)meta.setAttribute('content',dark?'#17121a':'#fff7fb');
    try{localStorage.setItem('sakura-theme',theme)}catch(_){}
  }
  applyTheme(saved||(systemDark?'dark':'light'));
  toggle.addEventListener('click',()=>applyTheme(root.dataset.theme==='dark'?'light':'dark'));
})();
