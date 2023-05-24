"use strict";
/* (1) -> VALIDATION FUNCTIONS
  (2) -> FORM SUBMISSION AJAX REQUEST
  (3) -> ACTORS BORN BUTTON SUBMISSION AJAX REQUEST
  (4) -> EVENT LISTENERS ON EVERY FIELD THAT IS MANDATORY TO CHECK IF ITS VALID OR NOT (ALL FIELDS ARE MANDATORY)
  (5) -> EVENT LISTENER ON CHANGE_LANG BUTTON 
*/
const fullName = document.getElementById("full_name");
const username = document.getElementById("user_name");
const phoneNumber = document.getElementById("phone");
const birthdate = document.getElementById("birthdate");
const address = document.getElementById("address");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
const userImage = document.getElementById("user_image");
const emailAddress = document.getElementById("email");

const changeLang = document.getElementById("change_lang");
// opens and closes submit button
const switchButton = function (choice) {
    const myButton = document.getElementById("submit");
    if (choice == 1) {
        myButton.disabled = false;
        myButton.style.backgroundColor = "#4caf50";
    }

    if (choice == 0) {
        myButton.disabled = true;
        myButton.style.backgroundColor = "grey";
    }
};

/**********************************(1)*********************************/

// -------------------- VALIDATION FUNCTIONS ----------------------------

/*----------- ALL VALIDATION FUNCTIONS RETURN TRUE OR FALSE */

// FULL NAME VALIDATION FUNCTION
const fullNameValidation = function () {
    const full_name = fullName.value.trim();
    if (full_name.length == 0) return false;
    for (let i = 0; i < full_name.length; i++) {
        if (full_name[i] == " ") continue;

        const charCode = full_name.charCodeAt(i);

        if (
            !(charCode > 64 && charCode < 91) &&
            !(charCode > 96 && charCode < 123)
        ) {
            return false;
        }
    }

    return true;
};

//USERNAME VALIDATION FUNCTION
const userNameValidation = function () {
    if (username.value.length == 0) return false;
    for (let i = 0; i < username.value.length; i++) {
        if (username.value[i] == " ") return false;
    }
    return true;
};

//BIRTHDATE VALIDATION FUNCTION
const birthValidation = function () {
    if (birthdate.value.trim() === "") {
        return false;
    }
    return true;
};

// PHONE NUMBER VALIDATION FUNCTION
const phoneNumberValidation = function () {
    let response = 1;
    if (phoneNumber.value.length < 11 || phoneNumber.value.length > 15)
        response = -1;

    if (
        (phoneNumber.value[0] != "+" && phoneNumber.value[0] < "0") ||
        phoneNumber.value[0] > "9"
    ) {
        response = -2;
    }

    for (let i = 1; i < phoneNumber.value.length; i++) {
        if (phoneNumber.value[i] < "0" || phoneNumber.value[i] > "9") {
            response = -2;
            break;
        }
    }

    return response;
};

// EMAIL VALIDATION FUNCTION
const EmailValidation = function () {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress.value) && emailAddress.value.trim() != "";
};

// ADDRESS VALIDATION FUNCTION
const addressValidation = function () {
    if (address.value.trim() == "") return false;
    return true;
};

//USER IMAGE VALIDATION FUNCTION
const userImageValidation = function () {
    if (userImage.files.length == 0) return -1;
    else {
        const imageName = userImage.files[0].name;
        let userImageExtension = imageName.split(".").pop();
        const imageExtensions = [
            "jpg",
            "jpeg",
            "png",
            "gif",
            "bmp",
            "tif",
            "tiff",
            "svg",
            "webp",
            "ico",
        ];
        if (imageExtensions.includes(userImageExtension)) return 1;
        else {
            return -2;
        }
    }
};

