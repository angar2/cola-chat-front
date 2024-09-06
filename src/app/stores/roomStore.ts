import { create } from 'zustand';
import { Room } from '@/shared/types/type';
import { Chatter } from '@/shared/types/type';

interface RoomStoreState {
  room: Room | null;
  chatters: Chatter[];
  setRoom: (room: Room) => void;
  setChatters: (chatters: Chatter[]) => void;
}

const useRoomStore = create<RoomStoreState>((set) => ({
  room: null,
  chatters: [],
  setRoom: (room: Room) => set({ room }),
  setChatters: (chatters: Chatter[]) => set({ chatters }),
}));
export default useRoomStore;
