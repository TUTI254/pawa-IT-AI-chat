"use client"

import { useState } from 'react';
import { SendIcon, RotateCw, Trash2, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ChatMessage } from '@/components/chat-message';
import { QueryHistory } from '@/components/query-history';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export function QAInterface() {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const { toast } = useToast();
  
  const generateId = () => Math.random().toString(36).substring(2, 10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    const userMessage = {
      id: generateId(),
      role: 'user' as const,
      content: question,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response from AI');
      }
      
      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content: data.answer ?? "No response received. Please try again.",
        },
      ]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const clearChat = () => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "Your conversation has been cleared.",
    });
  };

  const toggleHistory = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  return (
    <div className="relative flex min-h-[calc(100vh-200px)]">
      <div className={cn(
        "flex-1 transition-all duration-300",
        isHistoryOpen ? "mr-0 md:mr-[320px]" : "mr-0"
      )}>
        <Card className="h-full p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Conversation</h2>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear Chat</span>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleHistory}
                className="flex items-center gap-1"
              >
                {isHistoryOpen ? (
                  <PanelRightClose className="h-4 w-4" />
                ) : (
                  <PanelRightOpen className="h-4 w-4" />
                )}
                <span className="hidden sm:inline">History</span>
              </Button>
            </div>
          </div>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 mb-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <SendIcon className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">Start a conversation</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                    Ask any question and get an accurate AI-generated response.
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))
              )}
              
              {isLoading && (
                <div className="flex items-center justify-center space-x-2 py-4">
                  <RotateCw className="h-4 w-4 animate-spin" />
                  <p className="text-sm text-muted-foreground">Generating response...</p>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="relative">
              <Textarea
                placeholder="Ask a question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className={cn(
                  "resize-none p-4 pr-12 focus-visible:ring-1 focus-visible:ring-offset-0",
                  "h-20 transition-all duration-200 ease-in-out",
                  "scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent"
                )}
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !question.trim()}
                className="absolute right-2 bottom-2"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>

      <AnimatePresence>
        {isHistoryOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className={cn(
              "fixed right-0 top-0 bottom-0 w-full md:w-[320px] h-full z-50",
              "bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none"
            )}
          >
            <QueryHistory 
              messages={messages} 
              onClose={() => setIsHistoryOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}