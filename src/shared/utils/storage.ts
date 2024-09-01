// 로컬스토리지에 roomChatters 저장
export function saveLocalRoomChatters(
  roomId: string,
  chatterId: string = ''
): void {
  const data = getLocalRoomChatters();
  data[roomId] = chatterId;
  localStorage.setItem('room', JSON.stringify(data));
}

// 로컬스토리지에서 roomChatters 가져오기
export function getLocalRoomChatters(): { [key: string]: string } {
  return JSON.parse(localStorage.getItem('room') || '{}');
}
