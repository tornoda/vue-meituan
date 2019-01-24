export default (fn) => {
    let isFirstTime = true;
    return () => {
        if (isFirstTime === true) {
            isFirstTime = false
            fn.apply(this, arguments)
        }

    }
}