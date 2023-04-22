export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
  accountRole: user.accountRole,
  token: user.token,
});

export const LoginFailure = (err) => ({
  type: "LOGIN_FAILURE",
  payload: err,
});
