import { mockInitialChatMessages } from '../data/mockChat';
import { ChatMessage } from '../types/chat';

export const chatService = {
  async getInitialMessages(): Promise<ChatMessage[]> {
    return [...mockInitialChatMessages];
  },

  async sendMessage(userText: string): Promise<ChatMessage> {
    // Phase 1: Local structured placeholder assistant reply
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: `[Phase 1 Demo Mode] Received query: "${userText}". In Phase 2, this will interface with the UrbanFleet AI multi-modal road intelligence engine to analyze geo-spatial metrics, dispatch work orders, or compute optimal safe routing paths.`,
      timestamp: new Date().toISOString(),
      isPlaceholderResponse: true,
    };
  },
};
