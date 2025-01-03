import {create} from 'zustand'
import {Player} from "../types";

interface PlayerListState {
    playerList: Player[];
    setPlayerList: (newPlayerList: Player[]) => void;
}

export const usePlayerListStore = create<PlayerListState>((set) => ({
    playerList: [],
    setPlayerList: (newPlayerList) => {
        set(() => ({
            playerList: [...newPlayerList], // Correctly update the state here
        }));
    },
}))