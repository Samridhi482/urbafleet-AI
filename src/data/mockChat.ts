import { ChatMessage } from '../types/chat';

export const mockInitialChatMessages: ChatMessage[] = [
  {
    id: 'msg-001',
    role: 'assistant',
    content: 'Hello Controller. UrbanFleet AI Assistant is ready. In future phases, you can query real-time road conditions, trigger automated dispatch workflows, summarize constituency road health, or calculate safe fleet routes.',
    timestamp: '2026-08-24T08:00:00Z',
    suggestedPrompts: [
      'Which constituency has the highest pothole density today?',
      'Show active critical incidents in North Metro District',
      'What is the safest freight route between Depot A and Central Station?',
      'Recommend crew allocation for pending emergency work orders',
    ],
    isPlaceholderResponse: true,
  },
];
