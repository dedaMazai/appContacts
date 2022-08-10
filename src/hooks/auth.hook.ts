import React, {useCallback, useEffect} from 'react'
import { useDispatch } from 'react-redux';


export const useAuth = () => {
  const dispatch = useDispatch()
  const setToken = (token: string) => {
    dispatch({type:"SET_TOKEN", payload: token})
  }

  const login = useCallback((jwtToken: string) => {
    setToken(jwtToken)

    localStorage.setItem('userToken', jwtToken)
  }, [])

  useEffect(() => {
    const data: string | false  = localStorage.getItem('userToken') ?? false
    if (data) {
      login(data)
    }
  }, [login])

  return { login }
}
