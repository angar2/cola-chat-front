export const COMMENTS = {
  SOCKET: {
    nicknameUpdated: (oldNickname: string, newNickname: string) =>
      `${oldNickname}님의 닉네임이 ${newNickname}로 변경되었습니다.`,
  },
};
