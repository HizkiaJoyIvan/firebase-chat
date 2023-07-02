import React, { useEffect, useState } from 'react'
import {addDoc, collection, serverTimestamp, onSnapshot, query, where} from 'firebase/firestore'
import { auth, db } from '../config/firebase'

const Chat = (props) => {

  const {room} = props
  const [message, setMessage] = useState()
  const [messages, setMessages] = useState()
  const messageRef = collection(db, "messages")

  useEffect(()=>{
    const queryMessages = query(messageRef, where("room", "==", room))
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messagesList = []
      snapshot.forEach((doc) => {
        messagesList.push({...doc.data(), id:doc.id})
      })
      setMessages(messagesList)
    })

    return () => unsubscribe()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(message === "") return 

    await addDoc(messageRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room
    })
    setMessage("")
  }

  return (
    <div>
      <div className="text-3xl font-bold mb-4 text-green-600">{room.toUpperCase()}</div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        {messages?.map(m => 
          <p className={m.user === auth.currentUser.displayName ? "bg-white rounded-lg shadow-md p-4 mb-4 flex gap-2 flex-col text-right" : ""}>
            <span className='text-sm text-gray-600'>{m.user === auth.currentUser.displayName ? "You" : m.user}</span>
            <span className="font-bold">{m.text}</span>
          </p>)}
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder='Enter your message here...' 
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="flex-grow border border-gray-400 px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button type='submit' className="bg-green-500 text-white px-4 py-2 rounded-r-lg ml-2">Send</button>
      </form>
    </div>
  )
}

export default Chat