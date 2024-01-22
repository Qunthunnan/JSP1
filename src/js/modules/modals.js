export class Modals {
    constructor (classesStructure, activityClass, contentSubclass, closeBtnClass) {
        this.activityClass = activityClass;
        this.contentSubclass = contentSubclass;
        this.closeBtnClass = closeBtnClass;
 
        for(let i in classesStructure) {
            if(Array.isArray(classesStructure[i]))  {
                for(let k in classesStructure[i]) {
                    this.setModalLink(k, i);
                }
            } else {
                this.setModalLink(classesStructure[i], i);
            }
        }
    }

    setModalLink(link, target) {
        const linkElements = document.querySelectorAll(`.${link}`);

        linkElements.forEach(element => {
            element.addEventListener('click', e => {
                this.showModal(target);
            });
        });
    }

    showModal(modalClass) {
        const modalElement = document.querySelector(`.${modalClass}`);

        modalElement.classList.add(this.activityClass);
    
        const close = (e) => {
            if(e.target.matches(`.${this.closeBtnClass}`) || !e.target.matches(`.${this.contentSubclass}`) && !e.target.closest(`.${this.contentSubclass}`)) {
                modalElement.classList.remove(this.activityClass);
                modalElement.removeEventListener('click', close);
            }
        }

        modalElement.addEventListener('click', close);
    }

    closeModal(modalClass) {
        const modalElement = document.querySelector(`.${modalClass}`);
        modalElement.classList.remove(this.activityClass);
    }
}