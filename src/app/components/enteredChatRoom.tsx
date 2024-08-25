'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import useSocket from '@/app/hooks/useSocket';
import useMessageStore from '@/app/hooks/useMessageStore';

type Props = {
  namespace: string;
  roomId: string;
};

export default function EnteredChatRoom(props: Props) {
  const { roomId, namespace } = props;
  const router = useRouter();

  // const roomId = props.roomId;
  // const [namespace, setNamespace] = useState<string>('');

  const { messages, addMessage } = useMessageStore();

  const handleMessage = (message: string) => {
    addMessage(message);
  };

  useSocket(roomId, namespace, handleMessage);

  // useEffect(() => {
  //   (async () => {
  //     const room = await getRoom(roomId);
  //     setNamespace(room.namespace);
  //   })();
  // }, []);

  return <div className="flex flex-col w-full"></div>;
}
