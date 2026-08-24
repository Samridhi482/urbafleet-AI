import React, { useEffect, useState } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { chatService } from '../services/chatService';
import { ChatMessage } from '../types/chat';

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    chatService.getInitialMessages().then(setMessages);
  }, []);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    setTimeout(async () => {
      const reply = await chatService.sendMessage(text);
      setMessages((prev) => [...prev, reply]);
      setIsSending(false);
    }, 400);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Mobility Assistant"
        description="Natural language queries for defect statistics, dynamic crew dispatch suggestions, and safety insights."
        breadcrumbs={[{ label: 'AI Assistant' }]}
        badge={
          <Badge variant="info" className="font-mono text-[10px]">
            Phase 1 Sandbox Mode
          </Badge>
        }
      />

      <Card variant="elevated" className="flex flex-col h-[600px]">
        <CardHeader className="border-b border-slate-800 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Bot className="h-4 w-4" />
              </div>
              <CardTitle className="text-sm">UrbanFleet AI Dispatch & Intelligence Copilot</CardTitle>
            </div>
            <Badge variant="secondary" className="text-[10px] font-mono">
              Ready for Phase 4 AI Pipeline
            </Badge>
          </div>
        </CardHeader>

        {/* Chat History */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 mt-0.5">
                  <Bot className="h-3.5 w-3.5" />
                </div>
              )}

              <div
                className={`max-w-xl rounded-xl p-3.5 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-bl-none'
                }`}
              >
                <p>{msg.content}</p>

                {msg.suggestedPrompts && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                      Suggested Queries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedPrompts.map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSend(prompt)}
                          className="text-[11px] bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white px-2 py-1 rounded border border-slate-700 transition-colors text-left cursor-pointer"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-300 border border-slate-700 mt-0.5">
                  <User className="h-3.5 w-3.5" />
                </div>
              )}
            </div>
          ))}

          {isSending && (
            <div className="flex gap-2 items-center text-xs text-slate-400">
              <Bot className="h-4 w-4 text-blue-400 animate-pulse" />
              <span>Analyzing telemetry context...</span>
            </div>
          )}
        </CardContent>

        {/* Input Bar */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about road defects, traffic corridors, or crew dispatches..."
            className="flex-1"
          />
          <Button
            variant="primary"
            size="md"
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isSending}
            className="gap-1.5"
          >
            <Send className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Send</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
