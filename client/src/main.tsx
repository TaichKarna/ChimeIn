import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.tsx'
import WelcomePage from './pages/WelcomePage.tsx'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Singin from './pages/Signin.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage/>
  },
  {
    path:'/toggle',
    element: <App/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    path: '/signin',
    element: <Singin/>
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider>
            <RouterProvider router={router}>
            </RouterProvider>
          </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
