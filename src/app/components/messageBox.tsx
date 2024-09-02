'use client';

import { MessageType } from '@/shared/types/enum';
import { Message } from '@/shared/types/type';
import { getLocalRoomChatters } from '@/shared/utils/storage';

type Props = {
  message: Message;
};

export default function MessageBox(props: Props) {
  const { message } = props;

  const sentAt = new Date(message.sentAt);
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  });
  const date = formatter.format(sentAt);

  const isMine = getLocalRoomChatters()[message.roomId] === message.chatter.id;

  return message.type === MessageType.MESSAGE ? (
    // 메세지일 경우
    <div className="flex flex-col gap-1 p-2 rounded">
      <div className={`flex ${isMine && 'flex-row-reverse'}`}>
        <p className="text-c font-semibold">{message.chatter.nickname}</p>
      </div>
      <div className={`flex ${isMine && 'flex-row-reverse'} gap-2`}>
        <div className={`px-3 py-2 ${isMine ? 'bg-b' : 'bg-a'} rounded-md`}>
          <p className="text-g whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="flex w-fit items-end">
          <p className="text-xs text-c whitespace-nowrap">{date}</p>
        </div>
      </div>
    </div>
  ) : (
    // 핑일 경우
    <div className="flex justify-center p-2 rounded">
      <div className="px-3 py-1">
        <p className="text-sm text-c whitespace-pre-wrap">{message.content}</p>
      </div>
      <div className="flex w-fit items-center">
        <p className="text-xs text-c whitespace-nowrap">({date})</p>
      </div>
    </div>
  );
}
