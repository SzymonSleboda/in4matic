import { useSelector } from "react-redux";
import { selectIsAuth } from "redux/auth/auth-selectors";

export const useAuth = () => {
  const isAuth = useSelector(selectIsAuth);

  return {
    isAuth,
  };
};
