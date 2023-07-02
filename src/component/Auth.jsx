import React from 'react'
import {auth, provider} from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

const Auth = (props) => {

  const {setIsAuth} = props

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider)
      cookies.set("auth-token", res.user.refreshToken)
      setIsAuth(true)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className='text-4xl bg-green-900 text-white p-5 rounded-md font-bold'>Firebase Chat App</h1>
      <button onClick={signInWithGoogle} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Sign In with Google</button>
    </div>
  )
}

export default Auth


