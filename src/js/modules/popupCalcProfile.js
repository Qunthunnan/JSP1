export function popupCalcProfileStart (data) {
    const profileType = document.querySelector('#view_type');
    const checkboxes = document.querySelectorAll('[name="checkbox-test"]');

    data.glassType = profileType.children[0].value;
    profileType.addEventListener('input', e => {
        data.glassType = e.target.value;
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('input', e => {
            data.glassProfile = e.target.getAttribute('data-value');
        });
    });
}

export function popupCalcProfileValidate (data) {

    const messageErrors = {
        glassProfile: 'Выберите профиль остекления'
    }

    if(data.glassProfile === undefined) {
        return messageErrors.glassProfile;
    }

    const profileType = document.querySelector('#view_type');
    const checkboxes = document.querySelectorAll('[name="checkbox-test"]');
    profileType.value = profileType.children[0].value;
    checkboxes.forEach(checkbox => {
        checkbox.value = '';
    });

    return true;
}