//-------- CATCH DOM ELEMENT --------\\
const alert = document.querySelector(".alert");
const itemToSearch = document.querySelector(".item-to-search");
const itemForm = document.querySelector(".item-form");
const itemToAdd = document.querySelector(".item-to-add");
const reset = document.querySelector(".reset");
const ul = document.querySelector("ul");
const li_s = document.querySelectorAll("li");
const check = document.querySelector(".toggle");
//-------- EVENT LISTENENRS --------\\
reset.addEventListener("click", resetList);
itemToSearch.addEventListener("keyup", filter);
itemForm.addEventListener("submit", addItem);
ul.addEventListener("click", dropItem);
check.addEventListener("click", alertControl);
//-------- FUNCTIOINS --------\\
// resetList everything to nothing
function resetList(event) {
  if (ul.innerHTML != "") {
    swal({
      title: "You are about to delete everything!",
      text: "Are you sure?!",
      icon: "error",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        ul.innerHTML = "";
      }
    });
    alert.textContent = "All Items has been deleted.";
  } else {
    alert.textContent = "List Already Empty.";
  }
  fade();
}
// filter searching
function filter(event) {
  const text = event.target.value.toLowerCase();
  let itemsList = ul.querySelectorAll("li");
  itemsList = Array.from(itemsList);
  itemsList.forEach(item => {
    if (item.innerText.toLowerCase().indexOf(text) != -1) {
      item.classList.remove("hide");
    } else {
      item.classList.add("hide");
    }
  });
}
// add items to ul list
function addItem(event) {
  event.preventDefault();
  //get the value from the input
  let item = itemToAdd.value;
  if (item.trim() != "") {
    //create li element
    let li = document.createElement("li");
    // add a class namle to li created
    li.className = "item";
    // append the lin to the ul element
    ul.appendChild(li);
    // set the content of li
    li.innerHTML = `<i class="trash alternate outline icon"></i>${item}`;
  }
}
// remove item from the list
function dropItem(event) {
  if (event.target.classList.contains("trash")) {
    let str = `you are about to remove ' ${event.target.parentElement.innerText} ' item !!.`;
    if (check.classList.contains("on")) {
      swal({
        title: "Are you sure?",
        text: str,
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          deleteChild(event);
        }
      });
    } else {
      deleteChild(event);
    }
  }
}
// toggle class check for Alert
function alertControl(event) {
  event.target.classList.toggle("on");
  event.target.classList.toggle("off");
}
// delete child
function deleteChild(event) {
  const li = event.target.parentElement;
  ul.removeChild(li);
  fade();
}
// fadeout alert
function fade() {
  alert.style.opacity = "1";
  setTimeout(function() {
    alert.style.opacity = "0";
  }, 2000);
}
