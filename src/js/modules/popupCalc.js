export function popupCalcStart (data) {
    const balconIcons = document.querySelectorAll('.balcon_icons_img');
    const widthField = document.querySelector('#width');
    const heightField = document.querySelector('#height');
    
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
            data.formId = index;
        });
    });

    heightField.addEventListener('input', e => {
        data.height = heightField.value;
    });

    widthField.addEventListener('input', e => {
        data.width = widthField.value;
    });
}

export function popupCalcValidate (data) {
    const errorMessages = {
        sizes: 'Введите ширину и высоту',
        sizesFormat: 'В поле ширина и высота можно вписать только число',
        iconsBalcon: 'Выберите балкон',
    }
    const modalElement = document.querySelector('.popup_calc_content');

    const regex = /^\d*$/;

    if(data.height === undefined || data.width === undefined || data.height === '' || data.width === '') {
        return errorMessages.sizes;
    }

    if((regex.test(data.height) === false) || (regex.test(data.width) === false)) {
        return errorMessages.sizesFormat;
    }

    if(!data.formId) {
        return errorMessages.iconsBalcon;
    }

    const widthField = document.querySelector('#width');
    const heightField = document.querySelector('#height');
    const bigImgElem = document.querySelector('.big_img');
    widthField.value = '';
    heightField.value = '';
    bigImgElem.remove();

    return true;
}