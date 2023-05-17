import React, { useState, useEffect } from 'react'
import CursorPointer from './CursorPointer';
import face from "../components/img/avatar1.png"
import { plus } from "../components/icons"
import "../components/ChatBar.css"

const ChatBar = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // const handleMouseMove = (event) => {
    //     setPosition({ x: event.clientX, y: event.clientY });
    // };

    // const [position, setPosition] = useState({ x: 0, y: 0 });

    // const handleMouseMove = (event) => {
    //     setPosition({ x: event.clientX, y: event.clientY });
    // };

    useEffect(() => {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])


    const [userPositions, setUserPositions] = useState({});

    const handleMouseMove = (event, userName) => {
        setUserPositions(prevPositions => ({
            ...prevPositions,
            [userName]: { x: event.clientX, y: event.clientY }
        }));
    };
    
    

    const userNames = ['John', 'Jane', 'Alice'];

    return (
        <div className='chat__sidebar'>
            <div>
                <h2 style={{marginTop: "50px"}}>Active Users</h2>
                {/* <div className='chat__users'>
                    {users.map(user => (
                        <button style={{ marginLeft: "30px" }} key={user.socketID}>
                            {user.userName}
                        </button>
                    ))}
                </div> */}
                <br></br>

                <div style={{ height: '100vh' }}
                >
                    {users.map(user => (
                        <button
                            key={user.socketID}
                            style={{
                                position: 'fixed',
                                overflow: 'hidden',
                                left: userPositions[user.userName]?.x,
                                top: userPositions[user.userName]?.y
                            }}
                            onMouseMove={event => handleMouseMove(event, user.userName)}
                        >
                            <img src={face}></img>
                             <div className='username' style={{marginLeft: "10px"}}>{user.userName}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ChatBar