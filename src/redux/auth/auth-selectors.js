export const selectToken = (state) => {
  // console.log({ state, auth: state.auth });
  // return state.auth.token;
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTgwYWEzNWI5NTFhYzkxNDJkZGYwZSIsImlhdCI6MTY5NjI3NzI4MSwiZXhwIjoxNjk2Mjc5MDgxfQ.itKohaOWKuiZv_diN4K2RGzVwJnX-Eeip8apTOM8eeE";
}
export const selectName = (state) => state.auth.user.name;
export const selectId = (state) => state.auth.user._id;
export const selectIsFetchingCurrentUser = (state) =>
  state.auth.isFetchingCurrentUser;
export const selectIsAuth = (state) => state.auth.isAuth;
