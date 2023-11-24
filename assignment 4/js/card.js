let userName=document.getElementById("name");
let CardNumber=document.getElementById("Number");
let expiryDate=document.getElementById("date");
let cvc=document.getElementById("cvc");
let form=document.querySelector("form");



function validateInput() {
  const nameValue = userName.value.trim();
  const namePattern = /^[A-Za-z\s]+$/;
  const inputErrorMessages = [];

  if (nameValue === "") {
    inputErrorMessages.push("Name cannot be empty.");
  }

  if (!namePattern.test(nameValue)) {
    inputErrorMessages.push("Name can only contain letters and spaces.");
  }

  displayInputErrorMessages(inputErrorMessages);
  return inputErrorMessages.length === 0;
}

function displayInputErrorMessages(messages) {
  let parent = userName.parentElement;
  let messageEle = parent.querySelector("small");

  if (messages.length > 0) {
    const errorMessage = messages.join(" ");
    messageEle.style.visibility = "visible";
    messageEle.innerText = errorMessage;
  } else {
    messageEle.style.visibility = "hidden";
    messageEle.innerText = "";
  }
}





// -------------------------------------------------------------------------------------------------------------------------------------------------------






function validateCardNumber() {
  const cardNumberValue = CardNumber.value.trim().replace(/\s/g, '');

  if (cardNumberValue === "") {
    displayErrorMessage("Card number must not be empty.");
    return false;
  } else {
    const cardNumberPattern = /^\d{16}$/;

    if (cardNumberPattern.test(cardNumberValue)) {
      const formattedCardNumber = formatCardNumber(cardNumberValue);
      CardNumber.value = formattedCardNumber;
      displayErrorMessage("");
      return true;
    } else {
      displayErrorMessage("Card number must consist of 16 digits with no letters or special characters.");
      return false;
    }
  }
}

function displayErrorMessage(message) {
  let parent = CardNumber.parentElement;
  let messageEle = parent.querySelector("small");
  messageEle.style.visibility = message ? "visible" : "hidden";
  messageEle.innerText = message;
}

function formatCardNumber(cardNumber) {
  
  return cardNumber.replace(/(\d{4})/g, '$1 ').trim();
}


// ------------------------------------------------------------------------------------------------------------------------------------


function validateExpiryDate() {
  const expiryDateValue = expiryDate.value.trim();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100; // Получение последних двух цифр текущего года
  const currentMonth = currentDate.getMonth() + 1; // getMonth() возвращает 0-11, добавляем 1 для получения текущего месяца

  const maxLength = 4; 

  const expiryErrorMessages = [];

  if (expiryDateValue === "") {
    expiryErrorMessages.push("Expiry date cannot be empty.");
    // return false;
  }

  if (expiryDateValue.length !== maxLength || !/^\d{1,4}$/.test(expiryDateValue)) {
    expiryErrorMessages.push("Expiry date must be a valid 4-digit number.");
  } else {
    const month = parseInt(expiryDateValue.slice(0, 2));
    const year = parseInt(expiryDateValue.slice(2));

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
      expiryErrorMessages.push("Card has expired.");
    }
  }

  displayExpiryErrorMessages(expiryErrorMessages);
  return expiryErrorMessages.length === 0;
}



function displayExpiryErrorMessages(messages) {
  let parent = expiryDate.parentElement;
  let messageEle = parent.querySelector("small");

  if (messages.length > 0) {
    const errorMessage = messages.join(" ");
    messageEle.style.visibility = "visible";
    messageEle.innerText = errorMessage;
  } else {
    messageEle.style.visibility = "hidden";
    messageEle.innerText = "";
  }
}



// --------------------------------------------------------------------------------------------------------------------------------------------


function validateCVC() {
  const cvcValue = cvc.value.trim();

  if (cvcValue === "") {
    let parent = cvc.parentElement;
    let messageEle = parent.querySelector("small");
    messageEle.style.visibility = "visible";
    messageEle.innerText = "CVC must not be empty.";
  } else {
    const cvcPattern = /^[0-9]{3}$/;

    if (cvcPattern.test(cvcValue)) {
      let parent = cvc.parentElement;
      let messageEle = parent.querySelector("small");
      messageEle.style.visibility = "hidden";
      messageEle.innerText = "";
    } else {
      let parent = cvc.parentElement;
      let messageEle = parent.querySelector("small");
      messageEle.style.visibility = "visible";
      messageEle.innerText = "CVC must consist of 3 digits.";
    }
  }
  
}


document.getElementById("payButton")
.addEventListener("click",(Event)=>{
  // Event.preventDefault();
  // validateInput();
  // validateCardNumber();
  // validateExpiryDate();
  // validateCVC();   

  const isInputValid = validateInput();
  const isCardNumberValid = validateCardNumber();
  const isExpiryDateValid = validateExpiryDate();
  const isCVCValid = validateCVC();


  if (isInputValid && isCardNumberValid && isExpiryDateValid && isCVCValid) {

    window.location.href = "success.html"; 

  }
});