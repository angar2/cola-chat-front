'use client';

import { useEffect, useState } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import EnterConfirmModal from './enterConfirmModal';
import EnteredChatRoom from './enteredChatRoom';
import { Room } from '@/shared/types/type';
import {
  getLocalRoomParticipants,
  saveLocalRoomParticipants,
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
    setIsEntryConfirmed(room.id in getLocalRoomParticipants());
  }, []);

  useEffect(() => {
    if (isEntryConfirmed) setIsModalOpen(false);
    else setIsModalOpen(true);
  }, [isEntryConfirmed]);

  const handleEnterChatRoom = () => {
    saveLocalRoomParticipants(room.id);
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
