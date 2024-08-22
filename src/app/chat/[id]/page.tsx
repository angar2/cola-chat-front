import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cola Chat',
  description: '',
};

export default async function ChatPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex items-center w-full h-full  overflow-auto">
      <div className="flex w-full overflow-hidden h-screen ">
        <div className="flex flex-col w-full">
          <div className="p-2">
            <div className="relative mx-auto max-w-3xl">채팅방</div>
          </div>
        </div>
      </div>
    </div>
  );
}
