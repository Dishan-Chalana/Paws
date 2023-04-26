import React from 'react'
import {ChatAutoComplete , useMessageInputContext} from "stream-chat-react"
import "./Chat.css";

function CoustomInput() {
    const { handleSubmit } = useMessageInputContext();
    return (
        <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
            <div className="str-chat__input-flat-wrapper">
                <div className="str-chat__input-flat--textarea-wrapper">
                    <ChatAutoComplete />
                </div>
                <button className="send-msg-btn" onClick={handleSubmit}> Send Message</button>
            </div>
        </div>
    );
}

export default CoustomInput