'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { Message } from '@/shared/types/type';
import { SCROLL_BOTTOM_LIMIT } from '@/shared/constants/config';
import MessagePreview from './messagePreview';
import { getLocalRoomParticipants } from '@/shared/utils/storage';

type Props = {
  messages: {
    storageMessages: Message[];
    newMessages: Message[];
  };
  nextPage: () => void;
  endOfMessagesRef: RefObject<HTMLDivElement>;
};

export default function MessageFeed(props: Props) {
  const { messages, nextPage, endOfMessagesRef } = props;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showMessagePreview, setShowMessagePreview] = useState(false);
  const [lastMessage, setLastMessage] = useState<Message>();

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
      className="flex flex-col space-y-2 p-4 h-[80vh] overflow-y-auto bg-white"
    >
      <div className="">
        {/* 저장된 메세지 */}
        {messages.storageMessages.length > 0 &&
          messages.storageMessages.map((message, index) => (
            <div key={index} className="border p-2 rounded bg-gray-100">
              <p>
                <strong>{message.participant.nickname}</strong>
              </p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">
                {message.sentAt.toLocaleString()}
              </p>
            </div>
          ))}

        {/* 새로운 메세지 */}
        {messages.newMessages.length > 0 &&
          messages.newMessages.map((message, index) => (
            <div key={index} className="border p-2 rounded bg-gray-100">
              <p>
                <strong className="text-blue-500">
                  {message.participant.nickname}
                </strong>
              </p>
              <p>{message.content}</p>
              <p className="text-xs text-gray-500">
                {message.sentAt.toLocaleString()}
              </p>
            </div>
          ))}
      </div>
      {showMessagePreview &&
        lastMessage &&
        lastMessage.participantId !==
          getLocalRoomParticipants()[lastMessage.roomId] && (
          <MessagePreview
            lastMessage={lastMessage}
            onClick={() => {
              scrollToBottom(endOfMessagesRef);
              setShowMessagePreview(false);
            }}
          />
        )}

      {/* 스크롤 위치 */}
      <div ref={endOfMessagesRef} className="mt-8" />
    </div>
  );
}

// 뷰 포지션 기준 특정 메세지 위치로 스크롤 조정
function adjustScrollPositionByView(
  scrollRef: React.RefObject<HTMLDivElement> | null,
  scrollPosition: number
) {
  if (!scrollRef) return;
  const ref = scrollRef.current;
  if (ref && getVisiblePosition(ref) > SCROLL_BOTTOM_LIMIT)
    ref.scrollTop = ref.scrollHeight - scrollPosition;
}

// 뷰 포지션 기준 최하단으로 스크롤 조정
function scrollToBottomByView(
  scrollRef: React.RefObject<HTMLDivElement> | null,
  endOfMessagesRef: React.RefObject<HTMLDivElement> | null
) {
  if (!scrollRef || !endOfMessagesRef) return;
  if (
    scrollRef.current &&
    getVisiblePosition(scrollRef.current) < SCROLL_BOTTOM_LIMIT
  )
    scrollToBottom(endOfMessagesRef);
}

// 현재 뷰 포지션 가져오기
function getVisiblePosition(ref: HTMLElement | null): number {
  if (!ref) return 0;
  else return ref.scrollHeight - ref.scrollTop - ref.clientHeight;
}

// 최하단으로 스크롤 조정
function scrollToBottom(
  endOfMessagesRef: React.RefObject<HTMLDivElement> | null
) {
  if (!endOfMessagesRef) return;
  endOfMessagesRef!.current?.scrollIntoView({ behavior: 'smooth' });
}
