// 로컬스토리지에서 roomChatters 가져오기
export function getSessionRoomChatters(): { [key: string]: string } {
  return JSON.parse(sessionStorage.getItem('room') || '{}');
}

// 로컬스토리지에 roomChatters 저장
export function saveSessionRoomChatters(
  roomId: string,
  chatterId: string = ''
): void {
  const data = getSessionRoomChatters();
  data[roomId] = chatterId;
  sessionStorage.setItem('room', JSON.stringify(data));
}

// 로컬스토리지에 roomChatters 삭제
export function removeSessionRoomChatters(roomId: string): void {
  const data = getSessionRoomChatters();
  delete data[roomId];
  sessionStorage.setItem('room', JSON.stringify(data));
}
