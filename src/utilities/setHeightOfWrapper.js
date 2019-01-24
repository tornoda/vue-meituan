export default function ({ appSelector, height }) {
    document.querySelector(appSelector).style.height = height + "px";
}