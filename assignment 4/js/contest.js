
alert("Welcome to the PCODE page!");

let userName = prompt("Please enter your name:");
if (userName) {
    alert(`Hello, ${userName}!`);
}


const button = document.getElementById("myButton");
const input = document.getElementById("myInput");

button.addEventListener("click", () => {
    alert("The button was pressed!");
});

input.addEventListener("input", () => {
    console.log("The value in the input field has changed: " + input.value);
});

const form = document.getElementById("myForm");
form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    alert("The form has been sent!");
});


