import axios from "axios";
import {
  LoginStart,
  LoginSuccess,
  LoginFailure
} from "./context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart(userCredential));
  console.log(userCredential);
  try {
    const res = await axios.post(
      "http://localhost:8080/api/auth/login",
      userCredential, {
        withCredentials: true,
      }
    );
    console.log(res.data, "login data");
    if (res.data.token !== undefined) {
      dispatch(LoginSuccess(res.data));
    } else {
      dispatch(LoginFailure("Đăng nhập lỗi"));
    }
  } catch (err) {
    console.log(err);
  }
};