export default increment = (nr) => {
    return {
        type: "INCREMENT",
        payload: nr
    }
};
export default decrement = (nr) => {
    return {
        type: "DECREMENT",
        payload: nr
    }
};
