'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import EnterConfirmModal from './enterConfirmModal';
import EnteredChatRoom from './enteredChatRoom';
import { Room } from '@/shared/types/type';
import {
  getLocalRoomChatters,
  saveLocalRoomChatters,
} from '@/shared/utils/storage';

type Props = {
  room: Room;
};

export default function PreChatRoom(props: Props) {
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

        {isEntryConfirmed && <EnteredChatRoom room={room} />}
      </>
    )
  );
}
