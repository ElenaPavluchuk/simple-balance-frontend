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

export const transactionsValidate = (values) => {
  const errors = {};
  const { type, title, amount, selectedCategory, date } = values;

  if ("type" in values && !type) {
    errors.type = "Type is required";
  }

  if ("title" in values) {
    if (!title.trim()) {
      errors.title = "Titile is required";
    } else if (title.length > 150) {
      errors.title = "Title must be no more than 150 characters long";
    }
  }

  if ("amount" in values && !amount) {
    errors.amount = "Amount is required";
  }

  if ("selectedCategory" in values && !selectedCategory) {
    errors.selectedCategory = "Category is required";
  }

  if ("date" in values && !date) {
    errors.date = "Date is required";
  }

  return errors;
};
