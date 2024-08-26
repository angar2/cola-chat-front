import { getMessagesFromRoom } from '@/shared/apis/chatApi';
import { Message } from '@/shared/types/type';
import { useState, useCallback, useEffect } from 'react';

export default function useMessageStore(roomId: string) {
  const [messages, setMessages] = useState<{
    storageMessages: Message[];
    newMessages: Message[];
  }>({
    storageMessages: [],
    newMessages: [],
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // 로딩 상태 활성화
      setLoading(true);

      // 저장된 메세지 로드
      const initialMessages = await getMessagesFromRoom({ roomId, page });
      setMessages((prevMessages) => ({
        ...prevMessages,
        storageMessages: [...initialMessages, ...prevMessages.storageMessages],
      }));

      // 로딩 상태 비활성화
      setLoading(false);
    })();
  }, [roomId, page]);

  // 새로운 메세지 추가
  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      newMessages: [...prevMessages.newMessages, message],
    }));
  }, []);

  // 페이지 넘기기
  const nextPage = useCallback(() => {
    if (!loading) setPage((prevPage) => prevPage + 1);
  }, []);

  return {
    messages,
    addMessage,
    nextPage,
  };
}
