import React from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function EnterConfirmModal(props: Props) {
  const { isOpen, onClose, onConfirm } = props;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="p-6 rounded bg-a shadow-lg 2xl:w-80 text-center">
        <h2 className="text-base 2xl:text-lg font-medium mb-4">
          채팅방에 입장하시겠습니까?
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="w-16 py-2 bg-f text-a text-sm 2xl:text-base rounded"
          >
            네
          </button>
          <button
            onClick={onClose}
            className="w-16 py-2 bg-c text-a text-sm 2xl:text-base rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
