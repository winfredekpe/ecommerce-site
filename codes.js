function removeitem() {
  popbtns = document.querySelectorAll(".popmydad");
  popbtns.forEach((popbtn) => {
    popbtn.addEventListener("click", function () {
      parentbox = this.parentNode.parentNode.remove();
      totalfinalprice();
      updatecartnumber();
    });
  });
}

function for deleting the last item
function deletelast() {
  removed = selecteditems.lastElementChild;
  selecteditems.lastElementChild.children[3].addEventListener(
    "click",
    function () {
      removed.remove();
      console.log("removed");
      totalfinalprice();
      updatecartnumber();
    }
  );
}

let itmz = document.querySelectorAll("#rm");
if (itmz) {
  itmz.forEach(function (x) {
    x.addEventListener("click", function (y) {
      console.log(e.target);
    });
  });
}
