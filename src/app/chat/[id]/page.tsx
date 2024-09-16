import { Metadata } from 'next';
import PreChatRoom from '@/app/components/preChatRoom';
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
      <main className="flex-grow flex justify-center w-full h-full sm:max-w-2xl 2xl:max-w-3xl mx-auto pt-0 sm:pt-4 pb-0 sm:pb-4 overflow-hidden">
        {<PreChatRoom room={room} />}
      </main>
    )
  );
}
