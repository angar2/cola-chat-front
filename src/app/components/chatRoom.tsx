'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import EnterConfirmModal from './enterConfirmModal';
import EnteredChatRoom from './enteredChatRoom';
import { Room } from '@/shared/types/type';

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
    setIsEntryConfirmed(getLocalRoomIds().includes(roomId));

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
    saveLocalRoomId(roomId);
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

// 로컬스토리지에 입장한 roomId 저장
function saveLocalRoomId(roomId: string) {
  const existingRoomIds = getLocalRoomIds();
  if (!existingRoomIds.includes(roomId)) {
    existingRoomIds.push(roomId);
    localStorage.setItem('entryRoomIds', JSON.stringify(existingRoomIds));
  }
}

// 로컬스토리지에서 입장한 roomId 가져오기
function getLocalRoomIds(): string[] {
  return JSON.parse(localStorage.getItem('entryRoomIds') || '[]');
}
