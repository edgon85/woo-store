'use client';
import { useEffect } from 'react';

type Props = {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
};

export const AlertComponent = ({ message, onDismiss, type }: Props) => {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      className={`fixed top-8 right-4 text-white p-4 rounded shadow-lg z-50 ${bgColor}`}
    >
      {message}
    </div>
  );
};
