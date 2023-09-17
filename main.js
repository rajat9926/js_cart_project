let prod = document.getElementsByClassName("products")[0];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateshop = () => {
  prod.innerHTML = itemsList
    .map((a, i) => {
      let { id, name, price, desc, Image } = a;
      let search = basket.find((x) => x.id === id) || [];
      return `<div class="items">
  <img src=${Image} width="200px" alt="">
  <div class="details">
      <h3 class="title">${name}</h3>
      <p class="desc">${desc}</p>
  </div>
  <div class="amt">
      <h2 class="amount">$ ${price}</h2>
      <div class="buttons">
          <i onclick="dec(${id})" class="bi bi-dash"></i>
          <div id=${id} class="qty">${
        search.qty === undefined ? 0 : search.qty
      }</div>
          <i onclick="inc(${id})" class="bi bi-plus-lg"></i>
      </div>
  </div>
</div>`;
    })
    .join("");
};

generateshop();

function inc(a) {
  let search = basket.find((i) => i.id === a);
  if (search === undefined) {
    basket.push({ id: a, qty: 1 });
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
  localStorage.setItem("data", JSON.stringify(basket));
}

function update(a) {
  let search = basket.find((x) => {
    return x.id === a;
  });
  document.getElementById(a).innerHTML = search.qty;
  totalitems();
}

let totalitems = () => {
  let search = basket
    .map((x) => {
      return x.qty;
    })
    .reduce((x, y) => {
      return x + y;
    }, 0);
  document.getElementsByClassName("cartamount")[0].innerText = search;
};

totalitems();
