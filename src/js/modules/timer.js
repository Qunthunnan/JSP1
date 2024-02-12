export default function timer(promoDeadline, timerClass, promoDeadlineTextLabelClass) {
    const timerWrapper = document.querySelector(`.${timerClass}`);
    const days = timerWrapper.querySelector('#days');
    const hours = timerWrapper.querySelector('#hours');
    const minutes = timerWrapper.querySelector('#minutes');
    const seconds = timerWrapper.querySelector('#seconds');
    const promoDeadlineTextLabel = document.querySelector(`.${promoDeadlineTextLabelClass}`);
    const updateList = [];
    let remains;

    if(promoDeadlineTextLabel) {
        promoDeadlineTextLabel.textContent = promoDeadline.toLocaleString('ru-RU', {day:'numeric', month: 'long'});
    }

    const intervalId = setInterval(updateTime, 1000);

    function updateRemains() {
        remains = new Date(promoDeadline - new Date());
        if(remains <= 0) {
            remains = 0;
            clearInterval(intervalId);
        }
    }

    function updateTime() {
        updateRemains();

        days.textContent = getZeroTime(remains.getDate() * (remains.getMonth() + 1));
        hours.textContent = getZeroTime(remains.getHours());
        minutes.textContent = getZeroTime(remains.getMinutes());
        seconds.textContent = getZeroTime(remains.getSeconds());
    }

    function getZeroTime(number) {
        if(`${number}`.length < 2) {
            return `0${number}`;
        }
        return number;
    }
}