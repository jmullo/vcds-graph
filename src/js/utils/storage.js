export const save = (key, item) => {
    if (localStorage) {
        localStorage.setItem(`vcds.${key}`, JSON.stringify(item));
    }
};

export const load = (key, defaultValue) => {
    if (localStorage) {
        const item = localStorage.getItem(`vcds.${key}`);

        if (item) {
            return JSON.parse(item);
        }
    }

    return defaultValue;
};
