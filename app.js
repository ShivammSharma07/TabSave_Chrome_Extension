const btnInput = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulElement = document.querySelector("#ul-el");

let myLeads = [];

const leadFromLocalStorage = JSON.parse(localStorage.getItem("links"));

localStorage.clear();

if (leadFromLocalStorage) {
  myLeads = leadFromLocalStorage;
  // console.log("localstorage");
  renderLead();
}

btnInput.addEventListener("click", () => {
  myLeads.push(inputEl.value);
  localStorage.setItem("links", JSON.stringify(myLeads));

  renderLead();
  // console.log("main value");

  inputEl.value = "";
});

function renderLead() {
  ulElement.innerHTML = "";
  let listItems = "";
  for (let i = 0; i < myLeads.length; i++) {
    listItems += `
    <li>
    <a target= "_blank" href = "${myLeads[i]}">${myLeads[i]}</a>
    </li>
    `;
  }
  ulElement.innerHTML += listItems;
}
