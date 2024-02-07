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
        const modalContent = document.querySelector(`.${modalClass} .${this.contentSubclass}`);
        
        modalContent.style.cssText += `top: -22%; transform: translateX(-50%) scale(0.1); opacity: 0, border-radius: 100px;`;
        modalElement.classList.add(this.activityClass);
        modalContent.animate([
            {transform: 'translateX(-50%) scale(0.1)',
             top: '-22%', 
             opacity: 0,
            'border-radius': '100px',},
            {transform: 'translateX(-50%) scale(1)',
             top:'10%',
             opacity: 1,
             'border-radius': '20px',}
        ], {duration: 2000, iterations: 1, fill: 'forwards'});

        console.log('test');
        
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