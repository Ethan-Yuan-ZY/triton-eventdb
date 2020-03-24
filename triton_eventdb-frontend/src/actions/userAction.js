export function loginUser(token, userId, tokenExpiration) {
  return {
    type: "LOGIN",
    payload: {
      token,
      userId,
      tokenExpiration
    }
  };
}
