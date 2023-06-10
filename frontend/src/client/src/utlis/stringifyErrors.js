export const stringifyErrors = (error, fieldsAliases) => {
    const errorsList = [];
    for (let key in fieldsAliases) {
        if (error[key]) {
            error[key].forEach(err => {
                errorsList.push(`${fieldsAliases[key]}: ${err}`);
            });
        }
    }

    if (error.detail) {
        errorsList.push(error.detail);
    }

    return errorsList;
}