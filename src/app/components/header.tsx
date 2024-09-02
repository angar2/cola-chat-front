import { LOGO_IMAGE_URL } from '@/shared/constants/url';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex justify-between items-center mx-auto px-8 py-4">
      <div>
        <Link href="/">
          <Image
            src={LOGO_IMAGE_URL}
            alt="Cola Chat"
            className="w-full"
            width={192}
            height={56.5}
          />
        </Link>
      </div>
    </header>
  );
}
