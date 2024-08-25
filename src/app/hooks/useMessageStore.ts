import { useState, useCallback, useEffect } from 'react';

export default function useMessageStore() {
  const [messages, setMessages] = useState<string[]>([]);

  // 메시지 추가
  const addMessage = useCallback((message: string) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return {
    messages,
    addMessage,
  };
}
