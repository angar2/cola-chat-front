import React, { useState } from 'react';

type Props = {
  isOpen: boolean;
  isInput: boolean;
  error: string;
  setIsOpen: (value: boolean) => void;
  setError: (value: string) => void;
  handleCallback: (value?: string) => void;
};
4;
export default function LeaveRoomModal(props: Props) {
  const {
    isOpen,
    isInput,
    error = null,
    setIsOpen,
    setError,
    handleCallback,
  } = props;
  if (!isOpen) return;

  const [value, setValue] = useState<string>('');

  // 입력 인풋
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  // 모달 닫기
  const handleClose = () => {
    setError('');
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-fit min-w-48 px-6 pt-6 pb-4 rounded bg-a shadow-lg text-center">
        <h2 className="text-base 2xl:text-lg text-g font-medium mb-2 whitespace-nowrap">
          채팅방에서 나가시겠습니까?
        </h2>
        <h3 className="text-sm 2xl:text-base text-c font-medium mb-4 whitespace-nowrap">
          대화 내용은 모두 사라집니다.
        </h3>
        {isInput && (
          <div className="mb-4">
            <input
              type="text"
              value={value}
              onChange={handleInput}
              placeholder={error || ''}
              className={`w-[80%] px-2 py-1 border-[0.8px] border-g disabled:border-d focus:outline-none focus:ring-1 focus:ring-d placeholder:text-sm placeholder:text-center ${
                error && 'placeholder:text-e'
              }`}
            />
          </div>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleCallback(...(isInput ? [value] : []))}
            className="w-16 py-2 bg-f text-a text-sm 2xl:text-base rounded"
          >
            네
          </button>
          <button
            onClick={handleClose}
            className="w-16 py-2 bg-c text-a text-sm 2xl:text-base rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}
