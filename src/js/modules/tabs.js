export class SliderTabs {
    constructor(tabItemsClass, tabWrapperClass, contentClass, activityClass) {
        this.tabItemsClass = tabItemsClass;
        this.tabWrapperClass = tabWrapperClass;
        this.tabWrapperElement = document.querySelector(`.${tabWrapperClass}`);
        this.contentClass = contentClass;
        this.contentElements = document.querySelectorAll(`.${contentClass}`);
        this.activityClass = activityClass;
        this.curentIndex = 0;

        this.tabWrapperElement.addEventListener('click', e => {
            const targetElement = e.target.closest(`.${tabItemsClass}`);
            if(targetElement) {
                const index = +targetElement.getAttribute('data-index');
                this.go(index);
            }
        });
    }

    go(index) {
        if(this.activityClass) {
            const curentElements = document.querySelectorAll(`[data-index="${this.curentIndex}"]`);
            curentElements.forEach(tab => {
                tab.classList.remove(this.activityClass);
            });

            const targetElements = document.querySelectorAll(`[data-index="${index}"]`);
            targetElements.forEach(tab => {
                tab.classList.add(this.activityClass);
            });
        }

        this.contentElements[this.curentIndex].style.display = 'none';
        this.contentElements[index].style.display = 'block';
        this.curentIndex = index;
    }
}