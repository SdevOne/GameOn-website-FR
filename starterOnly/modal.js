function editNav() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeCross = document.querySelector(".close");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const nbOfCompetitions = document.getElementById("quantity");
const radios = document.querySelectorAll("input[type='radio']");
const checkbox = document.querySelectorAll("input[type='checkbox']");
const btnSubmit = document.querySelector(".btn-submit");
const subMsg = document.querySelector(".subMsg");
const form = document.getElementById("form");
// management modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeCross.addEventListener("click", closeModal);
// verification of user data
firstName.addEventListener("blur", function (e) {
    setDataAttribute(minLength(e.target.value, 2), firstName);
})
lastName.addEventListener("blur", function (e) {
    setDataAttribute(minLength(e.target.value, 2), lastName);
})
email.addEventListener("blur", function (e) {
    setDataAttribute(emailValidity(e.target.value), email);
})
birthdate.addEventListener("blur", function (e) {
    setDataAttribute(isEmpty(e.target.value), birthdate);
})
nbOfCompetitions.addEventListener("blur", function (e) {
    setDataAttribute(interval(e.target.value, 0, 99), nbOfCompetitions);
})
btnSubmit.addEventListener("click", function (e) {
    validationTest(e);
});
// launch modal form
function launchModal() {
    modalbg.style.display = "block";
}
// close modal form
function closeModal() {
    modalbg.style.display = "none";
}
// test field not empty
function isEmpty(data) {
    let results = [];
    if (data.length === 0 || data.length === "") {
        results.push(true, "Le champ est vide");
    } else {
        results.push(false);
    }
    return results;
}
// minimum character test
function minLength(data, nbOfCharacters) {
    let results = [];
    if (data.length < nbOfCharacters) {
        results.push(true, "Vous devez avoir un minimum de " + nbOfCharacters + " caractères");
    } else {
        results.push(false);
    }
    return results;
}
// test email adress
function emailValidity(data) {
    let emailReg = new RegExp(/([\w-\.]+@[\w\.]+\.{1}[\w]+)/);
    let result = emailReg.test(data);
    let results = [];
    if (result === false) {
        results.push(true, "L'email n'est pas valide");
    } else {
        results.push(false);
    }
    return results;
}
// test interval value
function interval(data, minValue, maxValue) {
    let value = parseInt(data);
    let results = [];
    if (isNaN(value) || value < minValue || value > maxValue) {
        results.push(true, "Le nombre doit etre compris entre " + minValue + " et " + maxValue);
    } else {
        results.push(false);
    }
    return results;
}
// check the selection of a radio button
function isChecked(data) {
    let results = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].checked === true) {
            console.log(data[i]);
            results.push(false, "", data[i]);
            return results;
        }
    }
    if (results.length === 0) {
        results.push(true, "Veuillez sélectionner une ville", data[0]);
        return results;
    }
}
// check the state of the general conditions box, the other box is optional / can be left unchecked
function state(data) {
    let results = [];
    if (data.checked === false) {
        results.push(true, "Veuillez accepter les conditions générales");
    } else {
        results.push(false);
    }
    return results;
}
// set data error or validation attribute
function setDataAttribute(data, element) {
    if (data[0] === false) {
        element.parentElement.setAttribute("data-valid-visible", "true");
        element.parentElement.removeAttribute("data-error-visible");
        let error = element.parentElement.querySelector(".errorMsg");
        if (error !== null) {
            error.remove();
        }
    } else if (data[0] === true) {
        element.parentElement.setAttribute("data-error-visible", "true");
        element.parentElement.removeAttribute("data-valid-visible");
        setErrorMsg(data[1], element);
    }
}
// keep the form data when it does not pass validation
function validationTest(event) {
    setDataAttribute(minLength(firstName.value, 2), firstName);
    setDataAttribute(minLength(lastName.value, 2), lastName);
    setDataAttribute(emailValidity(email.value), email);
    setDataAttribute(isEmpty(birthdate.value), birthdate);
    setDataAttribute(interval(nbOfCompetitions.value, 0, 99), nbOfCompetitions);
    console.log(radios);
    setDataAttribute(isChecked(radios), radios[2]);
    setDataAttribute(state(checkbox[0]), checkbox[0]);
    for (let data of formData) {
        if (data.getAttribute("data-error-visible") === "true") {
            event.preventDefault();
        }
    }
}
// adding validation or error messages 
function setErrorMsg(msg, element) {
    if (element.parentElement.lastChild.classList != "errorMsg") {
        let errorMsg = document.createElement("div");
        errorMsg.classList.add("errorMsg");
        errorMsg.textContent = msg;
        element.parentElement.appendChild(errorMsg);
    }
}
// user confirmation message of successful submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    closeModal();
    stmsg();
});

document.querySelector('.subCross').addEventListener('click', closeStmsg);

function stmsg() {
    subMsg.style.display = "flex";
}

function closeStmsg() {
    subMsg.style.display = "none";
}

// user interface and functionality test
