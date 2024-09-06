import { useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  getLocalRoomChatters,
  saveLocalRoomChatters,
} from '@/shared/utils/storage';
import { emitJoin, emitLeave } from '@/shared/webSockets/emit';
import useSocketStore from '../stores/socketStore';
import useMessageStore from '../stores/messageStore';
import { Room } from '@/shared/types/type';
import useRoomChattersStore from '../stores/roomchatterStore';
import useRoomStore from '../stores/roomStore';
import { SocketEvent } from '@/shared/types/enum';

const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL as string;

type Props = {
  room: Room;
};
export default function useSocket(props: Props) {
  const { id: roomId, namespace } = props.room;

  const { socket, setSocket } = useSocketStore();
  const setChatters = useRoomStore((state) => state.setChatters);
  const addRoomChatters = useRoomChattersStore(
    (state) => state.addRoomChatters
  );
  const addMessage = useMessageStore((state) => state.addMessage);

  useEffect(() => {
    if (!namespace) return;

    const socketInstance = io(`${SOCKET_BASE_URL}/${namespace}`, {
      transports: ['websocket'],
      autoConnect: false,
    });

    // 소켓 연결
    socketInstance.connect();

    socketInstance.on(SocketEvent.CONNECT, () => {
      console.log('Connected to WebSocket server');
      setSocket(socketInstance);

      // 채팅방 입장
      emitJoin(
        socketInstance,
        { roomId, chatterId: getLocalRoomChatters()[roomId] },
        (param1, param2) => saveLocalRoomChatters(param1, param2),
        (param1, param2) => addRoomChatters(param1, param2)
      );
    });

    socketInstance.on(SocketEvent.DISCONNECT, () => {
      console.log('Disconnected from WebSocket server');
      setSocket(null);
    });

    socketInstance.on(SocketEvent.ALERT, (data) => {
      addMessage(data);
    });

    socketInstance.on(SocketEvent.MESSAGE, (data) => {
      addMessage(data);
    });

    socketInstance.on(SocketEvent.CHATTERS, (data) => {
      setChatters(data);
    });

    socketInstance.on(SocketEvent.Error, (data) => {
      console.log('Websocket Error', JSON.parse(data));
    });

    const handleBeforeUnload = () => {
      // 채팅방 퇴장
      emitLeave(socketInstance, { roomId }, () => setSocket(null));
    };

    // 페이지 이벤트 설정(방 퇴장)
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // 페이지 이벤트 제거
      window.removeEventListener('beforeunload', handleBeforeUnload);

      // 소켓 연결 해제
      if (socket) socket.disconnect();
    };
  }, [namespace, roomId]);
}
