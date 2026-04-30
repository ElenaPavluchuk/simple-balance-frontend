export const authValidate = (values) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { selectedCurrency, userName, email, password } = values;

  if ("selectedCurrency" in values && !selectedCurrency) {
    errors.selectedCurrency = "Currency is required";
  }

  if ("userName" in values) {
    if (!userName.trim()) {
      errors.userName = "User name is required";
    } else if (userName.length > 100) {
      errors.userName = "User name must be no more than 100 characters long";
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

export const transactionsValidate = (values) => {
  const errors = {};
  const { title, amount, selectedCategory, date } = values;

  if ("title" in values) {
    if (!title.trim()) {
      errors.title = "Titile is required";
    } else if (title.length > 200) {
      errors.title = "Title must be no more than 200 characters long";
    }
  }

  if ("amount" in values) {
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      errors.amount = "Amount must be greater than 0";
    }
  }

  if ("selectedCategory" in values && !selectedCategory) {
    errors.selectedCategory = "Category is required";
  }

  if ("date" in values && !date) {
    errors.date = "Date is required";
  }

  return errors;
};

export const clearFieldError = (field, setValidateErrors) => {
  setValidateErrors((prev) => ({ ...prev, [field]: "" }));
};
