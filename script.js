let cart = [];
let cartCount = document.getElementById("cart");
let cartPanel = document.getElementById("cartPanel");
let cartItemsDiv = document.getElementById("cartItems");
let totalEl = document.getElementById("total");

// all product cart icons
let addToCartBtns = document.querySelectorAll(".cart-icon");

// ADD TO CART
addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let parent = btn.parentElement;
    let name = parent.querySelector("h3").innerText;
    let price = parseInt(parent.querySelector("span").innerText.replace("$",""));

    let existingItem = cart.find(item => item.name === name);

    if(existingItem){
      existingItem.qty += 1;
    }else{
      cart.push({ name, price, qty: 1 });
    }

    updateCart();
  });
});

// UPDATE CART UI
function updateCart(){
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    cartItemsDiv.innerHTML += `
      <div style="margin-bottom:10px">
        <b>${item.name}</b><br>
        ₹${item.price} x ${item.qty}
        <button onclick="increase(${index})">+</button>
        <button onclick="decrease(${index})">-</button>
      </div>
    `;
  });

  cartCount.innerText = count;
  totalEl.innerText = total;
}

// INCREASE QTY
function increase(i){
  cart[i].qty++;
  updateCart();
}

// DECREASE QTY
function decrease(i){
  cart[i].qty--;
  if(cart[i].qty === 0){
    cart.splice(i,1);
  }
  updateCart();
}

// OPEN CART
document.querySelector(".icons").addEventListener("click", () => {
  cartPanel.classList.add("active");
  document.querySelector(".body").classList.add("disable");
  document.body.classList.add("noscroll");
});

// CLOSE CART
document.getElementById("closeCart").addEventListener("click", () => {
  cartPanel.classList.remove("active");
  document.querySelector(".body").classList.remove("disable");
  document.body.classList.remove("noscroll");
});


