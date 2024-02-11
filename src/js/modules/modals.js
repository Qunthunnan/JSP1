export class Modals {
    constructor(classesStructure, activityClass, contentSubclass, closeBtnClass) {
        this.activityClass = activityClass;
        this.contentSubclass = contentSubclass;
        this.closeBtnClass = closeBtnClass;

        for (let i in classesStructure) {
            if (Array.isArray(classesStructure[i])) {
                for (let k in classesStructure[i]) {
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

        modalElement.classList.add(this.activityClass);
        const animationOpen = modalContent.animate([
            {
                transform: 'translateX(-50%) scale(0.1)',
                top: '-22%',
                opacity: 0,
                borderRadius: '170px',
            },
            {
                transform: 'translateX(-50%) scale(1)',
                top: '10%',
                opacity: 1,
                borderRadius: '20px',
            }
        ], { duration: 400, iterations: 1, easing: 'ease', fill: 'forwards' });

        const close = (e) => {
            if (e.target.matches(`.${this.closeBtnClass}`) || !e.target.matches(`.${this.contentSubclass}`) && !e.target.closest(`.${this.contentSubclass}`) && e.target.classList[0] !== 'ripple') {
                const amimationClose = modalContent.animate([
                    {
                        transform: 'translateX(-50%) scale(1)',
                        top: '10%',
                        opacity: 1,
                        borderRadius: '20px',
                    },
                    {
                        transform: 'translateX(-50%) scale(0.1)',
                        top: '-22%',
                        opacity: 0,
                        borderRadius: '170px',
                    }
                ], { duration: 400, iterations: 1, easing: 'ease', fill: 'forwards' });

                amimationClose.finished.then( result => {
                    modalElement.classList.remove(this.activityClass);
                    modalElement.removeEventListener('click', close);
                });
            }
        }

        setTimeout(()=> {
            modalElement.addEventListener('click', close);
        }, 400); 
    }

    closeModal(modalClass) {
        const modalElement = document.querySelector(`.${modalClass}`);
        modalElement.classList.remove(this.activityClass);
    }

    shake(modalClass) {
        const modalContent = document.querySelector(`.${modalClass} .${this.contentSubclass}`);
        modalContent.animate([
            {
                transform: 'translate(-52%, 2%)'
            },
            {
                transform: 'translate(-48%, -2%)'
            },
            {
                transform: 'translateX(-52%)'
            },
            {
                transform: 'translateX(-48%)'
            }
        ], {duration: 200, easing: 'ease'});
    }
}