import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify:center min-h-screen p-2 mx-auto md:max-w-3xl md:p-24 ">
      <h1 className="my-8 text-2xl text-center sm:text-3xl md:text-4xl">
        404 Not Found Page
      </h1>
      <div>
        <h2 className="my-8 text-lg text-center sm:text-xl md:text-2xl">
          해당 채팅이 만료되었거나 페이지를 찾을 수 없습니다.
        </h2>
      </div>
      <div className="flex justify-center mx-auto">
        <Link
          href="/"
          className="p-3 rounded-md bg-blue-600 text-lg text-white"
        >
          돌아가기
        </Link>
      </div>
    </div>
  );
}
