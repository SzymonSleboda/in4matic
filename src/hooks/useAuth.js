import { useSelector } from "react-redux";
import { selectIsAuth, selectUser } from "redux/auth/auth-selectors";

export const useAuth = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(selectUser);

  return {
    isAuth,
    user,
  };
};
