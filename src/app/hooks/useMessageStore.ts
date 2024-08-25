import { getMessagesFromRoom } from '@/shared/apis/chatApi';
import { Message } from '@/shared/types/type';
import { useState, useCallback, useEffect } from 'react';

export default function useMessageStore(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    (async () => {
      const messages = await getMessagesFromRoom(roomId);
      setMessages(messages);
    })();
  }, []);

  // 메시지 추가
  const addMessage = useCallback((message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {}, [messages]);

  return {
    messages,
    addMessage,
  };
}
