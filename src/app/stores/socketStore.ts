import { create } from 'zustand';
import { Socket } from 'socket.io-client';

interface SocketStoreState {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

const useSocketStore = create<SocketStoreState>((set) => ({
  socket: null,
  setSocket: (socket: Socket | null) => set({ socket }),
}));

export default useSocketStore;
