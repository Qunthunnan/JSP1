import './modules/slider';
import { Modals } from './modules/modals';
import { ModalSystem } from './modules/modalSystem';

debugger;
const modals = new Modals({
    'popup': 'phone_link',
    'popup_engineer': 'popup_engineer_btn',
    'popup_calc': 'popup_calc_btn'
}, 'activeModal', 'jsModalContent', 'jsModalClose');

const calculationModal = new ModalSystem({
    classesStructure: "popup_calc_btn",
    activityClass: "activeModal",
    contentSubclass: "jsModalContent",
    closeBtnClass: "jsModalClose",
    modalsChain: ["popup_calc", "popup_calc_profile", "popup_calc_end"],
    openFunctions: [
        () => {
            const balconIcons = document.querySelectorAll('.balcon_icons_img');
            
            balconIcons.forEach(icon => {
                icon.addEventListener('mouseenter', e => {
                    icon.classList.add('do_image_more');
                });

                icon.addEventListener('mouseleave', e => {
                    icon.classList.remove('do_image_more');
                });

                icon.addEventListener('click', e => {
                    const bigImgElem = document.querySelector('.big_img');
                    
                    if(bigImgElem.querySelector('.activeImage')) {
                        bigImgElem.querySelector('.activeImage').classList.remove('activeImage');
                    }

                    let index;
                    if(e.target.matches('.balcon_icons_img')) {
                        index = Array.prototype.indexOf.call(balconIcons, e.target);
                    } else {
                        index = Array.prototype.indexOf.call(balconIcons, e.target.parentElement);
                    }

                    bigImgElem.children[index].classList.add('activeImage');
                    this.data.formId = index;
                });
            });
        }
    ],
    nextChainFunctions: [],
    nextBtnSubClass: "_button"
});