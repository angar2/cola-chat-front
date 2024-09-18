'use client';

import { useRef } from 'react';
import useCloseModal from '../hooks/useCloseModal';
import ChatRoomMenu from './chatRoomMenu';

type Props = {
  onClose: () => void;
};
export default function ChatRoomMenuModal(props: Props) {
  const { onClose } = props;

  const elementRef = useRef<HTMLDivElement>(null);

  useCloseModal({ elementRef, onClose });

  return (
    <div ref={elementRef} className="sm:hidden absolute top-10 right-0">
      <ChatRoomMenu />
    </div>
  );
}
