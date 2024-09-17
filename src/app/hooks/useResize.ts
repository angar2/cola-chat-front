import { RefObject, useEffect } from 'react';
import throttle from 'lodash/throttle';
import { getViewportHeightGap, scrollToBottom } from '@/shared/utils/scroll';

type Props = {
  feedRef: RefObject<HTMLDivElement>;
};

export default function useResize(props: Props) {
  const { feedRef } = props;

  useEffect(() => {
    const handleResize = throttle(() => {
      // 화면 최상단 스크롤
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      // 화면 높이 조정
      setTimeout(() => {
        const heightGap = getViewportHeightGap();
        document.documentElement.style.height = `calc(100% - ${heightGap}px)`;

        // 피드 최하단 스크롤
        scrollToBottom(feedRef);
      }, 0);
    }, 400);

    handleResize();

    visualViewport?.addEventListener('resize', handleResize);
    return () => visualViewport?.removeEventListener('resize', handleResize);
  }, []);
}
