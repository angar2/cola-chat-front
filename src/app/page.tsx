import Image from 'next/image';
import CreateChatRoomBox from './components/createChatRoomBox';

export default function Home() {
  return (
    <main className="flex-grow flex max-w-xl justify-center mx-auto pt-2 sm:pt-8 2xl:pt-20">
      <div className="flex flex-col gap-12">
        <div className="w-full px-6 overflow-auto">
          <Image
            src="/assets/images/main/banner.png"
            alt="Cola Chat"
            className="w-full"
            width={224}
            height={224}
          />
        </div>
        <CreateChatRoomBox />
      </div>
    </main>
  );
}
