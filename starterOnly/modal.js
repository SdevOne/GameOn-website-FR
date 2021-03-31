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
const btnSubmit = document.querySelector('.btn-submit');
const allData = [firstName, lastName, email, birthdate, nbOfCompetitions, radios, checkbox];

// management modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
closeCross.addEventListener("click", closeModal);

// verification of entered data
firstName.addEventListener("blur", function (e) {
    isEmpty(e.target.value);
    minLength(e.target.value, 2);
})

lastName.addEventListener("blur", function (e) {
    isEmpty(e.target.value);
    minLength(e.target.value, 2);
})

email.addEventListener("blur", function (e) {
    emailValidity(e.target.value);
})

birthdate.addEventListener("blur", function (e) {

})

nbOfCompetitions.addEventListener("blur", function (e) {
    typeOfValue(e.target.value);
    interval(e.target.value, 0, 99);
})

isChecked(radios);
radios.forEach((radio) => radio.addEventListener("change", function (e) {

}));

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

// minimum character test
function minLength(data, nbOfCharacters) {
    let results = [];
    if (data < nbOfCharacters) {
        results.push(true, "vous devez avoir un minimum de " + nbOfCharacters + " caracteres");
        return results;
    } else {
        results.push(false);
        return results;
    }
}

// test field not empty
function isEmpty(data) {
    let results = [];
    if (data.length == 0 || data.length == "") {
        results.push(true, "le champ est vide");
        return results;
    } else {
        results.push(false);
        return results;
    }
}

// test email adress
function emailValidity(data) {
    let emailReg = new RegExp(/([\w-\.]+@[\w\.]+\.{1}[\w]+)/);
    let result = emailReg.test(data);
    let results = [];
    if (result == false) {
        return results.push(true, "L'email n'est pas valide");
    } else {
        return results.push(false);
    }
}

// test numeric value 
function typeOfValue(data) {
    let value = parseInt(data);
    let results = [];
    if (typeof (value) !== "number") {
        return results.push(true, "Ce n'est pas un nombre");
    } else {
        return results.push(false);
    }
}

// test interval value
function interval(data, minValue, maxValue) {
    let value = parseInt(data);
    let results = [];
    if (value < minValue && value > maxValue) {
        return results.push(true, "Ce n'est pas un nombre compris entre " + minValue + " et " + maxValue);
    } else {
        return results.push(false);
    }
}

// check the selection of a radio button
function isChecked(data) {
    let results = [];
    for (let i = 0; i < data.length; i++) {
        if (data[i].checked == false) {
            return results.push(true, "aucune radio n'est selectionné");
        } else {
            return results.push(false);
        }
    }
}

// check the state of the general conditions box, the other box is optional / can be left unchecked
function state(data) {
    let results = [];
    if (data.checked == false) {
        return results.push(true, "la case n'est pas coché");
    } else {
        return results.push(false);
    }
}

// set data error or validation attribute
function setDataAttribute(data, element) {
    if (data[0] == false) {
        element.parentElement.setAttribute("data-valid-visible", "true");
        element.parentElement.removeAttribute("data-error-visible");
        element.parentElement.lastChild.remove();
    } else if (data[0] == true) {
        element.parentElement.setAttribute("data-error-visible", "true");
        element.parentElement.removeAttribute("data-valid-visible");
        setErrorMsg(data[1], element);
    }
}

// keep the form data when it does not pass validation
function validationTest(event) {
    event.preventDefault();
    setDataAttribute(isEmpty(firstName.value), firstName);
    //setDataAttribute(minLength(firstName.value), firstName);
    //setDataAttribute(isEmpty(lastName.value), lastName);
    /*minLength(lastName.value);
    emailValidity(email.value);
    typeOfValue(nbOfCompetitions.value);
    interval(nbOfCompetitions.value, 0, 99);
    console.log(typeof (birthdate.value));
    isEmpty(birthdate.value);
    state(checkbox[0]);
    state(checkbox[1]);*/

    for (let data of formData) {
        if (data.getAttribute("data-error-visible") == "true") {
            event.preventDefault();
        }
    }
}

// adding validation or error messages 
function setErrorMsg(msg, element) {
    let errorMsg = document.createElement("div");
    errorMsg.classList.add("errorMsg");
    errorMsg.style.fontSize = "14px";
    errorMsg.style.marginTop = "5px";
    errorMsg.textContent = msg;
    element.parentElement.appendChild(errorMsg);
}

// user confirmation message of successful submission

// user interface and functionality test
