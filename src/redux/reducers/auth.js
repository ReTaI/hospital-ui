import { LOGIN, LOGOUT } from "../actionCreators/auth";
const initialState = {
  login: "",
  fullname: "",
  role: -1,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        role: action.role,
        login: action.login,
        fullname: action.fullname,
      };
    case LOGOUT:
      return { ...state, role: -1, login: "", fullname: "" };
    default:
      return state;
  }
}
