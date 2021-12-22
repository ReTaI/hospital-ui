export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = ({ login, role, fullname }) => {
  return {
    type: LOGIN,
    login: login,
    role: role,
    fullname: fullname,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
