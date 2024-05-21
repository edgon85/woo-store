'use server';
import { Manager } from 'socket.io-client';

export const connectToServer = async (onConnectionStatusChange: (status: string) => void) => {
  const manager = new Manager('http://localhost:5000/socket.io/socket.io.js');

  const socket = manager.socket('/');

  socket.on('connect', async () => {
      console.log('Connected to server');
      onConnectionStatusChange('connected');
  });

  socket.on('disconnect', () => {
      console.log('Disconnected from server');
      onConnectionStatusChange('disconnected');
  });
};
