import socket from './ws-client';
import {UserStore} from './storage';
import {ChatForm, ChatList, promptForUsername} from './dom';

const FORM_SELECTOR = '[data-chat="chat-form"]';
const INPUT_SELECTOR = '[data-chat="message-input"]';
const LIST_SELECTOR = '[data-chat="message-list"]';

let userStore = new UserStore('x-chatapp/u');
let username = userStore.get();
if (!username){
  username = promptForUsername();
  userStore.set(username);
}

class ChatApp {
  constructor() {
    this.chatForm = new ChatForm(FORM_SELECTOR, INPUT_SELECTOR);
    this.chatList = new ChatList(LIST_SELECTOR, this.username);

    socket.init(`ws://${window.location.hostname}:3001`);
    socket.registerOpenHandler(() => {
      this.chatForm.init((data) => {
        let message = new ChatMessage({message:data});
        socket.sendMessage(message.serialize());
      });
    });

    socket.registerMessageHandler((data) => {
      console.log(data);
      let message = new ChatMessage(data);
      this.chatList.drawMessage(message.serialize());
    });
  }
}

class ChatMessage {
  constructor({
    message: m="default message",
    user: u= username,
    timestamp: t=(new Date()).getTime()
  }){
    this.message = m;
    this.user = u;
    this.timestamp = t;
  }
serialize(){
  return {
    message:this.message,
    user:this.user,
    timestamp: this.timestamp
    };
  }
}

export default ChatApp;
