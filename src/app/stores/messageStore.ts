import { create } from 'zustand';
import { getMessagesFromRoom } from '@/shared/apis/chatApi';
import { Message } from '@/shared/types/type';
import { getSessionRoomChatters } from '@/shared/utils/storage';

interface MessageStoreState {
  messages: {
    storageMessages: Message[];
    newMessages: Message[];
  };
  page: number;
  loading: boolean;
  loadMessages: (roomId: string) => Promise<void>;
  addMessage: (message: Message) => void;
  nextPage: () => void;
}

const useMessageStore = create<MessageStoreState>((set, get) => ({
  messages: {
    storageMessages: [],
    newMessages: [],
  },
  page: 1,
  loading: false,

  // 메시지 로드
  loadMessages: async (roomId: string) => {
    set({ loading: true });

    const { page } = get();
    const initialMessages = await getMessagesFromRoom({
      roomId,
      page,
      chatterId: getSessionRoomChatters()[roomId],
    });

    if (initialMessages) {
      set((state) => ({
        messages: {
          ...state.messages,
          storageMessages: [
            ...initialMessages,
            ...state.messages.storageMessages,
          ],
        },
      }));
    }

    set({ loading: false });
  },

  // 새로운 메시지 추가
  addMessage: (message: Message) => {
    set((state) => ({
      messages: {
        ...state.messages,
        newMessages: [...state.messages.newMessages, message],
      },
    }));
  },

  // 페이지 넘기기
  nextPage: () => {
    const { loading } = get();
    if (!loading) {
      set((state) => ({ page: state.page + 1 }));
    }
  },
}));

export default useMessageStore;
