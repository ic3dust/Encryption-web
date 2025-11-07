function showPass() {
    const pass = document.getElementById("pass");
    if (pass.type == "password") {
        pass.type = "text";
    }
    else {
        pass.type = "password";
    }

}
function showPass2() {
    const pass2 = document.getElementById("pass2");
    if (pass2.type == "password") {
        pass2.type = "text";
    }
    else {
        pass2.type = "password";
    }
}

function ifEmpty() {
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const pass2 = document.getElementById("pass2").value.trim();
    const msg = document.getElementById("msg");

    msg.textContent = "";
     if (!name || !surname || !pass || !pass2) {
        msg.style.color = "red";
        msg.textContent = "Please, do not leave those fields empty.";
        return false;
    }

    return true;
}
function ifEmpty2() {
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const msg = document.getElementById("msg");

    msg.textContent = "";
     if (!name || !surname || !pass) {
        msg.style.color = "red";
        msg.textContent = "Please, do not leave those fields empty.";
        return false;
    }

    return true;
}


function signUp() {
    if (!ifEmpty()) return;

    const pass = document.getElementById("pass").value.trim();
    const pass2 = document.getElementById("pass2").value.trim();
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const msg = document.getElementById("msg");
    const strongPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    msg.textContent = "";
    msg.style.color = "red";
    if (pass !== pass2) {
        msg.textContent = "Passwords do not match!";
        return;
    }
    if (!strongPass.test(pass)) {
        msg.textContent = "Password must include at least: 1 Uppercase, 1 Lowercase, 1 Symbol(@,#,...), 1 Number and be at least 8 characters long.";
        return;
    }
    const user = masSfr({name, surname, password: pass})[0];
    const users = JSON.parse(localStorage.getItem("usersData")) || [];

    const userDupe = users.some(u =>
        u.name === user.name && u.surname === user.surname
    );
    if (userDupe) {
        msg.textContent = "This user already exists!";
        return;
    }

    users.push(user);
    localStorage.setItem("usersData", JSON.stringify(users));
    msg.style.color = "green";
    msg.textContent="Registration successful! Log in!"
}

function signIn() {
    if (!ifEmpty2()) return;

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const msg = document.getElementById("msg");

    msg.textContent = "";
    const uData = localStorage.getItem("usersData");
    if (!uData) {
        msg.style.color = "red";
        msg.textContent = "Account not found";
        return;
    } else {
        const user = JSON.parse(uData);
        const encodedInput = masSfr({ name, surname, password: pass })[0];
        if(
            encodedInput.name == user.name &&
            encodedInput.surname == user.surname &&
            encodedInput.password == user.password)
        {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "user.html";
        }
        else {
            msg.style.color = "red";
            msg.textContent = "Invalid name/surname or password!";
        }
    }
    
}
function displayUser() {
    function decodeToRot13(e) {
        return encodeToRot13(e);
    }
    const storedData = localStorage.getItem("loggedInUser");
    if (storedData) {
        const user = JSON.parse(storedData);
        const decName = decodeToRot13(user.name);
        const decSurname = decodeToRot13(user.surname);
        document.querySelector(".welcomeUser").textContent = `Welcome, ${decName} ${decSurname}!`;
    }
}

function encodeToRot13(e) {
    const input = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const output = "NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm5678901234";

    return e.split("").map(ch => {
        const index = input.indexOf(ch);
        return index >= 0 ? output[index] : ch;
    }).join("");
}

function masSfr(e) {
    if (!Array.isArray(e)) e = [e];
    return e.map(user=>({
        name: encodeToRot13(user.name),
        surname: encodeToRot13(user.surname),
        password: encodeToRot13(user.password)
    }));
}

function showUsersInfo() {
    const usersContainer = document.querySelector(".usersInfo");
    usersContainer.innerHTML = "";
    const usersData = JSON.parse(localStorage.getItem("usersData")) || [];
    if (usersData.length == 0) {
        usersContainer.textContent = "No users registered.";
        return;
    }
    usersData.forEach(encodedUser => {
        const user = {
            name: encodeToRot13(encodedUser.name),
            surname: encodeToRot13(encodedUser.surname),
            password: encodeToRot13(encodedUser.password)
        };
        const p = document.createElement("p");
        p.innerHTML = `<span style="color:green;">${user.name}, ${user.surname},</span> ${user.password}`;
        usersContainer.appendChild(p);
    });
}