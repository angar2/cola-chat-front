'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import EnterConfirmModal from './enterConfirmModal';
import EnteredChatRoom from './enteredChatRoom';
import { Room } from '@/shared/types/type';
import {
  getLocalRoomParticipants,
  saveLocalRoomParticipants,
} from '@/shared/utils/storage';

type Props = {
  roomId: string;
};

export default function ChatRoom(props: Props) {
  const roomId = props.roomId;

  const router = useRouter();

  const [isEntryConfirmed, setIsEntryConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [room, setRoom] = useState<Room | null>(null);

  useEffect(() => {
    setIsEntryConfirmed(roomId in getLocalRoomParticipants());

    (async () => {
      const room = await getRoom(roomId);
      setRoom(room);
    })();
  }, []);

  useEffect(() => {
    if (isEntryConfirmed) setIsModalOpen(false);
    else setIsModalOpen(true);
  }, [isEntryConfirmed]);

  const handleEnterChatRoom = () => {
    saveLocalRoomParticipants(roomId);
    setIsEntryConfirmed(true);
  };

  return (
    <>
      <EnterConfirmModal
        isOpen={isModalOpen}
        onClose={() => router.push('/')}
        onConfirm={handleEnterChatRoom}
      />
      {isEntryConfirmed && room && <EnteredChatRoom room={room} />}
    </>
  );
}
