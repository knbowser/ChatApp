import $ from 'jquery';


export function promptForUsername(){
  let username = prompt('Enter a username');
  return username.toLowerCase();
}

export class ChatForm{
  constructor(formSel, inputSel){
    this.$form = $(formSel);
    this.$input = $(inputSel);
  }

  init(submitCallback){
    this.$form.submit((event) => {
      event.preventDefault();
      let val = this.$input.val();
      submitCallback(val);
      this.$input.val('');
    });

    this.$form.find('button').on('click', () => this.$form.submit());
  }
}

export class ChatList {
  constructor(listSel, username){
    this.$list = $(listSel);
    this.username = username;
  }

  drawMessage({user: u, timestamp: t, message: m}){
    let $messageRow = $('<li>', {
      'class': 'message-row'
    });

    if (this.username === u) {
      $messageRow.addClass('me');
    }

    let $message = $('<p>');

    $message.append($('<span>',{
      'class': 'message-username',
      text: u
    }));

    let date = new Date();
    let UTCdate = date.toUTCString();

    $message.append($('<p>',{
      'class': 'timestamp',
      'data-time': t,
      text: UTCdate
    }));

    $message.append($('<p>',{
      'class': 'message-message',
      text: m
    }));

    $messageRow.append($message);
    $(this.$list).append($messageRow);
    $messageRow.get(0).scrollIntoView();
  }
}
