export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
  });
  
  export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
    typeAccount: user.typeAccount,
  });
  
  export const LoginFailure = (err) => ({
    type: "LOGIN_FAILURE",
    payload: err,
  });