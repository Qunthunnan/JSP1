import { Modals } from "./modals";
export class ModalSystem extends Modals {
    constructor({classesStructure, activityClass, contentSubclass, closeBtnClass, modalsChain, openFunctions, warningMessageClass, nextChainFunctions, nextBtnSubClass, nextBtnId}) {
        super(undefined, activityClass, contentSubclass, closeBtnClass);

        
        this.modalsChain = modalsChain;
        this.nextChainFunctions = nextChainFunctions;
        this.nextBtnSubClass = nextBtnSubClass;
        this.openFunctions = openFunctions;
        this.warningMessageClass = warningMessageClass;
        this.curentModalId = 0;
        this.nextBtnId = nextBtnId;
        this.isOpened = [];
        this.data = {};


        if(Array.isArray(classesStructure)) {
            for(let i in classesStructure) {
                this.createLink(classesStructure[i]);
            }
        } else {
            this.createLink(classesStructure);
        }

        for(let i in this.modalsChain) {
            if(+i === this.modalsChain.length - 1) {
                this.isOpened.push(true);
            } else {
                this.isOpened.push(false);
            }
        }
    }

    createLink(linkClass) {
        const linkElements = document.querySelectorAll(`.${linkClass}`);
        linkElements.forEach(element => {
            element.addEventListener('click', e => {
                this.showSystem();
            });
        });
    }
    
    showSystem() {
        this.showModal(this.modalsChain[this.curentModalId]);
        if(!this.isOpened[this.curentModalId]) {
            const nextBtn = document.querySelector(`.${this.modalsChain[this.curentModalId]}${this.nextBtnSubClass}`);

            nextBtn.addEventListener('click', e =>{
                if(e.currentTarget == e.target && !e.key) {
                    e.key = true;
                    this.validateData();
                }
            });
            this.openFunctions[this.curentModalId](this.data);
            this.isOpened[this.curentModalId] = true;
        }
    }

    validateData() {
        const response = this.nextChainFunctions[this.curentModalId](this.data);
        const modalElement = document.querySelector(`.${this.modalsChain[this.curentModalId]} .${this.contentSubclass}`);
        if(response === true) {
            const warningMessage = modalElement.querySelector(`.${this.warningMessageClass}`);
            if(warningMessage) {
                warningMessage.remove();
            }
            this.closeModal(this.modalsChain[this.curentModalId]);
            this.curentModalId++;
            this.showSystem();
        } else {
            this.shake(this.modalsChain[this.curentModalId]);
            
            if(modalElement.querySelector(`.${this.warningMessageClass}`)) {
                modalElement.querySelector(`.${this.warningMessageClass}`).textContent = response;
            } else {
                const warningMessage = document.createElement('label');
                warningMessage.setAttribute('for', this.nextBtnId);
                warningMessage.classList.add(this.warningMessageClass);
                warningMessage.textContent = response;
                modalElement.append(warningMessage);
            }
        }
    }

    resetSystem() {
        this.curentModalId = 0;
        this.isOpened = [];

        for(let i in this.modalsChain) {
            if(+i === this.modalsChain.length - 1) {
                this.isOpened.push(true);
            } else {
                this.isOpened.push(false);
            }
        }

        this.data = {};
    }
}

