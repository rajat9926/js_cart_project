let basket = JSON.parse(localStorage.getItem("data")) || [];

let totalitems = () => {
  let search = basket
    .map((i) => {
      return i.qty;
    })
    .reduce((x, y) => {
      return x + y;
    }, 0);
  document.getElementsByClassName("cartamount")[0].innerText = search;
};
totalitems();

let label = document.getElementById("label");
let shopcart = document.getElementById("cart");

function generatecard() {
  if (basket.length !== 0) {
    label.innerHTML = `<h1>Cart in not empty </h1>`;
    shopcart.innerHTML = basket
      .map((x) => {
        let { id, qty } = x;
        let search = itemsList.find((x) => x.id === id) || [];
        return `<div class="cart-item">
                  <img src=${search.Image} width="200" alt="">
                  <div>
                    <h3>${search.name}</h3>
                    <h3>${search.price}</h3>
                    <div class="buttons">
                      <i onclick="dec(${id})" class="bi bi-dash"></i>
                      <div id=${id} class="qty">${qty}</div>
                      <i onclick="inc(${id})" class="bi bi-plus-lg"></i>
                    </div>
                  </div>
                </div>`;
      })
      .join("");
  } else {
    label.innerHTML = `<h3>Cart Is Empty</h3>`;
    shopcart.innerHTML = '<h1>no items</h1>';
  }
}

generatecard();

function inc(a) {
  let search = basket.find((i) => i.id === a);
  if (search === undefined) {
    basket.push({
      id: a,
      qty: 1,
    });
  } else {
    search.qty += 1;
  }
  update(a);
  localStorage.setItem("data", JSON.stringify(basket));
}

function dec(a) {
  let search = basket.find((i) => i.id === a);
  if (search === undefined) return;
  if (search.qty === 0) return;
  else {
    search.qty -= 1;
  }
  update(a);
  basket = basket.filter((x) => x.qty !== 0);
  generatecard();
  localStorage.setItem("data", JSON.stringify(basket));
}

function update(a) {
  let search = basket.find((x) => {
    return x.id === a;
  });
  document.getElementById(a).innerHTML = search.qty;
  totalitems();
}
