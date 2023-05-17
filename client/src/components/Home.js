import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./Home.css"

const Home = ({ socket }) => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.setItem("userName", userName)
    socket.emit("newUser", { userName, socketID: socket.id })
    navigate("/chat")
  }
  return (
    // <form class="form-group" onSubmit={handleSubmit}>
    //     <h2 className='home__header'>Sign in to Open Chat</h2>
    //     <label htmlFor="username">Username</label>
    //     <input type="text" 
    //     minLength={6} 
    //     name="username" 
    //     id='username'
    //     className='username__input' 
    //     value={userName} 
    //     onChange={e => setUserName(e.target.value)}
    //     />
    //     <button className='home__cta'>SIGN IN</button>
    // </form>

    <form onSubmit={handleSubmit}>
      <h2 >Sign in to Open Chat</h2>
      <div class="form-group">
        <input
          type="text"
          minLength={5}
          name="username"
          id='username'
          className='username__input'
          aautocomplete="off"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          class="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
      </div>
      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
  )
}

export default Home