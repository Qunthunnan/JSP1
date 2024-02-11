export default function buttonsAnimation(buttonsClass) {
    const buttons = document.querySelectorAll(`.${buttonsClass}`);
    
    buttons.forEach(item => {
        item.addEventListener('click', createRipple);
    });

    function createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();

        const preventDuble = button.querySelector('.ripple');
        if(preventDuble) {
            preventDuble.remove();
        }

        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = `${Math.max(button.clientWidth, button.clientHeight)}px`;
        ripple.style.left = `${event.clientX - rect.x - Math.max(button.clientWidth, button.clientHeight) / 2}px`;
        ripple.style.top = `${event.clientY - rect.y - Math.max(button.clientWidth, button.clientHeight) / 2}px`;
        ripple.classList.add('ripple');
        button.append(ripple);
    }
}