"use strict";
const btnInput = document.querySelector("#input-btn");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#save-btn");
const inputEl = document.querySelector("#input-el");
const ulElement = document.querySelector("#ul-el");

let myLeads = [];

const leadFromLocalStorage = JSON.parse(localStorage.getItem("links"));

if (leadFromLocalStorage) {
  myLeads = leadFromLocalStorage;
  renderLead(myLeads);
}

btnInput.addEventListener("click", () => {
  let value = inputEl.value;
  if (value === "") {
    return;
  } else {
    myLeads.push(value);
    localStorage.setItem("links", JSON.stringify(myLeads));
  }

  renderLead(myLeads);
  inputEl.value = "";
});

deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  renderLead(myLeads);
});

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("links", JSON.stringify(myLeads));
    renderLead(myLeads);
  });
});

function renderLead(leads) {
  ulElement.innerHTML = "";
  let listItems = "";
  for (let i = 0; i < leads.length; i++) {
    listItems += `
    <li>
    <a target= "_blank" href = "${leads[i]}">${leads[i]}</a>
    </li>
    `;
  }
  ulElement.innerHTML += listItems;
}
