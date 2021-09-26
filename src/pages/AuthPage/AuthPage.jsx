import { useDispatch } from 'react-redux'
import { signup } from '../../store/actions/userActions'
import './AuthPage.scss'

export const AuthPage = (props) => {
  const dispatch = useDispatch()
  return (
    <div className='auth-page center-childs'>
      <button
        onClick={() =>
          dispatch(
            signup({
              name: 'hadar',
              email: 'hadar@gmail.com',
              password: '1234',
              passwordConfirm: '1234',
            })
          )
        }
      >
        Sign Up
      </button>
    </div>
  )
}
