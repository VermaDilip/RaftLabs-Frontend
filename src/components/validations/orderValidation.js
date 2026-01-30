const orderValidation = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Full name is required";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
    errors.phone = "Enter a valid 10-digit phone number";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!values.address.trim()) {
    errors.address = "Delivery address is required";
  }

  return errors;
};

export default orderValidation;
