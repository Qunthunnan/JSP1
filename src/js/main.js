import './modules/slider';
import { Modals } from './modules/modals';
import { ModalSystem } from './modules/modalSystem';
import { popupCalcStart, popupCalcValidate } from './modules/popupCalc';
import { popupCalcProfileStart, popupCalcProfileValidate } from './modules/popupCalcProfile';
import ripples from './modules/btnsAnim';
import { Forms } from './modules/forms';
import { SliderTabs } from './modules/tabs';
import { Galery } from './modules/galery';
import timer from './modules/timer';

const modals = new Modals({
    'popup': 'phone_link',
    'popup_engineer': 'popup_engineer_btn',
}, 'activeModal', 'jsModalContent', 'jsModalClose');

ripples('button');

const calculationModal = new ModalSystem({
    classesStructure: "popup_calc_btn",
    activityClass: "activeModal",
    contentSubclass: "jsModalContent",
    closeBtnClass: "jsModalClose",
    modalsChain: ["popup_calc", "popup_calc_profile", "popup_calc_end"],
    warningMessageClass: 'warningMessage',
    openFunctions: [
        (data) => {
            popupCalcStart(data);
        },
        (data) => {
            popupCalcProfileStart(data);
        },
        () => {
            console.log('bam');
        }
    ],
    nextChainFunctions: [
        (data) => {
            return popupCalcValidate(data);
        },
        (data) => {
            return popupCalcProfileValidate(data);
        },
        () => {
            console.log('bim');
        }
    ],
    nextBtnSubClass: "_button",
    nextBtnId: 'next',
});

const forms = new Forms('form', [
    'user_name',
    'user_phone'
], 'form_input', 'popup_sended');

const tabGlazzing = new SliderTabs('glazing_block', 'glazing_tabs', 'glazing_content');
const balconGlazzing = new SliderTabs('jsBalconTab', 'jsTabsBalcon', 'jsBalconTabContent', 'after_click');

const galery = new Galery('jsGalery', 'jsGaleryImage');

timer(new Date('2024-02-25T13:00:00+00:00'), 'timer1', 'deadlineLabel');

setTimeout(() => {
    modals.showModal('popup');
}, 60000);

export {modals, calculationModal}