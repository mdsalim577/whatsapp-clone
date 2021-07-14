import React , {useEffect, useState} from 'react'
import './styles.css'
import {Avatar, IconButton} from "@material-ui/core"
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import {useParams} from "react-router-dom";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from "firebase";

function Chat() {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const[{user}, dispatch] = useStateValue();

    useEffect(() =>{
        if (roomId) {
            db.collection("rooms")
            .doc(roomId)
            .onSnapshot((snapshot) =>
            setRoomName(snapshot.data().name));

            db.collection('rooms')
            .doc(roomId)
            .collection("messages")
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId])

    const sendMessage = (e) =>{
        e.preventDefault();
        // console.log(input);
        db.collection('rooms')
        .doc(roomId)
        .collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }

    
    return (
        <div className = "chat">
            <div className="chat_header">
                <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{" "}
                        {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()
                    }</p>
                </div>
            <div className="chat_headerRight">
                <IconButton>
                    <SearchOutlined>
                    </SearchOutlined>
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
           </div> 
            <div className="chat_body">
                {messages.map((message) =>(
                    <p className={`chat_message ${message.name === user.displayName && "chat_receiver"} `}>
                    <span className = "chat_name">{message.name}</span>
                    {message.message}
                    <span className = "timeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                
                {/* <p className="chat_message"><span className = "chat_name">Anonymous</span>Hey
                <span className = "timeStamp">18:21</span>
                </p>
                <p className={`chat_message ${true && "chat_receiver"} `}><span className = "chat_name">Md Salim</span>Wassup!
                <span className = "timeStamp">18:21</span>
                </p>
                <p className="chat_message"><span className = "chat_name">Anonymous</span>NM
                <span className = "timeStamp">18:21</span>
                </p> */}
               
            </div>
            
            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value = {input} onChange={(e) => setInput(e.target.value)}  placeholder = "Type a message" type = 'text'></input>

                    <button onClick = {sendMessage} type = "submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat