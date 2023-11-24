document.addEventListener("DOMContentLoaded", function() {
    let signupBtn = document.getElementById("signupBtn");
    let logoutBtn = document.getElementById("logoutBtn");
    let nameInput = document.getElementById("nameInput");
    let emailInput = document.getElementById("emailInput");
    let passwordInput = document.getElementById("passwordInput");
    let nameError = document.getElementById("nameError");
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");
    let nameValid = document.getElementById("nameValid");
    let emailValid = document.getElementById("emailValid");
    let passwordValid = document.getElementById("passwordValid");

    function showError(input, errorElement, validElement, message) {
        errorElement.textContent = "❌ " + message;
        validElement.style.display = "none";
    }

    function showValid(validElement, errorElement) {
        validElement.textContent = "✔";
        errorElement.textContent = "";
    }

    nameInput.addEventListener("input", function() {
        if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
            showError(nameInput, nameError, nameValid, " ");
        } else {
            showValid(nameValid, nameError);
        }
    });

    emailInput.addEventListener("input", function() {
        if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            showError(emailInput, emailError, emailValid, " ");
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

    signupBtn.addEventListener("click", function() {
        // Проверка всех полей валидации
        if (!/^[a-zA-Z]+$/.test(nameInput.value)) {
            showError(nameInput, nameError, nameValid, "");
            return;
        } else {
            showValid(nameValid, nameError);
        }

        if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
            showError(emailInput, emailError, emailValid, "");
            return;
        } else {
            showValid(emailValid, emailError);
        }

        if (passwordInput.value.length < 8 || !/[A-Z]/.test(passwordInput.value) || !/[@#$&]/.test(passwordInput.value)) {
            showError(passwordInput, passwordError, passwordValid, "");
            return;
        } else {
            showValid(passwordValid, passwordError);
        }

        // Если админские данные, перенаправление на страницу админа
        if (nameInput.value === "Admin" && emailInput.value === "admin@admin.ad" && passwordInput.value === "Admin@@@") {
            window.location.href = "admin.html";
            return;
        }

        const userCount = localStorage.getItem('userCount') || 0;
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem('userData' + (userCount + 1), JSON.stringify(userData));
        localStorage.setItem('userCount', userCount + 1);

        // Перенаправление на главную страницу
        window.location.href = "index.html";
    });

    logoutBtn.addEventListener("click", function() {
        window.location.href = "index.html";
    });
});
