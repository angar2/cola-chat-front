'use client';

import { useEffect, useState } from 'react';
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

        {isEntryConfirmed && <MessageContainer room={room} />}
      </>
    )
  );
}
