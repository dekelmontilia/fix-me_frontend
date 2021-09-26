import { useEffect } from 'react'
import { useState } from 'react'
import './NisimComponent.scss'

export const NisimComponent = (props) => {
  return <div></div>
}

const [seconds, setSeconds] = useState(0)

useEffect(() => {
  setInterval(() => setSeconds(seconds + 1), 1000)
}, [])
