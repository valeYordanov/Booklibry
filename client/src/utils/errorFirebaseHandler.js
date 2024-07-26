export const handleFirebaseError = (error) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/network-request-failed":
      return "Network error. Please try again.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
