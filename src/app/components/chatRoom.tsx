'use client';
import { useEffect, useState } from 'react';
import { getRoom } from '@/shared/apis/chatApi';
import useSocket from '../hooks/useSocket';
import useMessageStore from '../hooks/useMessageStore';

type Props = {
  roomId: string;
};
export default function ChatRoom(props: Props) {
  const roomId = props.roomId;
  const [roomTitle, setRoomTitle] = useState<string>('');
  const [namespace, setNamespace] = useState<string>('');
  const { messages, addMessage } = useMessageStore();

  const handleMessage = (message: string) => {
    addMessage(message);
  };

  const socket = useSocket(roomId, namespace, handleMessage);

  useEffect(() => {
    (async () => {
      const room = await getRoom(roomId);
      setRoomTitle(room.title);
      setNamespace(room.namespace);
    })();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="p-2">
        <p className="relative mx-auto max-w-3xl">{roomTitle}</p>
      </div>
    </div>
  );
}
