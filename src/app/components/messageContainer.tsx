'use client';

import MessageFeed from './messageFeed';
import MessageSender from './messageSender';
import { Message } from '@/shared/types/type';

type Props = {
  messages: Message[];
};

export default function MessageContainer(props: Props) {
  const { messages } = props;

  return (
    <div className="">
      <MessageFeed messages={messages} />
      <MessageSender />
    </div>
  );
}
