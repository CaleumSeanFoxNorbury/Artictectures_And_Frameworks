import React from 'react';

import onlineIcon from '../../public/img/OnlineIcon.png';

import './css/ChatStyles.css';

//Chat text container
const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>Users in the room:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="activeItem">
                    {name}
                    <img alt="Online Icon" src={onlineIcon}/>
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;