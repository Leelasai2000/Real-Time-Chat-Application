import React, { createContext, useEffect, useState, useContext } from 'react';
import { io } from 'socket.io-client';

// Create the context
export const SocketContext = createContext();

// Custom hook to use the socket easily
export const useSocket = () => useContext(SocketContext);

// The provider component
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5001"); // Make sure the port is correct

newSocket.on('connect', () => {
  console.log('✅ Socket connected:', newSocket.id);
});


    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    newSocket.on('connect_error', (err) => {
      console.log('Socket connection error:', err);
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
