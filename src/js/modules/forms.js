import { error } from "jquery";

export class Forms {
    constructor(formsSelectors, inputNames) {
        this.formsSelectors = formsSelectors;
        this.inputNames = inputNames;
        this.userData;

        if(Array.isArray(this.formsSelectors))
            for(let i in this.formsSelectors)
                this.addSubmitListener(formsSelectors[i]);
        else 
            this.addSubmitListener(formsSelectors);
        

    }

    addSubmitListener(elementsClass) {
        const formElements = document.querySelectorAll(`.${elementsClass}`);

        formElements.forEach(form => {
            form.addEventListener('submit', e => {
                this.submitForm(e.target);
            });
        });
    }

    submitForm(form) {
        validationResult = this.validateForm(form)
        if(validationResult === true) 
            this.sendData(form);
        else {
            this.showErrors(form, validationResult);
        }
    }

    validateForm(form) {
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData);
        const errorMessages = {
            userNameMin: 'Имя может быть не меньше 2 символов',
            userNameMax: 'Имя может быть не больше 256 символов',
            userNameCorrect: 'Разрешенные спецсимволы в имени: ( ) - _',
            userPhone: 'Введите номер телефона',
            userPhoneCorrect: 'Введите корректный номер телефона',
        }
        let result;

        const nameRegex = /^[\s]*[^\!\@\#\$\%\^\&\*\=\+\~\`\{\}\[\]\\\|\'\"\;\:\/\?\.\>\,\<]*$/;
        const phoneRegex = /^\+?3?8?(0\d{9})$/;

        if(userData[this.inputNames[0]].length > 256) {
            if(!Array.isArray(result)) {
                result = [];
            }
            result[0] = errorMessages.userNameMax;
        }
        
        if(nameRegex.test(userData[this.inputNames[0]])) {
            if(!Array.isArray(result)) {
                result = [];
            }
            result[0] = errorMessages.userNameCorrect;
        }

        if(userData[this.inputNames[0]].length < 2) {
            result = [];
            result[0] = errorMessages.userNameMin;
        }

        if(!phoneRegex.test(userData[this.inputNames[1]])) {
            if(!Array.isArray(result)) {
                result = [];
            }
            result[1] = errorMessages.userPhoneCorrect;
        }

        if(userData[this.inputNames[1]] === '' || userData[this.inputNames[1]] === undefined) {
            if(!Array.isArray(result)) {
                result = [];
            }
            result[1] = errorMessages.userPhone;
        }

        if(result === undefined)
            result = true;

        return result;
    }

    sendData(form) {

    }

    showErrors(form, errors) {

        errorElement.textContent = errors[0];
    }

    createError(error, name) {
        nameInput = form.querySelector('[name = "user_name"]');
        phoneInput = form.querySelector('[name = "user_phone"]');

        const errorElement = document.createElement('label');
        errorElement.setAttribute('for', 'user_name');
        errorElement.classList.add('errorLabel');
    }

    deleteError(name) {

    }
}