const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface newUsers {
  email: String,
  password: String,
  confirmPassword: String,
  handle: String,
}

interface Users {
  email: String,
  password: String,
}


export const empty = (data: String) => {
  return data.trim() === "";
}

export const isNewValidUsr = async (usr: newUsers) => {

  const errors = {} as any
  for (const [credential, detail] of Object.entries(usr)) {
    if (empty(detail)) {
      Object.assign({ [credential]: `The ${detail} must not be empty` });
    } else {
      switch (credential) {
        case "email":
          if (!detail.match(emailRegEx)) {
            errors.email = `Must be a vaild email address`;
          }
          break;
        case "password":
          if (detail !== usr.confirmPassword) {
            errors.confirmPassword = `Confirm password must match`;
          }
        default:
          break;
      }
    }
  }
  return errors;
}
export const isValidUsr = async (usr: Users) => {

  const errors = {} as any
  for (const [credential, detail] of Object.entries(usr)) {
    if (empty(detail)) {
      Object.assign({ [credential]: `The ${detail} must not be empty` });
    } else {
      switch (credential) {
        case "email":
          if (!detail.match(emailRegEx)) {
            errors.email = `Must be a vaild email address`;
          }
          break;
        default:
          break;
      }
    }
  }
  return errors;
}

export const reduceUserDetails = async (data: {
  bio: String,
  website: String,
  location: String
}) => {
  type UserDetails = {
    bio: String,
    website: String,
    location: String
  }
  const userDetails = {} as UserDetails;
  if (!empty(data.bio)) userDetails.bio = data.bio;
  if (!empty(data.website))
    userDetails.website =
      data.website.substring(0, 4) === "http"
        ? data.website.trim()
        : `https://${data.website.trim()}`;
  if (!empty(data.location)) userDetails.location = data.location;

  return userDetails;
}