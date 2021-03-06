import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './css/ChatStyles.css';

//Joining chats 
export default function Join(){
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="header">Join</h1>
                <div><input placeHolder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div><input placeHolder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} /></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault():null} to={`/chat/room?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="submit">Join Room</button>
                </Link>
            </div>
        </div>
    )
}

