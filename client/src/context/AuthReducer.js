const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        error: false,
      };
    case "LOGIN_SUCCESS":
      console.log(action.payload + " success");
      return {
        user: action.payload,
        accountRole: action.payload.accountRole,
        token: action.payload.token,
        error: false,
      };
    case "LOGIN_FAILURE":
      console.log("fail " + action.payload);
      return {
        user: null,
        error: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
