'use client';

import { Room } from '@/shared/types/type';
import MessageContainer from './messageContainer';
import ChatRoomMenu from './chatRoomMenu';
import useSocket from '../hooks/useSocket';
import useRoomStore from '../stores/roomStore';

type Props = {
  room: Room;
};

export default function ChatRoom(props: Props) {
  const { room } = props;

  const setRoom = useRoomStore((state) => state.setRoom);

  useSocket({ room });
  setRoom(room);

  return (
    room && (
      <div className="flex w-full h-full">
        <MessageContainer />
        <div className="hidden sm:block h-fit">
          <ChatRoomMenu />
        </div>
      </div>
    )
  );
}
