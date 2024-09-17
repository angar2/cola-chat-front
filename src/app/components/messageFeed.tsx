'use client';

import { RefObject, useEffect, useState } from 'react';
import { Message } from '@/shared/types/type';
import { SCROLL_BOTTOM_LIMIT } from '@/shared/constants/config';
import MessageBox from './messageBox';
import {
  adjustScrollPositionByView,
  getVisiblePosition,
  scrollToBottom,
} from '@/shared/utils/scroll';
import useMessageStore from '../stores/messageStore';
import useRoomStore from '../stores/roomStore';
import useScroll from '../hooks/useScroll';

type Props = {
  setShowMessagePreview: (value: boolean) => void;
  setLastMessage: (value: Message) => void;
  feedRef: RefObject<HTMLDivElement>;
};

export default function MessageFeed(props: Props) {
  const { setShowMessagePreview, setLastMessage, feedRef } = props;

  const room = useRoomStore((state) => state.room);
  const { messages, page, loadMessages } = useMessageStore();

  const [scrollPosition, setScrollPosition] = useState(0);

  // 스크롤 이벤트 등록
  useScroll({ feedRef, setScrollPosition, setShowMessagePreview });

  // 메세지 표시 처리
  const handleMessagePreview = () => {
    const ref = feedRef.current;
    if (ref && getVisiblePosition(ref) > SCROLL_BOTTOM_LIMIT)
      setShowMessagePreview(true); // 메세지 미리보기 표시
    else scrollToBottom(feedRef); // 피드 최하단 스크롤
  };

  // 메세지 로드
  useEffect(() => {
    if (room) loadMessages(room.id);
  }, [room, page]);

  // 스크롤 위치 조정(저장된 메세지 로드)
  useEffect(() => {
    adjustScrollPositionByView(feedRef, scrollPosition); // 뷰 포지션 기준 특정 메세지 위치로 스크롤 조정
  }, [messages.storageMessages]);

  // 스크롤 위치 조정(새로운 메세지 로드)
  useEffect(() => {
    handleMessagePreview(); // 메세지 표시 처리
    setLastMessage(messages.newMessages[messages.newMessages.length - 1]);
  }, [messages.newMessages]);

  return (
    <div ref={feedRef} className="flex-grow p-4 pb-2 sm:pb-2 overflow-y-auto">
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
    </div>
  );
}
