import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "./context/AuthActions";

export const loginCall = async(userCredential, dispatch) => {
  dispatch(LoginStart(userCredential));
  try {
    const res = await axios.post("http://localhost:8000/api/auth/logIn", userCredential);
    console.log(res.data,"login data")
    if (res.data.username !== undefined) {
      dispatch(LoginSuccess(res.data));
  } else {
      dispatch(LoginFailure("Đăng nhập lỗi"));
  }
  } catch (err) {
    console.log(err);
  }
};