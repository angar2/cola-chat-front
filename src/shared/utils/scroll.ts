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

// 현재 뷰 포지션 가져오기
export function getVisiblePosition(ref: HTMLElement | null): number {
  if (!ref) return 0;
  else return ref.scrollHeight - ref.scrollTop - ref.clientHeight;
}

// 최하단으로 스크롤 조정
export function scrollToBottom(ref: React.RefObject<HTMLDivElement> | null) {
  const element = ref?.current;
  if (element) element.scrollTop = element.scrollHeight;
}

// 이너-뷰포트 높이 차이 가져오기
export function getViewportHeightGap(): number {
  const windowHeight = Number(window.innerHeight) || 0;
  const visualHeight = Number(window.visualViewport?.height) || 0;
  return windowHeight - visualHeight;
}
