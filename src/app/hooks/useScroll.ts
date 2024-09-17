import { SCROLL_BOTTOM_LIMIT } from '@/shared/constants/config';
import { getVisiblePosition } from '@/shared/utils/scroll';
import { RefObject, useEffect } from 'react';
import useMessageStore from '../stores/messageStore';

type Props = {
  feedRef: RefObject<HTMLDivElement>;
  setScrollPosition: (value: number) => void;
  setShowMessagePreview: (value: boolean) => void;
};

export default function useScroll(props: Props) {
  const { feedRef, setScrollPosition, setShowMessagePreview } = props;

  const nextPage = useMessageStore((state) => state.nextPage);

  useEffect(() => {
    const ref = feedRef?.current;
    if (!ref) return;

    const handleScroll = () => {
      if (ref.scrollTop === 0) {
        setScrollPosition(ref.scrollHeight - ref.scrollTop); // 현재 스크롤 위치 캡처
        nextPage(); // 페이지 넘기기
      }
      if (getVisiblePosition(ref) < SCROLL_BOTTOM_LIMIT) {
        setShowMessagePreview(false); // 메시지 미리보기 표시 해제
      }
    };

    ref.addEventListener('scroll', handleScroll);
    return () => ref.removeEventListener('scroll', handleScroll);
  }, []);
}
