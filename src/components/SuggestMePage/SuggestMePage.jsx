import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { notificationService } from '../../services/notificationService'
import { saveMyMeasurements } from '../../store/actions/userActions'
import { AppLoading } from '../AppLoading'
import './SuggestMePage.scss'

export const SuggestMePage = (props) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const user = useSelector((rootReducer) => rootReducer.userReducer.user)
  const [measurements, setMeasurements] = useState({
    height: user.measurements.height,
    weight: user.measurements.weight,
    chest: user.measurements.chest,
    waist: user.measurements.waist,
    hips: user.measurements.hips,
    feet: user.measurements.feet,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await dispatch(saveMyMeasurements(measurements))
      notificationService.notify('success', `saved measurements`)
    } catch (err) {
      notificationService.notify(
        'error',
        `Error while thrying to save my measurements: ${err.message}`
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='suggest-me-page page center-childs'>
      <div className='card center-childs column'>
        <div className='head flex align-center'>
          <h2 className='title'>My Measurements</h2>
          <img className='profile-img' src={user.profileImage} alt='' />
        </div>
        <div className='fields-box fg-1 flex'>
          {Object.keys(measurements).map((currMeasurement) => (
            <Field
              key={currMeasurement}
              name={currMeasurement}
              measurements={measurements}
              setMeasurements={setMeasurements}
            />
          ))}
        </div>
        <button
          className='primary-button'
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? <AppLoading /> : 'Save My Measurements'}
        </button>
      </div>
    </div>
  )
}

function Field({ name, label = '', setMeasurements, measurements }) {
  const handleChange = (ev) => {
    setMeasurements({
      ...measurements,
      [name]: +ev.target.value,
    })
  }

  return (
    <div className='field flex column'>
      <label htmlFor={`${name}Input`}>{`My ${name}`}</label>
      <input
        className='app-input'
        min={0}
        max={10000}
        value={measurements[name]}
        onChange={handleChange}
        name={name}
        type='number'
        id={`${name}Input`}
      />
    </div>
  )
}
