'use client';

import { useEffect, useState } from 'react';
import EnterConfirmModal from './enterConfirmModal';
import { Room } from '@/shared/types/type';
import { getLocalRoomChatters } from '@/shared/utils/storage';
import ChatRoom from './chatRoom';
import ErrorModal from './errorModal';

type Props = {
  room: Room;
};

export default function preChatRoom(props: Props) {
  const { room } = props;

  const [isEntryConfirmed, setIsEntryConfirmed] = useState(false);
  const [isEntryModalOpen, setIsEntryModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setIsEntryConfirmed(room.id in getLocalRoomChatters());
  }, []);

  useEffect(() => {
    setIsEntryModalOpen(!isEntryConfirmed);
  }, [isEntryConfirmed]);

  return (
    <>
      {isErrorModalOpen ? (
        <ErrorModal errorMessage={errorMessage} />
      ) : (
        <EnterConfirmModal
          isOpen={isEntryModalOpen}
          room={room}
          setIsEntryConfirmed={setIsEntryConfirmed}
          setIsErrorModalOpen={setIsErrorModalOpen}
          setEerrorMessage={setErrorMessage}
        />
      )}

      {isEntryConfirmed && <ChatRoom room={room} />}
    </>
  );
}
