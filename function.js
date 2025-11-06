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
    if (pass.value !== pass2.value) {
        msg.textContent = "Passwords do not match!";
        return;
    } else {
        if (!strongPass.test(pass)) {
            msg.textContent = "Password must include at least: 1 Uppercase, 1 Lowercase, 1 Symbol(@,#,...), 1 Number and be at least 8 characters long.";
            return;
        }
        else {
            const user = { name, surname, password: pass };
            localStorage.setItem("userData", JSON.stringify(user));
            msg.style.color = "green";
            msg.textContent="Registration successful! Log in!"
        }
    }
}

function signIn() {
    if (!ifEmpty2()) return;
}