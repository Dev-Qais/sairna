function registerValidation(inputValues) {
  const errors = {};

  if (!inputValues.name || inputValues.name.trim().length < 2) {
    errors.name = "الرجاء إدخال الاسم بشكل صحيح";
  }

  if (
    !inputValues.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValues.email)
  ) {
    errors.email = "الرجاء إدخال البريد الإلكتروني";
  }

  if (!inputValues.password || inputValues.password.length < 8) {
    errors.password = "يجب أن تكون كلمة المرور على الأقل بطول 8 أحرف";
  }

  return errors;
}
export default registerValidation;
