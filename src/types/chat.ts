export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatAttachment {
  id: string;
  type: 'pothole_card' | 'traffic_corridor' | 'constituency_summary' | 'route_recommendation' | 'work_order';
  title: string;
  metadata: Record<string, string | number | boolean>;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
  suggestedPrompts?: string[];
  isPlaceholderResponse?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  lastMessageAt: string;
  messageCount: number;
}
