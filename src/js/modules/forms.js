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
        this.removeInputsListener(form);
        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());
        const modalElement = form.closest(`.${calculationModal.activityClass}`);
        if(modalElement) {
            calculationModal.closeModal(modalElement.classList[0]);
        }
        const doneModalContent = document.querySelector(`.${this.doneModalClass} .${calculationModal.contentSubclass}`);
        doneModalContent.textContent = '';
        calculationModal.showModal(this.doneModalClass);
        const loader = document.createElement('div');
        loader.innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
        <title>spinner6</title>
        <path d="M12 4c0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.209-1.791 4-4 4s-4-1.791-4-4zM24.719 16c0 0 0 0 0 0 0-1.812 1.469-3.281 3.281-3.281s3.281 1.469 3.281 3.281c0 0 0 0 0 0 0 1.812-1.469 3.281-3.281 3.281s-3.281-1.469-3.281-3.281zM21.513 24.485c0-1.641 1.331-2.972 2.972-2.972s2.972 1.331 2.972 2.972c0 1.641-1.331 2.972-2.972 2.972s-2.972-1.331-2.972-2.972zM13.308 28c0-1.487 1.205-2.692 2.692-2.692s2.692 1.205 2.692 2.692c0 1.487-1.205 2.692-2.692 2.692s-2.692-1.205-2.692-2.692zM5.077 24.485c0-1.346 1.092-2.438 2.438-2.438s2.438 1.092 2.438 2.438c0 1.346-1.092 2.438-2.438 2.438s-2.438-1.092-2.438-2.438zM1.792 16c0-1.22 0.989-2.208 2.208-2.208s2.208 0.989 2.208 2.208c0 1.22-0.989 2.208-2.208 2.208s-2.208-0.989-2.208-2.208zM5.515 7.515c0 0 0 0 0 0 0-1.105 0.895-2 2-2s2 0.895 2 2c0 0 0 0 0 0 0 1.105-0.895 2-2 2s-2-0.895-2-2zM28.108 7.515c0 2.001-1.622 3.623-3.623 3.623s-3.623-1.622-3.623-3.623c0-2.001 1.622-3.623 3.623-3.623s3.623 1.622 3.623 3.623z"></path>
        </svg>`;

        const loaderStyles = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50px',
            width: '50px',
        }
        for(let i in loaderStyles) {
            loader.style[i] = loaderStyles[i];
        }

        doneModalContent.append(loader);
        const loadAnimation = loader.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {duration: 1000, iterations: Infinity});

        const answer = fetch('/server.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            loader.remove();
            if(!response.ok) {
                doneModalContent.textContent = 'Вибачте, сталась помилка, спробуйте пізніше';
                console.error(response.status, response.statusText);
            } else {
                doneModalContent.textContent = `Дякую, що залишили заявку! Менеджер скоро з вами зв'яжеться.`;

                if(modalElement) {
                    for(let i in calculationModal.data) {
                        userData[i] = calculationModal.data[i];
                    }
                    calculationModal.resetSystem();
                }
                form.reset();
            }
        })
        .catch(error => {
            console.error(error);
        });
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