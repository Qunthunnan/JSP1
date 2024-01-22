import { Modals } from "./modals";
export class ModalSystem extends Modals {
    constructor({classesStructure, activityClass, contentSubclass, closeBtnClass, modalsChain, openFunctions, nextChainFunctions, nextBtnSubClass}) {
        super(undefined, activityClass, contentSubclass, closeBtnClass);

        
        this.modalsChain = modalsChain;
        this.nextChainFunctions = nextChainFunctions;
        this.nextBtnSubClass = nextBtnSubClass;
        this.openFunctions = openFunctions;
        this.curentModalId = 0;
        this.data = {};


        if(Array.isArray(classesStructure)) {
            for(let i in classesStructure) {
                this.createLink(classesStructure[i])
            }

        } else {
            this.createLink(classesStructure);
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
        this.openFunctions[this.curentModalId]();
    }
}

