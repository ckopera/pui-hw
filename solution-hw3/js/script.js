/* Global Variables */
let glazingOptions = ["Keep Original", "Sugar Milk", "Vanilla Milk", "Double Chocolate"];
let glazingValues = [0, 0, 0.5, 1.5];
let packSizeOptions = ["1", "3", "6", "12"];
let packSizeValues = [1, 3, 5, 10];
const basePrice = 2.49;
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
    // console.log(typeof packSizeValue, packSizeValue);
    let packPrice = packSizePrice[packSizeValue];
    newPrice = (basePrice + glazePrice) * packPrice;
    newPrice = newPrice.toFixed(2);
    document.getElementById("price").innerHTML = "$" + newPrice;
    return newPrice;
}

