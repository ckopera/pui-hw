// Roll Class
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

// Glazing -> Price dictionary add
const glazingPrice = {
    "Keep Original": 0,
    "Sugar Milk": 0,
    "Vanilla Milk": 0.5,
    "Double Chocolate": 1.5
}

// Pack size -> Price multiplier
const packSizePrice = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
}

// Global variables
const original = new Roll("Original", "Sugar Milk", "1", 2.49);
const walnut = new Roll("Walnut", "Vanilla Milk", "12", 3.49);
const raisin = new Roll("Raisin", "Sugar Milk", "3", 2.99);
const apple = new Roll("Apple", "Keep Original", "3", 3.49);

// Overall set for the cart
let cart = new Set([original, walnut, raisin, apple]);
let cartPrice = 0;

// Adding roll items to cart
for (const c of cart){
    createNewRoll(c);
}

// Creating template for new rolls
function createNewRoll(roll){
    const template = document.querySelector("#cartRoll"); 
    const clone = template.content.cloneNode(true);

    // Cloning template
    roll.element = clone.querySelector("#cartElement"); 

    updateRoll(roll);
    
    // Add to DOM
    document.querySelector("#productList").appendChild(roll.element);
}

// Updating each roll dynamically in the cart
function updateRoll(roll){
    // Update picture
    const rollImage = roll.element.querySelector('#image');
    rollImage.src = '../assets/products/' + rolls[roll.type].imageFile;

    // Update the name
    const rollName = roll.element.querySelector('.cartName');
    rollName.innerHTML = roll.type + " Cinnamon Roll";

    // Update the glazing
    const rollType = roll.element.querySelector('.cartGlaze');
    rollType.innerHTML = "Glazing: " + roll.glazing;

    // Update the pack size
    const rollSize = roll.element.querySelector('.cartSize');
    rollSize.innerHTML = "Pack Size: " + roll.size;

    // Update the item price
    let price = calculatePrice(roll);
    const updatedPrice = roll.element.querySelector('.cartPrice');
    updatedPrice.innerHTML = "$" + price.toFixed(2);

    // Update total cart price
    cartPrice += calculatePrice(roll);
    updatePrice();

    // Activate remove button
    const removeButton = roll.element.querySelector('.remove');
    removeButton.addEventListener("click", () => {removeRoll(roll)});

}

// Calculating each price of each roll dynamically
function calculatePrice(roll) {
    let price = (roll.basePrice + glazingPrice[roll.glazing]) * packSizePrice[roll.size];
    return price;
}

// Displaying updated price to cart
function updatePrice() {
    const totalPrice = document.querySelector('#totalPrice');
    totalPrice.innerHTML = "$" + cartPrice.toFixed(2);
}

// Removing a roll function
function removeRoll(roll) {
    // Remove from array
    cart.delete(roll);

    // Remove from DOM
    roll.element.remove();

    // Update cart price
    cartPrice -= calculatePrice(roll);
    updatePrice();
}