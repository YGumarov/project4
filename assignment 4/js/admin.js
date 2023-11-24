document.addEventListener('DOMContentLoaded', function () {
    loadRegisteredUsers();

    document.getElementById("logoutBtn").addEventListener("click", function () {
        window.location.href = "index.html";
    });
});

function loadRegisteredUsers() {
    const registeredUsersList = document.getElementById('registeredUsersList');
    registeredUsersList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            const userData = JSON.parse(localStorage.getItem(key));
            const username = userData.username;
            const email = userData.email;

            const userItem = document.createElement('li');
            userItem.classList.add('list-group-item');
            userItem.innerHTML = `${username} (${email}) 
                <button data-email="${email}" class="btn btn-info btn-sm edit-user me-2">Edit</button> 
                <button data-email="${email}" class="btn btn-danger btn-sm delete-user">Delete</button>`;
            registeredUsersList.appendChild(userItem);
        }
    }
}

document.getElementById('addUserForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const adminUsernameInput = document.getElementById('adminUsername');
    const adminEmailInput = document.getElementById('adminEmail');
    const adminPasswordInput = document.getElementById('adminPassword');
    const username = adminUsernameInput.value;
    const email = adminEmailInput.value;
    const password = adminPasswordInput.value;
    if (localStorage.getItem(`user_${email}`)) {
        alert('User with this email already exists.');
    } else {
        const user = {
            username,
            email,
            password,
        };
        localStorage.setItem(`user_${email}`, JSON.stringify(user));
        adminUsernameInput.value = '';
        adminEmailInput.value = '';
        adminPasswordInput.value = '';
        loadRegisteredUsers();
    }
});

document.getElementById('registeredUsersList').addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-user')) {
        const email = e.target.getAttribute('data-email');
        const user = JSON.parse(localStorage.getItem(`user_${email}`));

        const newUsername = prompt('Enter a new username:', user.username);
        if (newUsername !== null) {
            user.username = newUsername;
            localStorage.setItem(`user_${email}`, JSON.stringify(user));
            loadRegisteredUsers();
        }
    }

    if (e.target.classList.contains('delete-user')) {
        if (confirm('Are you sure you want to delete this user?')) {
            const email = e.target.getAttribute('data-email');
            localStorage.removeItem(`user_${email}`);
            loadRegisteredUsers();
        }
    }
});
