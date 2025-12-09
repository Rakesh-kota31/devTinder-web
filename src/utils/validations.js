const namePattern = /^[A-Za-z\s-]{3,}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateSignUpData = (firstName, lastName, emailID, password) => {
  const error = {};

  if (!firstName.trim()) error.firstName = "First Name is required";

  if (!lastName.trim()) error.lastName = "Last Name is required";

  if (!emailID.trim()) error.emailID = "Email is required";

  if (!password) error.password = "Password is required";

  if (!namePattern.test(firstName))
    error.firstName = error.firstName
      ? error.firstName
      : "First Name isn't valid";

  if (!namePattern.test(lastName))
    error.lastName = error.lastName ? error.lastName : "Last Name isn't valid";

  if (!emailPattern.test(emailID))
    error.emailID = error.emailID ? error.emailID : "Email isn't valid";

  if (!passwordPattern.test(password))
    error.password = error.password ? error.password : "Password isn't valid";

  return error;
};

export const validateLoginData = (emailID, password) => {
  const error = {};

  if (!emailID.trim()) error.emailID = "Email is required";

  if (!password) error.password = "Password is required";

  if (!emailPattern.test(emailID))
    error.emailID = error.emailID ? error.emailID : "Email isn't valid";

  if (!passwordPattern.test(password))
    error.password = error.password ? error.password : "Password isn't valid";

  return error;
};

export const validateProfileEditData = (data) => {
  const error = {};
  const { firstName, middleName, lastName, age, gender, profileURL, about } =
    data;

  // First name
  if (!firstName?.trim()) {
    error.firstName = "First Name is required";
  } else if (!namePattern.test(firstName)) {
    error.firstName = "First Name isn't valid";
  }

  // Last name
  if (!lastName?.trim()) {
    error.lastName = "Last Name is required";
  } else if (!namePattern.test(lastName)) {
    error.lastName = "Last Name isn't valid";
  }
  if (middleName && !namePattern.test(middleName))
    error.middleName = "Middle Name isn't valid";

  if (age) {
    const numAge = Number(age);

    if (isNaN(numAge)) {
      error.age = "Age must be a number";
    } else if (numAge < 18) {
      error.age = "Age must be at least 18";
    }
  }

  if (gender && !["male", "female", "others"].includes(gender))
    error.gender = `${gender} isn't valid`;

  if (about && about.length > 300)
    error.about = "About cannot exceed 300 characters";

  if (profileURL) {
    try {
      new URL(profileURL);
    } catch {
      error.profileURL = "Please enter a valid URL.";
    }
  }

  return error;
};
