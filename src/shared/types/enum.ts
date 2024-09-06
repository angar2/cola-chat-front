export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN = 'joinRoom',
  LEAVE = 'leaveRoom',
  MESSAGE = 'sendMessage',
  ALERT = 'sendAlert',
  CHATTERS = 'returnChatters',
  Error = 'message',
}

export enum MessageType {
  MESSAGE = 'MESSAGE',
  ALERT = 'ALERT',
}
