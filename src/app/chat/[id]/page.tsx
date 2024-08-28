import { Metadata } from 'next';
import PreChatRoom from '@/app/components/preChatRoom';
import { getRoom } from '@/shared/apis/chatApi';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Cola Chat',
  description: 'Cola Chat',
};

type Params = { params: { id: string } };

export default async function ChatPage({ params }: Params) {
  const room = await getRoom(params.id);

  return (
    <div className="flex items-center w-full h-full overflow-auto">
      <div className="flex w-full overflow-hidden h-screen">
        {room && <PreChatRoom room={room} />}
      </div>
    </div>
  );
}
