import { apiService } from '../../services/apiService'

const USER_KEY = 'user'

export function login(credentials) {
  return async (dispatch) => {
    try {
      const res = await apiService.ajax({
        url: `${USER_KEY}/login`,
        data: credentials,
        method: 'POST',
      })
      console.log('res:', res)
      const action = {
        type: 'LOGIN',
        res,
      }
      dispatch(action)
    } catch (err) {
      console.log('err:', err)
      throw err
    }
  }
}

export function signup(details) {
  return async (dispatch) => {
    try {
      const res = await apiService.ajax({
        method: 'POST',
        data: details,
        url: `${USER_KEY}/signup`,
      })
      const action = {
        type: 'LOGIN',
        res,
      }
      dispatch(action)
    } catch (err) {
      console.log('err:', err)
      throw err
    }
  }
}

export function logout() {
  return async (dispatch, getState) => {
    try {
      const action = {
        type: 'LOGOUT',
      }
      dispatch(action)
      dispatch({
        type: 'RESTORE_CART',
      })
    } catch (err) {
      console.log('err:', err)
      throw err
    }
  }
}

export function saveMyMeasurements(measurements) {
  return async (dispatch, getState) => {
    try {
      const updatedUser = await apiService.ajax({
        method: 'patch',
        url: 'user/save-my-measurements',
        data: { measurements },
      })
      const res = { ...getState().userReducer, user: updatedUser }
      const action = {
        type: 'LOGIN',
        res,
      }
      dispatch(action)
    } catch (err) {
      console.log('err:', err)
      throw err
    }
  }
}
