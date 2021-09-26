import React, { useState } from 'react'

export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const executeFunc = async (func) => {
    setIsLoading(true)
    try {
      const res = await func()
      return res
    } catch (err) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }
  return [executeFunc, isLoading, isError]
}
