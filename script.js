const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('passwordConfirm');

// console.log(username);
// console.log(email);
// console.log(password);
// console.log(passwordConfirm);

//Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkRequired(inputArray) {
    inputArray.forEach(function (input) {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Check Required Fileds
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be ${min} characters long`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be ${max} characters long`)
    } else {
        showSuccess(input);
    }
}

//Event Listener
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username, email, password, passwordConfirm]);
    checkLength(username, 3, 20);
    checkLength(password, 3, 20);
    checkEmail(email);
    checkPasswordsMatch(password, passwordConfirm);
})