export const authValidate = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { selectedCurrency, fullName, email, password } = values;

  if ("selectedCurrency" in values && !selectedCurrency) {
    errors.selectedCurrency = "Currency is required";
  }

  if ("fullName" in values) {
    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (fullName.length > 100) {
      errors.fullName = "Full name must be no more than 100 characters long";
    }
  }

  if ("email" in values && !emailRegex.test(email)) {
    errors.email = "Please enter a valide email address";
  }

  if ("password" in values) {
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6 || password.length > 128) {
      errors.password = "Password length must be between 6 and 128 characters";
    }
  }

  return errors;
};
