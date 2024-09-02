import { SCROLL_BOTTOM_LIMIT } from '../constants/config';

// 뷰 포지션 기준 특정 메세지 위치로 스크롤 조정
export function adjustScrollPositionByView(
  scrollRef: React.RefObject<HTMLDivElement> | null,
  scrollPosition: number
) {
  if (!scrollRef) return;
  const ref = scrollRef.current;
  if (ref && getVisiblePosition(ref) > SCROLL_BOTTOM_LIMIT)
    ref.scrollTop = ref.scrollHeight - scrollPosition;
}

// 뷰 포지션 기준 최하단으로 스크롤 조정
export function scrollToBottomByView(
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
export function getVisiblePosition(ref: HTMLElement | null): number {
  if (!ref) return 0;
  else return ref.scrollHeight - ref.scrollTop - ref.clientHeight;
}

// 최하단으로 스크롤 조정
export function scrollToBottom(
  endOfMessagesRef: React.RefObject<HTMLDivElement> | null
) {
  if (!endOfMessagesRef) return;
  endOfMessagesRef!.current?.scrollIntoView({ behavior: 'smooth' });
}
