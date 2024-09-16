'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { Message } from '@/shared/types/type';
import { SCROLL_BOTTOM_LIMIT } from '@/shared/constants/config';
import MessageBox from './messageBox';
import {
  adjustScrollPositionByView,
  getVisiblePosition,
  scrollToBottomByView,
} from '@/shared/utils/scroll';
import useMessageStore from '../stores/messageStore';
import useRoomStore from '../stores/roomStore';

type Props = {
  setShowMessagePreview: (value: boolean) => void;
  setLastMessage: (value: Message) => void;
  endOfMessagesRef: RefObject<HTMLDivElement>;
};

export default function MessageFeed(props: Props) {
  const { setShowMessagePreview, setLastMessage, endOfMessagesRef } = props;

  const room = useRoomStore((state) => state.room);
  const { messages, page, loadMessages } = useMessageStore();
  const nextPage = useMessageStore((state) => state.nextPage);

  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // 스크롤 위치 감지
  const handleScroll = () => {
    const ref = scrollRef.current;
    if (!ref) return;
    if (ref.scrollTop === 0) {
      setScrollPosition(ref.scrollHeight - ref.scrollTop); // 현 스크롤 위치 캡쳐
      nextPage(); // 페이지 넘기기
    }
    if (getVisiblePosition(ref) < SCROLL_BOTTOM_LIMIT)
      setShowMessagePreview(false); // 메세지 미리보기 표시 해제
  };

  // 메세지 미리보기 표시
  const handleMessagePreview = () => {
    const ref = scrollRef.current;
    if (ref && getVisiblePosition(ref) > SCROLL_BOTTOM_LIMIT)
      setShowMessagePreview(true);
  };

  // 스크롤 이벤트 등록
  useEffect(() => {
    const ref = scrollRef.current;
    ref?.addEventListener('scroll', handleScroll);

    return () => {
      ref?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 메세지 로드
  useEffect(() => {
    if (room) loadMessages(room.id);
  }, [room, page]);

  // 스크롤 위치 조정(저장된 메세지 로드)
  useEffect(() => {
    adjustScrollPositionByView(scrollRef, scrollPosition); // 뷰 포지션 기준 특정 메세지 위치로 스크롤 조정
  }, [messages.storageMessages]);

  // 스크롤 위치 조정(새로운 메세지 로드)
  useEffect(() => {
    scrollToBottomByView(scrollRef, endOfMessagesRef); // 뷰 포지션 기준 최하단으로 스크롤 조정
    handleMessagePreview(); // 메세지 미리보기 표시
    setLastMessage(messages.newMessages[messages.newMessages.length - 1]);
  }, [messages.newMessages]);

  return (
    <div
      ref={scrollRef}
      className="flex-grow p-4 pb-16 sm:pb-32 overflow-y-auto"
    >
      <div className="flex flex-col">
        {/* 저장된 메세지 */}
        {messages.storageMessages.length > 0 &&
          messages.storageMessages.map((message, index) => (
            <div key={index}>
              <MessageBox message={message} />
            </div>
          ))}

        {/* 새로운 메세지 */}
        {messages.newMessages.length > 0 &&
          messages.newMessages.map((message, index) => (
            <div key={index}>
              <MessageBox message={message} />
            </div>
          ))}
      </div>

      {/* 스크롤 위치 */}
      <div ref={endOfMessagesRef} />
    </div>
  );
}
