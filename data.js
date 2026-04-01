// Currency helper — all prices are in Philippine Peso
function fmt(amount) {
  return '₱' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const PRODUCTS = [
  {id:1,title:"Wireless Earbuds Pro Max Noise Cancelling Bluetooth 5.3",price:335,orig:1679,off:80,img:"https://picsum.photos/seed/earbuds/300/300",category:"Electronics",colors:["Black","White","Blue"],rating:4.7,reviews:12843,sold:"50k+"},
  {id:2,title:"Women's Floral Summer Dress Casual Boho Beach Sundress",price:475,orig:1959,off:76,img:"https://picsum.photos/seed/dress/300/300",category:"Fashion",colors:["Pink","Yellow","White"],sizes:["S","M","L","XL"],rating:4.5,reviews:8921,sold:"30k+"},
  {id:3,title:"LED Desk Lamp USB Rechargeable Eye-Caring Study Light",price:223,orig:1119,off:80,img:"https://picsum.photos/seed/lamp/300/300",category:"Home",colors:["White","Black"],rating:4.6,reviews:5432,sold:"20k+"},
  {id:4,title:"Vitamin C Brightening Face Serum Anti-Aging Glow Boost",price:240,orig:1232,off:81,img:"https://picsum.photos/seed/serum/300/300",category:"Beauty",rating:4.4,reviews:9876,sold:"40k+"},
  {id:5,title:"Men's Running Sneakers Lightweight Breathable Sport Shoes",price:727,orig:3359,off:78,img:"https://picsum.photos/seed/shoes/300/300",category:"Fashion",sizes:["39","40","41","42","43","44"],colors:["Black","White","Gray"],rating:4.3,reviews:7654,sold:"25k+"},
  {id:6,title:"Smart Watch Fitness Tracker Heart Rate Blood Oxygen Monitor",price:559,orig:2799,off:80,img:"https://picsum.photos/seed/watch/300/300",category:"Electronics",colors:["Black","Rose Gold","Silver"],rating:4.5,reviews:15234,sold:"60k+"},
  {id:7,title:"Portable Blender USB Rechargeable Mini Smoothie Maker",price:363,orig:1568,off:77,img:"https://picsum.photos/seed/blender/300/300",category:"Home",colors:["Pink","Green","Blue"],rating:4.6,reviews:4321,sold:"18k+"},
  {id:8,title:"Waterproof Mascara Long Lasting Volume Curl Lash Wand",price:167,orig:839,off:80,img:"https://picsum.photos/seed/mascara/300/300",category:"Beauty",rating:4.2,reviews:6543,sold:"35k+"},
];

const CATEGORIES = [
  {icon:"📱",label:"Electronics"},
  {icon:"👗",label:"Fashion"},
  {icon:"🏠",label:"Home"},
  {icon:"💄",label:"Beauty"},
  {icon:"🏃",label:"Sports"},
  {icon:"🧸",label:"Toys"},
  {icon:"🌿",label:"Garden"},
  {icon:"🐾",label:"Pets"},
  {icon:"📚",label:"Books"},
  {icon:"🔧",label:"Tools"},
];

const REVIEWS = [
  {author:"Maria S.",stars:5,text:"Absolutely love this! Quality is way better than expected for the price. Fast shipping too!",date:"Mar 28"},
  {author:"John D.",stars:4,text:"Great product, matches the description. Would buy again. Packaging was secure.",date:"Mar 25"},
  {author:"Aisha K.",stars:5,text:"Omg this is so good!! Already ordered 3 more as gifts. 10/10 recommend 🔥",date:"Mar 20"},
  {author:"Carlos M.",stars:4,text:"Good quality for the price. Took about 2 weeks to arrive but worth the wait.",date:"Mar 15"},
];

const ADDRESSES = [
  {id:1,name:"[Name]",phone:"[phone_number]",line:"123 Main Street, Apt 4B",city:"Manila",zip:"1000",region:"Metro Manila",delivery:"Apr 8 - Apr 12"},
  {id:2,name:"[Name] (Work)",phone:"[phone_number]",line:"456 Business Ave, Floor 3",city:"Makati",zip:"1200",region:"Metro Manila",delivery:"Apr 9 - Apr 13"},
];
