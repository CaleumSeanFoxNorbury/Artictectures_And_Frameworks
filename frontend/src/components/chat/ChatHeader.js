import React from 'react';

import onlineIcon from '../../public/img/OnlineIcon.png';
import closeIcon from '../../public/img/CloseIcon.png';

import './css/ChatStyles.css';
//Chat header bar
const ChatHeader = ({ room }) => (
  <div className="chatHeader">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default ChatHeader;