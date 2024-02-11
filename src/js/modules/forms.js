import { calculationModal } from "../main";

export class Forms {
    constructor(formsSelectors, inputNames, inputsClass, doneModalClass) {
        this.formsSelectors = formsSelectors;
        this.inputNames = inputNames;
        this.inputsClass = inputsClass;
        this.userData;
        this.doneModalClass = doneModalClass;

        this.eventListenErrrors = (e) => {
            this.showErrors(e.target.closest('.form'), this.validateForm(e.target.closest('.form')));
        }

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
                e.preventDefault();
                this.submitForm(e.target);
            });
        });
    }

    submitForm(form) {
        const result = this.validateForm(form)
        if(result === true) 
            this.sendData(form);
        else {
            this.showErrors(form, result);
            this.listenErrorInputs(form);
        }
    }

    listenErrorInputs(form) {
        const inputs = form.querySelectorAll(`.${this.inputsClass}`);
        inputs.forEach(input => {
            input.addEventListener('input', this.eventListenErrrors);
        });

        const modalElement = form.closest(`.${calculationModal.activityClass}`);
        if(modalElement)
            calculationModal.shake(modalElement.classList[0]);
    }

    removeInputsListener(form) {
        const inputs = form.querySelectorAll(`.${this.inputsClass}`);
        inputs.forEach(input => {
            input.removeEventListener('input', this.eventListenErrrors);
        });
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
        let result = {};

        const nameRegex = /^[\s]*[^\!\@\#\$\%\^\&\*\=\+\~\`\{\}\[\]\\\|\'\"\;\:\/\?\.\>\,\<]*$/;
        const phoneRegex = /^\+?3?8?(0\d{9})$/;

        if(userData[this.inputNames[0]].length > 256) {
            result[`${this.inputNames[0]}`] = errorMessages.userNameMax;
        }
        
        if(!nameRegex.test(userData[this.inputNames[0]])) {
            result[`${this.inputNames[0]}`] = errorMessages.userNameCorrect;
        }

        if(userData[this.inputNames[0]].length < 2) {
            result[`${this.inputNames[0]}`] = errorMessages.userNameMin;
        }

        if(!phoneRegex.test(userData[this.inputNames[1]])) {
            result[`${this.inputNames[1]}`] = errorMessages.userPhoneCorrect;
        }

        if(userData[this.inputNames[1]] === '' || userData[this.inputNames[1]] === undefined) {
            result[`${this.inputNames[1]}`] = errorMessages.userPhone;
        }

        let check = true;

        for(let i in result) {
            if(i) {
                check = false;
                break;
            }
        }
        if(check)
            return check;
        else 
            return result;
    }

    sendData(form) {
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const modalElement = form.closest(`.${calculationModal.activityClass}`);
        if(modalElement) {
            calculationModal.closeModal(modalElement.classList[0]);
            for(let i in calculationModal.data) {
                userData[i] = calculationModal.data[i];
            }
            calculationModal.resetSystem();
        }

        const answer = fetch('/server.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .catch(error => {
            console.error(error);
        });

        calculationModal.showModal(this.doneModalClass);
        form.reset();
        this.removeInputsListener(form);
    }

    showErrors(form, errors) {
        const existingErrors = form.querySelectorAll(`.form_error`);
        existingErrors.forEach(error => {
            error.remove();
        });

        for(let i in errors) {
            if(errors[i]) {
                const input = form.querySelector(`[name="${i}"]`);
                const id = Math.round(Math.random() * 10000 + 1);
                input.setAttribute('id', id);
                const label = document.createElement('label');
                label.setAttribute('for', id);
                label.setAttribute('data-error', i);
                label.classList.add('form_error');
                label.textContent = errors[i];
                form.insertBefore(label, input);
            }
        }
    }
}