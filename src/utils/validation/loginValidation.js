function loginValidation(inputValues) {
  const errors = {};

  const email = inputValues.email.trim();
  const password = inputValues.password;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "الرجاء إدخال البريد الإلكتروني بشكل صحيح";
  }
  if (!password.trim()) {
    errors.password = "الرجاء إدخال كلمة المرور";
  }
  return errors;
}

export default loginValidation;
