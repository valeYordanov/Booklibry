export const handleFirebaseError = (error) => {
  switch (error.response.status) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case 422:
      return ;
    case "auth/user-not-found":
      return "User not found.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/weak-password":
      return "Password is too weak.";
    case "auth/network-request-failed":
      return "Network error. Please try again.";
    case "auth/invalid-credential":
      return "Password or email doesn't match";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
