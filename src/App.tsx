import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <Provider store={ store }>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <AppRouter />
          </QueryClientProvider>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
