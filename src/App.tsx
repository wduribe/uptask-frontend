import { ToastContainer } from 'react-toastify';
import { AppRouter } from './router/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
export const App = () => {

  return (

    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          pauseOnFocusLoss={false}
          pauseOnHover={false}
        />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </BrowserRouter >

  );
}


