export const getObjectLocalStorage = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
}

export const getLocalStorage = (key) => {
    return localStorage.getItem(key) ? localStorage.getItem(key) : null;
}

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
}

export const setObjectLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}