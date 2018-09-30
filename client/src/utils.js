export const getOfflineTime = (offlineMoment) => {
    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;

    const now = new Date();
    const diff = now.getTime() - new Date(offlineMoment).getTime();

    if (diff < HOUR) return (parseInt(diff / MINUTE, 10) + 1).toString() + 'min';
    else if (diff < 24 * HOUR) return (parseInt(diff / HOUR, 10) + 1).toString() + 'hour';
    else if (diff < 7 * DAY) return (parseInt(diff / DAY, 10) + 1).toString() + 'day';
    else return '';
}