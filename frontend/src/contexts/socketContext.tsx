import { createContext, useContext, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import io from "socket.io-client";

const SocketContext = createContext();

export default function SocketProvider() {
    const [socket, setSocket] = createStore( {
        socket: null as unknown
    });

    onMount(async () => {
        const socket = io(import.meta.env.VITE_COMMSERVICE);
        
        socket.on("fileReceived", (data) => {
        });
    });

    const startSocket = () => {
    };
}