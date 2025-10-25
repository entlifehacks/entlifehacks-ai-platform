
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';
import { ChatBox } from '@/components/ChatBox';

const Index: React.FC = () => {
  return (
    <AppProvider>
      <AppLayout />
      <ChatBox />
    </AppProvider>
  );
};

export default Index;

