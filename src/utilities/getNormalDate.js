export default function (timeStamp) {
    const dateObj = new Date(timeStamp * 1000)
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDay() + 1;
    return `${year}.${month}.${day}`
}