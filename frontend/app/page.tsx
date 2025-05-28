import { QAInterface } from '@/components/qa-interface';
import { ModeToggle } from '@/components/mode-toggle';

export default function Home() {
  return (
    <div className="min-h-screen bg-background px-4">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight">AI Q&A Assistant</h1>
          <ModeToggle />
        </div>
      </header>
      <main className="container py-6 md:py-12">
        <QAInterface />
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} AI Q&A Assistant. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}