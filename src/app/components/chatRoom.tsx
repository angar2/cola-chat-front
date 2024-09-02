'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import EnterConfirmModal from './enterConfirmModal';
import { Room } from '@/shared/types/type';
import {
  getLocalRoomChatters,
  saveLocalRoomChatters,
} from '@/shared/utils/storage';
import MessageContainer from './messageContainer';

type Props = {
  room: Room;
};

export default function ChatRoom(props: Props) {
  const { room } = props;

  const router = useRouter();

  const [isEntryConfirmed, setIsEntryConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsEntryConfirmed(room.id in getLocalRoomChatters());
  }, []);

  useEffect(() => {
    if (isEntryConfirmed) setIsModalOpen(false);
    else setIsModalOpen(true);
  }, [isEntryConfirmed]);

  const handleEnterChatRoom = () => {
    saveLocalRoomChatters(room.id);
    setIsEntryConfirmed(true);
  };

  return (
    room && (
      <>
        <EnterConfirmModal
          isOpen={isModalOpen}
          onClose={() => router.push('/')}
          onConfirm={handleEnterChatRoom}
        />

        {isEntryConfirmed && <MessageContainer room={room} />}
      </>
    )
  );
}