// validate password and confirm password fields
function validatePassword() {
    var flag = true;

    const passwordLengthCheck = document.getElementById(
        "password_length_check"
    );
    const passwordNumberCheck = document.getElementById(
        "password_number_check"
    );
    const passwordSpecialCheck = document.getElementById(
        "password_special_check"
    );
    const passwordMatchCheck = document.getElementById("password_match_check");

    // Password is at least 8 characters long
    if (password.value.length < 8) {
        passwordLengthCheck.innerHTML = "&#x2718;";
        passwordLengthCheck.style.color = "red";
        flag = false;
    } else {
        passwordLengthCheck.innerHTML = "&#x2714;";
        passwordLengthCheck.style.color = "green";
    }

    // Password includes at least one digit
    var digitRegex = /(?=.*\d)/;
    if (!digitRegex.test(password.value)) {
        passwordNumberCheck.innerHTML = "&#x2718;";
        passwordNumberCheck.style.color = "red";
        flag = false;
    } else {
        passwordNumberCheck.innerHTML = "&#x2714;";
        passwordNumberCheck.style.color = "green";
    }

    // Password includes at least one special character
    var sRegex = /(?=.*[!@#$%^&*_/])/;
    if (!sRegex.test(password.value)) {
        passwordSpecialCheck.innerHTML = "&#x2718;";
        passwordSpecialCheck.style.color = "red";
        flag = false;
    } else {
        passwordSpecialCheck.innerHTML = "&#x2714;";
        passwordSpecialCheck.style.color = "green";
    }

    if (
        password.value !== confirm_password.value ||
        password.value.length == 0
    ) {
        passwordMatchCheck.innerHTML = "&#x2718;";
        passwordMatchCheck.style.color = "red";
        flag = false;
    } else {
        passwordMatchCheck.innerHTML = "&#x2714;";
        passwordMatchCheck.style.color = "green";
    }

    // Password is valid
    return flag;
}

// USED IN FORM SUBMISSION FUNCTION TO MAKE SURE THAT ALL FIELDS OF THE FORM ARE VALID BEFORE SUBMITTING TO THE SERVER
const validateAllFields = function () {
    return (
        fullNameValidation() &&
        userNameValidation() &&
        birthValidation() &&
        validatePassword() &&
        phoneNumberValidation() == 1 &&
        EmailValidation() &&
        addressValidation() &&
        userImageValidation() == 1
    );
};

/**********************************(2)*********************************/

// -------------------- FORM SUBMISSION FUNCTION (USING AJAX REQUEST) ----------------------------

/*----------- THIS FUNCTION SHOWS AN NOTIFICATION IN INDEX.PHP ON RECIEVING RESPONSE FROM THE SERVER */

const form = document.querySelector("#my-form");

// Add an event listener for the form submission
form.addEventListener("submit", (e) => {
    debugger;
    e.preventDefault();
    // MAKING SURE ALL FIELDS ARE VALID
    if (validateAllFields()) {
        const formData = new FormData(form);
        console.log(formData);

        // Send the form data using a fetch request
        fetch("/register", {
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: formData,
        })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                let notify = document.getElementById("notify");
                if (data.status == 201) {
                    //good news
                    notify.innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert" style="width:22%;z-index:2;">${data["message"]}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
                } else if (data.status == 302) {
                    //bad news user_name already exists
                    notify.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:22%; z-index:2;">${data["message"]}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
                } else if (data.status == 400) {
                    //error in database
                    notify.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:22%; z-index:2;">${data["message"]}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
                }
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error(error);
            });
    }
    // validateAllFields returned false
    else
        notify.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert" style="width:22%; z-index:2;">Fill all required fields!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    // return to top of the page to see notification
    window.scrollTo(0, 0);
});

/**********************************(3)*********************************/

// -------------------- ACTORS BORN FUNCTION (USING AJAX REQUEST) ----------------------------

