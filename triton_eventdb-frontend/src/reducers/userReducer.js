const userReducer = (
  state = {
    token: null,
    userId: null
  },
  action
) => {
  switch (action.type) {
    case "LOGIN":
      state = {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId
      };
      break;
    case "LOGOUT":
      state = {
        ...state,
        token: null,
        userId: null
      };
      break;
    default:
      state = {
        ...state
      };
  }
  return state;
};

export default userReducer;
