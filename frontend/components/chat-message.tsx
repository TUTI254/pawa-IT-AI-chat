"use client"

import { Message } from '@/components/qa-interface';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';


export function ChatMessage({ message }: { message: Message }) {
  const content = message.content ?? '';
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg",
      message.role === "assistant" ? "bg-accent/50" : "bg-card"
    )}>
      <div className="flex-shrink-0">
        {message.role === "user" ? (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center">
          <h3 className="text-sm font-medium">
            {message.role === "user" ? "You" : "AI Assistant"}
          </h3>
        </div>
        <div className="prose prose-sm dark:prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}