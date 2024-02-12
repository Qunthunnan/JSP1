export class Galery {
   constructor(galeryWrapperClass, imageLinksClass) {
        this.galeryWrapperClass = galeryWrapperClass;
        this.galery = document.querySelector(`.${this.galeryWrapperClass}`);
        this.imageLinksClass = imageLinksClass;
        this.galeryOverlayClass = 'galery__overlay';
        this.galeryImageClass = 'gallery__image';

        this.galery.addEventListener('click', e => {
            e.preventDefault();
            const link = e.target.closest(`.${this.imageLinksClass}`);
            if(link) {
                const imageLink = link.getAttribute('href');
                if(imageLink) {
                    e.key = true;
                    this.showImage(imageLink);
                }
            }
        });
    }

    showImage(link) {
        const wrapper = document.createElement('div');
        const wrapperStyles = {
            position: 'fixed',
            opacity: '0',
            left: '0',
            top: '0',
            display: 'flex',
            cursor: 'pointer',
            width: '100vw',
            height: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000000a3',
        }
        for(let i in wrapperStyles) {
            wrapper.style[i] = wrapperStyles[i];
        }
        wrapper.classList.add(this.galeryOverlayClass);
        document.documentElement.append(wrapper);

        const showWrapperAnimation = wrapper.animate([
            {
                opacity:'0'
            },
            {
                opacity: '1'
            }
        ], {
            easing: 'ease',
            duration: 200,
            fill: 'forwards',
        });

        showWrapperAnimation.finished.then(() => {
            const image = document.createElement('img');
            image.classList.add(this.galeryImageClass);
            image.setAttribute('src', link);
            image.setAttribute('alt', 'galery zoomed image');
            const imageStyles = {
                transform: 'scale(0)',
                borderRadius: '50%',
                cursor: 'default'

            }
            for(let i in imageStyles) {
                image.style[i] = imageStyles[i];
            }
            wrapper.append(image);
            const imageShowAnimation = image.animate([
                {
                    transform: 'scale(1)',
                    borderRadius: '30px'
                }
            ], {easing: 'ease', duration: 300, fill: 'forwards'});
    
            imageShowAnimation.finished.then(() => {
                wrapper.addEventListener('click', e => {
                    if(!e.target.matches(`.${this.galeryImageClass}`)) {
                        this.closeImage(e.target);
                    }
                });
            });
        });
        

    }

    closeImage(overlay) {
        const image = overlay.querySelector(`.${this.galeryImageClass}`);
        const closeImgAnim = image.animate([
            {
                transform: 'scale(0)',
                borderRadius: '50%'
            }
        ],{ easing: 'ease', fill: 'forwards', duration: 300 });

        closeImgAnim.finished.then(() => {
            const closeOverlayAnim = overlay.animate([
                {
                    opacity: '0'
                }
            ], { duration: 200, easing: 'ease', fill: 'forwards' });

            closeOverlayAnim.finished.then(() => {
                overlay.remove();
            });
        });

    }
}