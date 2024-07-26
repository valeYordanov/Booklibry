export const validateForErrors = (object) => {
    const objectErrors = {};

    if (!objectErrors.email) objectErrors.email = "Email is required!";
    if (!objectErrors.username) objectErrors.username = "Username is required!";
    if (!objectErrors.password) objectErrors.password = "Password is required!";
    if (!objectErrors.country) objectErrors.country = "Country is required!";
    if (!objectErrors.tel || isNaN(objectErrors.tel))
        objectErrors.tel = "Please add a valid number!";

    return objectErrors;
  };