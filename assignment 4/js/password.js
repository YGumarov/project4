document.addEventListener("DOMContentLoaded", function() {
    let resetPasswordBtn = document.getElementById("resetPasswordBtn");
    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");

    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    let nameValid = document.getElementById("nameValid");
    let emailValid = document.getElementById("emailValid");
    let passwordValid = document.getElementById("passwordValid");

    // Функция для отображения ошибок
    function showError(input, errorElement, validElement, message) {
        errorElement.textContent = "❌ " + message;
        validElement.textContent = "";
    }

    // Функция для отображения правильных значений
    function showValid(validElement, errorElement) {
        validElement.textContent = "✔";
        errorElement.textContent = "";
    }

    nameInput.addEventListener("input", function() {
        if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
            showError(nameInput, nameError, nameValid, "");
        } else {
            showValid(nameValid, nameError);
        }
    });

    emailInput.addEventListener("input", function() {
        if (!emailInput.value.includes("@")) {
            showError(emailInput, emailError, emailValid, "");
        } else {
            showValid(emailValid, emailError);
        }
    });

    passwordInput.addEventListener("input", function() {
        if (passwordInput.value.length < 8 || !/[A-Z]/.test(passwordInput.value) || !/[@#$&]/.test(passwordInput.value)) {
            showError(passwordInput, passwordError, passwordValid, "");
        } else {
            showValid(passwordValid, passwordError);
        }
    });

    resetPasswordBtn.addEventListener("click", function() {
        if (
            nameValid.textContent === "✔" &&
            emailValid.textContent === "✔" &&
            passwordValid.textContent === "✔"
        ) {
            const userCount = localStorage.getItem('userCount') || 0;
            let userFound = false;
            for (let i = 1; i <= userCount; i++) {
                const userData = JSON.parse(localStorage.getItem('userData' + i));
                console.log("Stored User Data:", userData); // Debugging line
                if (userData && userData.name === nameInput.value && userData.email === emailInput.value) {
                    userData.password = passwordInput.value;
                    localStorage.setItem('userData' + i, JSON.stringify(userData));
                    userFound = true;
                    break;
                }
            }
            if (userFound) {
                alert("Password reset successful.");
                window.location.href = "index.html";
            } else {
                console.log("Input Values:", nameInput.value, emailInput.value); // Debugging line
                showError(emailInput, emailError, emailValid, "User not found");
            }
        } else {
            alert("Please fill in all fields correctly.");
        }
    });
    })