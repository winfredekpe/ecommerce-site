// grabbing elements

cartbtn = document.querySelector(".cart");
checkout = document.querySelector(".checkout");
closebtn = document.querySelector(".close");
addbtns = document.querySelectorAll(".btn");
selected = document.querySelector(".select");
selecteditems = document.querySelector(".selected");
number = document.querySelector(".number");
filterbtn = document.querySelector(".left");
modal = document.querySelector(".modal");
paypal = document.querySelector(".checkoutbtn");
closepaypal = document.querySelector(".closeit");
products = document.querySelectorAll(".product");
finaltotalprice = document.querySelector("#finaltotalprice");

// adding event listeneres

cartbtn.addEventListener("click", show);
closebtn.addEventListener("click", hide);
for (btn of addbtns) {
  btn.addEventListener("click", addtocart);
}
filterbtn.addEventListener("click", filter);

paypal.addEventListener("click", showmodal);
closepaypal.addEventListener("click", hidemodal);

// functions

function show() {
  checkout.style.display = "block";
}

function hide() {
  checkout.style.display = "none";
}

// displaying thank you check out page

function showmodal() {
  modal.style.display = "block";
}

// function to hide modal

function hidemodal() {
  modal.style.display = "none";
}

function addtocart(e) {
  btn = e.target;
  price = btn.parentNode.parentNode.parentNode.lastElementChild.textContent;
  bg = btn.parentNode.parentNode.parentNode.style.background;
  id = btn.parentNode.parentNode.parentNode.getAttribute("data-id");

  // checking if item already exists

  added = document.querySelectorAll(".item");
  allid = [];

  for (i of added) {
    selectedid = i.getAttribute("data-id");
    allid.push(selectedid);
  }

  if (allid.includes(id)) {
    alert("item added already");
    return;
  } else {
    // creating the item

    remove = document.createElement("div");
    remove.classList.add("remove");
    closelogo = document.createElement("i");
    closelogo.classList.add("fas");
    closelogo.classList.add("fa-times-circle");
    closelogo.classList.add("forcepop");
    productcount = document.createElement("div");
    productcount.classList.add("productcount");
    productcount.innerText = "1";
    remove.innerHTML = '<i class="fas fa-times-circle forcepop></i>';
    item = document.createElement("div");
    item.classList.add("item");
    item.setAttribute("data-id", id);
    item.setAttribute("data-price", parseInt(price.replace("$", "")));
    imgdiv = document.createElement("div");
    imgdiv.classList.add("img");
    imgdiv.style.background = bg;
    input = document.createElement("input");
    input.setAttribute("min", "1");
    input.setAttribute("max", "20");
    input.setAttribute("type", "range");
    input.setAttribute("value", "1");
    itemtotal = document.createElement("div");
    itemtotal.classList.add("itemtotal");
    itemtotal.setAttribute("id", "fpu");
    itemtotal.textContent = price;
    item.appendChild(imgdiv);
    item.appendChild(input);
    item.appendChild(itemtotal);
    item.appendChild(remove);
    item.appendChild(productcount);
    selecteditems.appendChild(item);

    newnumber = number.textContent;
    newnumber++;
    number.textContent = newnumber;

    // adding event listeners to new items

    // deleteing
    removebtns = document.querySelectorAll(".forcepop");
    removebtns.forEach((x) => {
      x.addEventListener("click", removeitem);
    });

    // updating from slider
    sliders = document.querySelectorAll(".item input");
    sliders.forEach((x) => {
      x.addEventListener("input", updateslider);
    });

    // updating total final price
    totalfinalprice();
  }
}

// funciion to filter the products based on price
function filter() {
  // getting selected option
  option = selected.selectedOptions[0];
  optionprice = option.getAttribute("data-price");
  for (product of products) {
    price = product.lastElementChild.textContent.replace("$", "");
    itemsprice = parseFloat(price);
    if (itemsprice < optionprice) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  }
}

function removeitem() {}

function updateslider(e) {
  // update value
  value = e.target.value;
  e.target.parentNode.lastElementChild.textContent = value;
  // update price
  totalprice = parseInt(e.target.parentNode.getAttribute("data-price"));
  finalprice = totalprice * parseInt(value);
  e.target.parentNode.children[2].textContent = "$" + finalprice;
  // updating totalprice
  totalfinalprice();
}

function totalfinalprice() {
  fp = document.querySelectorAll("#fpu");
  amount = 0;
  fp.forEach((finalp) => {
    p = parseFloat(finalp.textContent.replace("$", ""));
    amount += p;
  });
  finaltotalprice.textContent = amount;
}
