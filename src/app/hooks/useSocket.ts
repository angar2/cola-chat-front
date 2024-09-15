import { useEffect } from 'react';
import { io } from 'socket.io-client';
import {
  getSessionRoomChatters,
  removeSessionRoomChatters,
  saveSessionRoomChatters,
} from '@/shared/utils/storage';
import { emitJoin } from '@/shared/webSockets/emit';
import useSocketStore from '../stores/socketStore';
import useMessageStore from '../stores/messageStore';
import { Room } from '@/shared/types/type';
import useRoomChattersStore from '../stores/roomchatterStore';
import useRoomStore from '../stores/roomStore';
import { SocketEvent } from '@/shared/types/enum';
import { useRouter } from 'next/navigation';

const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL as string;

type Props = {
  room: Room;
};
export default function useSocket(props: Props) {
  const { id: roomId, namespace } = props.room;

  const router = useRouter();

  const { socket, setSocket } = useSocketStore();
  const setChatters = useRoomStore((state) => state.setChatters);
  const roomChatters = useRoomChattersStore((state) => state.roomChatters);
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
        { roomId, chatterId: getSessionRoomChatters()[roomId] },
        (param1, param2) => saveSessionRoomChatters(param1, param2),
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

    // 페이지 이동 라우터 변경
    const originalPush = router.push;
    const newPush = (href: string, options?: any) => {
      // 소켓 세션 데이터 제거
      removeSessionRoomChatters(roomId);
      delete roomChatters[roomId];

      // 소켓 연결 해제
      socketInstance.disconnect();
      originalPush(href, options);
    };
    router.push = newPush;

    return () => {
      // 페이지 이동 라우터 복구
      router.push = originalPush;

      // 소켓 연결 해제
      if (socket) socket.disconnect();
    };
  }, [namespace, roomId]);
}
