
export const checkValidData = (email, password, isSignUp = false) => {
  const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
      password
    );

  if (!isEmailValid) return "Email address is not valid.";
  if (!password) return "Enter your password.";
  if (isSignUp && !isPasswordValid) {
    return "Sign-up password must be at least 8 characters and include uppercase, lowercase, a number, and a symbol.";
  }

  return null;
};