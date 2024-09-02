import { Metadata } from 'next';
import ChatRoom from '@/app/components/chatRoom';
import { getRoom } from '@/shared/apis/chatApi';

export const metadata: Metadata = {
  title: 'Cola Chat',
  description: 'Cola Chat',
};

type Params = { params: { id: string } };

export default async function ChatPage({ params }: Params) {
  const room = await getRoom(params.id);

  return (
    room && (
      <main className="flex justify-center w-full sm:max-w-2xl 2xl:max-w-3xl items-center mx-auto py-2">
        {<ChatRoom room={room} />}
      </main>
    )
  );
}
