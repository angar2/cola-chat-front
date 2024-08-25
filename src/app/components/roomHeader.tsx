'use client';

import { Room } from '@/shared/types/type';

type Props = {
  room: Room;
};

export default function RoomHeader(props: Props) {
  const { namespace, title } = props.room;

  return (
    <div className="h-[10vh] p-2">
      <p className="relative mx-auto max-w-3xl">{namespace}</p>
      <p className="relative mx-auto max-w-3xl">{title}</p>
    </div>
  );
}
