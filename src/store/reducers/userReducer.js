const INITIAL_STATE = {
  user: null,
  token: null,
}

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.res.user,
        token: action.res.token,
      }
    case 'LOGOUT':
      return {
        user: null,
        token: null,
      }
    default:
      return state
  }
}
