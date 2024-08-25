import { Metadata } from 'next';
import ChatRoom from '@/app/components/chatRoom';

export const metadata: Metadata = {
  title: 'Cola Chat',
  description: 'Cola Chat',
};

export default function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center w-full h-full overflow-auto">
      <div className="flex w-full overflow-hidden h-screen ">
        <ChatRoom roomId={params.id} />
      </div>
    </div>
  );
}
