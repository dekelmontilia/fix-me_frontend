import React, { useEffect, useState } from 'react'

const Counter = (props) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setInterval(() => setSeconds(seconds + 1), 1000)
  }, [])
  return <div></div>
}

export default Counter
