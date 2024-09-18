import { RefObject, useEffect } from 'react';

type Props = {
  elementRef: RefObject<HTMLElement>;
  onClose: () => void;
  onCallback?: () => void;
};

export default function useCloseModal(props: Props) {
  const { elementRef, onClose, onCallback } = props;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        onClose();
        if (onCallback) onCallback();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [elementRef, onClose]);
}
