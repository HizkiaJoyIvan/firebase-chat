import './App.css';
import Auth from '../../client1/src/component/Auth'
import Chat from '../../client1/src/component/Chat'
import Cookies from 'universal-cookie'
import { useState, useRef } from 'react'
import { auth } from './config/firebase'
import { signOut } from 'firebase/auth'
const cookies = new Cookies()

function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"))
  const [room, setRoom] = useState(null)

  const roomName = useRef()
  
  if(!isAuth) return (
    <div>
      <Auth setIsAuth={setIsAuth}/>
    </div>
  )

  const handleSignOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
    setRoom(null)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {room ? 
        <div>
          <Chat room={room}/>
        </div> : 
        <div className='bg-gray-100 p-10 rounded-md'>
          <label className="block text-gray-700">Enter room name : </label>
          <input type="text" placeholder='' ref={roomName} className="border border-gray-400 px-4 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <button onClick={() => setRoom(roomName.current.value)} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Enter room</button>
        </div>
      }
      <div className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2 absolute top-2 right-5 cursor-pointer' onClick={handleSignOut}>Sign Out</div>
    </div>
  )
}

export default App

