/* Global Variables */
/* Moved params.get to top due to reference error*/
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let glazingOptions = ["Keep Original", "Sugar Milk", "Vanilla Milk", "Double Chocolate"];
let glazingValues = [0, 0, 0.5, 1.5];
let packSizeOptions = ["1", "3", "6", "12"];
let packSizeValues = [1, 3, 5, 10];
let basePrice = parseFloat(rolls[rollType].basePrice);
let newPrice = 0;


/* finding the drop downs from HTML using unique ID */
let selectGlazingElement = document.querySelector('#glazingDropDown');
let selectPackSizeElement = document.querySelector('#packSizeDropDown');


/* For loops populating the dropdown menus */
for (i = 0; i < glazingOptions.length; i++){
    let option = document.createElement("option");
    option.text = glazingOptions[i];
    option.value = glazingValues[i];
    selectGlazingElement.add(option);
}

for (i = 0; i < packSizeOptions.length; i++){
    let option = document.createElement("option");
    option.text = packSizeOptions[i];
    option.value = packSizeValues[i];
    selectPackSizeElement.add(option);
}


/* Objects linking value and price */
const glazingPrice = {
    "0": 0,
    "0": 0,
    "0.5": 0.5,
    "1.5": 1.5
}

const packSizePrice = {
    "1": 1,
    "3": 3,
    "5": 5,
    "10": 10
}


/* Function to calculate final price */ 
function calculatePrice(element){
    let glazingValue = document.getElementById("glazingDropDown").value;
    let packSizeValue = document.getElementById("packSizeDropDown").value;
    let glazePrice = glazingPrice[glazingValue];
    let packPrice = packSizePrice[packSizeValue];
    newPrice = (basePrice + glazePrice) * packPrice;
    newPrice = newPrice.toFixed(2);
    document.getElementById("price").innerHTML = "$" + newPrice;
    return newPrice;
}


/* Changing header on each different item page */
const headerElement = document.querySelector('.slogan');
headerElement.innerText = rollType + " Cinnamon Roll";

/* Changing image on each different item page */
const rollImage = document.querySelector('.image');
rollImage.src = '../assets/products/' + rolls[rollType].imageFile;

/* Changing price on each different item page */
const priceUpdate = document.getElementById('price');
priceUpdate.innerHTML = '$' + rolls[rollType].basePrice;   


/* Add to cart function */
let cart = [];

class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

/* Add to cart button event listener */
const addToCart = document.querySelector('.button');
addToCart.addEventListener("click", createNewRoll);

/* function to load roll type and quantity based on user selection */
function createNewRoll(){
    const glazingIndex = document.getElementById('glazingDropDown').options.selectedIndex;
    const rollGlazing = document.getElementById('glazingDropDown').options[glazingIndex].innerHTML;
    const sizeIndex = document.getElementById('packSizeDropDown').options.selectedIndex;
    const packSize = document.getElementById('packSizeDropDown').options[sizeIndex].innerHTML;
    const basePrice = rolls[rollType].basePrice;
    const newRoll = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.push(newRoll);
    // console.log(cart);
    saveToLocalStorage();
}

// Save and retrieve to localStorage

// Save to local storage
function saveToLocalStorage() {
    const cartArrayString = JSON.stringify(cart);
    sessionStorage.setItem('storedRolls', cartArrayString);
    console.log(cartArrayString);
}

// retrieve from local storage function
function retrieveFromLocalStorage() {
    const cartArrayString = sessionStorage.getItem('storedRolls');
    const cartArray = JSON.parse(cartArrayString);
    for (let item of cartArray){
        cart.push(item);
    }
    console.log(cart);
}

// If statement to get items from local storage if storage is not empty
if (sessionStorage.getItem('storedRolls') != null) {
    retrieveFromLocalStorage();
  }