/*----------- THIS FUNCTION RENDERS POPUP.HTML AND SHOWS ALL ACTORS BORN ON THE SAME DAY AND MONTH THE USER ENTERED */
const removeSubdomainsFromUrl = function (url) {
    // Remove protocol (e.g., http:// or https://)
    let withoutProtocol = url.replace(/^(https?:\/\/)?/, "");

    // Remove subdomains
    let parts = withoutProtocol.split(".");
    let domain = parts.slice(-2).join(".");

    return domain;
};
const getActors = function () {
    if (birthValidation()) {
        // check if birthdate is entered

        // if an error appeared before remove it now
        if (document.getElementById("birthDate_error")) {
            document.getElementById("birthDate_error").remove();
        }

        const birthdate = document.getElementById("birthdate").value;

        const date = new Date(birthdate);

        const month = date.getMonth() + 1; // Add 1 because getMonth() returns values from 0 to 11
        const day = date.getDate();
        console.log(month);

        const url = "/actors/data?month=" + month + "&day=" + day;
        let basePath = window.location.href.replace(
            window.location.pathname,
            ""
        );

        console.log(window.location.href);
        console.log(basePath);
        let HTMLurl = `${basePath}/actors`;
        console.log(HTMLurl);
        let popup = window.open(
            HTMLurl,
            "Actors Born on that Day",
            "width=400,height=600"
        );
        popup.addEventListener("load", function () {
            let xhttp = new XMLHttpRequest();
            xhttp.open("GET", url, true);
            xhttp.send();

            xhttp.onload = function () {
                if (xhttp.status === 200) {
                    debugger;
                    let resp = JSON.parse(xhttp.response);

                    let myList = popup.document.getElementById("myList");
                    let array = resp["Actors' names"];
                    for (let i = 0; i < array.length; i++) {
                        let listItem = document.createElement("li");
                        listItem.textContent = array[i];
                        myList.appendChild(listItem);
                    }
                }
            };
        });
    } else {
        // if birth validation returns false show error message to indicate its required
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "BirthDate is required!";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";
        //remove old error if it exists and show it again
        if (document.getElementById("birthDate_error")) {
            document.getElementById("birthDate_error").remove();
        }

        errorMessage.id = "birthDate_error";
        document
            .getElementById("birthDate")
            .insertBefore(errorMessage, birthdate.previousSibling);
    }
};

/**********************************(4)*********************************/

/*-------------------- EVENT LISTENERS ON ALL FIELDS (USING AJAX REQUEST) ----------------------------*/

/*----------- EVENT LISTENERS USED TO DETECT INVALID INPUT ON ALL FIELDS THEN SHOW AN ERROR MESSAGE SPECIFYING WHAT IS EXACTLY WRONG  -----------------------------------*/

phoneNumber.addEventListener("blur", function () {
    let result = phoneNumberValidation();

    const errorMessage = document.createElement("p");

    if (result == -1) {
        errorMessage.textContent =
            "Input must be at least 11 characters long and at most 15 characters long";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";
    } else if (result == -2) {
        errorMessage.textContent = "Input must be digits only";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";
    }
    // check if an error message already appeared
    if (document.getElementById("phone_error")) {
        document.getElementById("phone_error").remove();
    }
    if (result != 1) {
        switchButton(0);
        errorMessage.id = "phone_error";
        document
            .getElementById("phoneNumber")
            .insertBefore(errorMessage, phoneNumber.previousSibling);
    } else {
        if (document.getElementById("phone_error")) {
            switchButton(1);
            document.getElementById("phone_error").remove();
        }
    }
});

// validating full name

fullName.addEventListener("blur", function () {
    const userInput = fullName.value;
    //debugger;
    if (!fullNameValidation(userInput)) {
        switchButton(0);
        const errorMessage = document.createElement("p");
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";
        errorMessage.textContent = "Input must be all alphabet letters";
        switchButton(0);

        // check if an error message already appeared
        if (document.getElementById("full_name_error")) {
            document.getElementById("full_name_error").remove();
        }

        errorMessage.id = "full_name_error";
        document
            .getElementById("fullName")
            .insertBefore(errorMessage, fullName.previousSibling);
    } else {
        switchButton(1);
        // check if an error message already appeared
        if (document.getElementById("full_name_error")) {
            document.getElementById("full_name_error").remove();
        }
    }
});

