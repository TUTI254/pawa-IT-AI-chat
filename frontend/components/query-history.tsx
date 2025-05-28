"use client"

import { Message } from '@/components/qa-interface';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { History, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QueryHistoryProps {
  messages: Message[];
  onClose?: () => void;
}

export function QueryHistory({ messages, onClose }: QueryHistoryProps) {
  const userQueries = messages.filter(msg => msg.role === 'user');
  
  return (
    <Card className="h-full rounded-l-lg rounded-r-none border-r-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <History className="h-5 w-5" />
            Query History
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close history</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-280px)] px-4 pb-4">
          {userQueries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <p className="text-sm text-muted-foreground">No queries yet</p>
              <p className="text-xs text-muted-foreground mt-1">
                Your questions will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {userQueries.map((query, index) => (
                <div key={query.id} className="space-y-2">
                  {index > 0 && <Separator />}
                  <p className="text-sm line-clamp-2 pt-2">
                    {query.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}