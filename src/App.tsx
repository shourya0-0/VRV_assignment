import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Dashboard } from '@/pages/dashboard';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
      <main className="min-h-screen bg-background">
        <Dashboard />
      </main>
      <Toaster position="top-center" />
    </ThemeProvider>
  );
}

export default App;