'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRoom } from '@/shared/apis/chatApi';
import EnterConfirmModal from './enterConfirmModal';
import EnteredChatRoom from './enteredChatRoom';

type Props = {
  roomId: string;
};

export default function ChatRoom(props: Props) {
  const roomId = props.roomId;

  const router = useRouter();

  const [roomTitle, setRoomTitle] = useState<string>('');
  const [namespace, setNamespace] = useState<string>('');

  const [isEntryConfirmed, setIsEntryConfirmed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const room = await getRoom(roomId);
      setRoomTitle(room.title);
      setNamespace(room.namespace);
    })();

    setIsEntryConfirmed(getLocalRoomIds().includes(roomId));
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
    <div className="flex flex-col w-full">
      <div className="p-2">
        <p className="relative mx-auto max-w-3xl">{namespace}</p>
        <p className="relative mx-auto max-w-3xl">{roomTitle}</p>
      </div>
      <EnterConfirmModal
        isOpen={isModalOpen}
        onClose={() => router.push('/')}
        onConfirm={handleEnterChatRoom}
      />
      {isEntryConfirmed && (
        <EnteredChatRoom namespace={namespace} roomId={props.roomId} />
      )}
    </div>
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
