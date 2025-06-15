import { useEffect, useRef, useState, useCallback } from "react";

export const useSocket = (url: string) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<Event | null>(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;
        const ws = new WebSocket(url);

        ws.onopen = () => {
            if (!mountedRef.current) return;
            setIsConnected(true);
            setSocket(ws);
        };

        ws.onclose = () => {
            if (!mountedRef.current) return;
            setIsConnected(false);
            setSocket(null);
        };

        ws.onerror = (e) => {
            if (!mountedRef.current) return;
            setError(e);
        };

        return () => {
            mountedRef.current = false;
            ws.close();
        };
    }, [url]);

    const send = useCallback(
        (data: string) => {
            if (socket && isConnected) socket.send(data);
        },
        [socket, isConnected]
    );

    return { socket, isConnected, error, send };
};