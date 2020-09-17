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
    // the close button
    remove = document.createElement("div");
    remove.classList.add("remove");
    closelogo = document.createElement("i");
    closelogo.classList.add("fas");
    closelogo.classList.add("fa-times-circle");
    closelogo.classList.add("popmydad");
    remove.appendChild(closelogo);
    // end of item close button
    productcount = document.createElement("div");
    productcount.classList.add("productcount");
    productcount.innerText = "1";
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

    // deleteing from the list of selected it
    removeitem();

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

// updating the value of the seleced when the amount of items to buy is changed by sliding
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

// updating the total price of the selected price to be paid

function totalfinalprice() {
  fp = document.querySelectorAll("#fpu");
  amount = 0;
  fp.forEach((finalp) => {
    p = finalp.textContent.replace("$", "");
    p = Number(p);
    amount += p;
  });
  finaltotalprice.textContent = amount.toFixed(2);
}

// removing an item from the list of selected items

function removeitem() {
  popbtns = document.querySelectorAll(".popmydad");
  popbtns.forEach((popbtn) => {
    popbtn.addEventListener("click", function () {
      parentbox = this.parentNode.parentNode.remove();
      console.log(parentbox);
      totalfinalprice();
      updatecartnumber();
    });
  });
}

// updating the cart number after delete an item

function updatecartnumber() {
  itms = document.querySelector(".selected");
  charttotal = document.querySelector(".number");
  num = itms.children.length;
  charttotal.textContent = num;
}

// removing al items from cat after clicking the close button

closeit = document.querySelector(".closeit");
closeit.addEventListener("click", (x) => {
  itms = document.querySelector(".selected");
  itms.innerHTML = "";
  // hiding the checkout section and modal
  modal.style.display = "none";
  checkout.style.display = "none";
  // updating the number also and other updates
  updatecartnumber();
  totalfinalprice();
});
