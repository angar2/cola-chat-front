'use client';

import { useEffect, useState } from 'react';
import EnterConfirmModal from './enterConfirmModal';
import { Room } from '@/shared/types/type';
import { getLocalRoomChatters } from '@/shared/utils/storage';
import ChatRoom from './chatRoom';

type Props = {
  room: Room;
};

export default function preChatRoom(props: Props) {
  const { room } = props;

  const [isEntryConfirmed, setIsEntryConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsEntryConfirmed(room.id in getLocalRoomChatters());
  }, []);

  useEffect(() => {
    setIsModalOpen(!isEntryConfirmed);
  }, [isEntryConfirmed]);

  return (
    room && (
      <>
        <EnterConfirmModal
          isOpen={isModalOpen}
          room={room}
          setIsEntryConfirmed={setIsEntryConfirmed}
        />

        {isEntryConfirmed && <ChatRoom room={room} />}
      </>
    )
  );
}
