// 로컬스토리지에 roomParticipants 저장
export function saveLocalRoomParticipants(
  roomId: string,
  participantId: string = ''
): void {
  const data = getLocalRoomParticipants();
  data[roomId] = participantId;
  localStorage.setItem('roomParticipants', JSON.stringify(data));
}

// 로컬스토리지에서 roomParticipants 가져오기
export function getLocalRoomParticipants(): { [key: string]: string } {
  return JSON.parse(localStorage.getItem('roomParticipants') || '{}');
}
