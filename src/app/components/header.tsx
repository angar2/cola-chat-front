import { LOGO_IMAGE_URL } from '@/shared/constants/url';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex-none flex justify-between items-center px-3 sm:px-8 pt-2 pb-2">
      <div>
        <Link href="/">
          <Image
            src={LOGO_IMAGE_URL}
            alt="Cola Chat"
            width={160}
            height={50}
            className="w-28 sm:w-40"
          />
        </Link>
      </div>
    </header>
  );
}
