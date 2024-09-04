import { create } from 'zustand';
import { Room } from '@/shared/types/type';

interface RoomStoreState {
  room: Room | null;
  setRoom: (room: Room) => void;
}

const useRoomStore = create<RoomStoreState>((set) => ({
  room: null,
  setRoom: (room: Room) => set({ room }),
}));
export default useRoomStore;
