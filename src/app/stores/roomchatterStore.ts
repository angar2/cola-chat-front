import { create } from 'zustand';
import { Chatter } from '@/shared/types/type';

interface RoomChattersStoreState {
  roomChatters: { [key: string]: Chatter };
  addRoomChatters: (roomId: string, chatter: Chatter) => void;
}

const useRoomChattersStore = create<RoomChattersStoreState>((set) => ({
  roomChatters: {},
  addRoomChatters: (roomId: string, chatter: Chatter) =>
    set((state) => ({
      roomChatters: {
        ...state.roomChatters,
        [roomId]: chatter,
      },
    })),
}));
export default useRoomChattersStore;