emailAddress.addEventListener("blur", function () {
    debugger;
    if (!EmailValidation()) {
        switchButton(0);
        const errorMessage = document.createElement("p");
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";
        errorMessage.textContent = "Email is invalid";

        // check if an error message already appeared
        if (document.getElementById("email_error")) {
            document.getElementById("email_error").remove();
        }

        errorMessage.id = "email_error";
        document
            .getElementById("Email")
            .insertBefore(errorMessage, emailAddress.previousSibling);
    } else {
        switchButton(1);

        // check if an error message already appeared
        if (document.getElementById("email_error")) {
            document.getElementById("email_error").remove();
        }
    }
});

birthdate.addEventListener("blur", function () {
    debugger;
    if (!birthValidation()) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "BirthDate is required!";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";
        // check if an error message already appeared
        if (document.getElementById("birthDate_error")) {
            document.getElementById("birthDate_error").remove();
        }

        errorMessage.id = "birthDate_error";
        document
            .getElementById("birthDate")
            .insertBefore(errorMessage, birthdate.previousSibling);

        switchButton(0);
    } else {
        // birthdate is correct enable button and remove error

        if (document.getElementById("birthDate_error")) {
            switchButton(1);
            document.getElementById("birthDate_error").remove();
        }
    }
});

address.addEventListener("blur", () => {
    debugger;
    if (!addressValidation()) {
        switchButton(0);
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Address is required!";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";

        if (document.getElementById("address_error")) {
            document.getElementById("address_error").remove();
        }
        errorMessage.id = "address_error";
        document
            .getElementById("Address")
            .insertBefore(errorMessage, address.previousSibling);
    } else {
        if (document.getElementById("address_error")) {
            switchButton(1);
            document.getElementById("address_error").remove();
        }
    }
});

password.addEventListener("blur", function () {
    if (validatePassword()) {
        switchButton(1);
    } else {
        switchButton(0);
    }
});

confirm_password.addEventListener("blur", function () {
    if (validatePassword()) {
        switchButton(1);
    } else {
        switchButton(0);
    }
});

userImage.addEventListener("blur", () => {
    const result = userImageValidation();
    if (result == -1) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "User Image is required!";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";

        // check if an error message already appeared
        if (document.getElementById("userImage_error")) {
            document.getElementById("userImage_error").remove();
        }

        errorMessage.id = "userImage_error";
        document
            .getElementById("userImage")
            .insertBefore(errorMessage, userImage.previousSibling);

        switchButton(0);
    } else if (result == -2) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Image format is invalid!";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";

        // check if an error message already appeared
        if (document.getElementById("userImage_error")) {
            document.getElementById("userImage_error").remove();
        }

        errorMessage.id = "userImage_error";
        document
            .getElementById("userImage")
            .insertBefore(errorMessage, userImage.previousSibling);

        switchButton(0);
    } else {
        if (document.getElementById("userImage_error")) {
            switchButton(1);
            document.getElementById("userImage_error").remove();
        }
    }
});

username.addEventListener("blur", () => {
    if (!userNameValidation()) {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Username cannot be empty!";
        errorMessage.style.color = "red";
        errorMessage.style.font = "14px";

        // check if an error message already appeared
        if (document.getElementById("username_error")) {
            document.getElementById("username_error").remove();
        }

        errorMessage.id = "username_error";
        document
            .getElementById("userName")
            .insertBefore(errorMessage, username.previousSibling);

        switchButton(0);
    } else {
        // check if an error message already appeared
        if (document.getElementById("username_error")) {
            switchButton(1);
            document.getElementById("username_error").remove();
        }
    }
});

/**********************************(5)*********************************/
// EVENT LISTENER ON CHANGE_LANG BUTTON
changeLang.addEventListener("click", () => {
    const signup = document.getElementById("signup");
    if (signup.textContent == "Sign Up") {
        changeLang.setAttribute("href", "/register/ar");
    } else {
        changeLang.setAttribute("href", "/register/en");
    }
});
