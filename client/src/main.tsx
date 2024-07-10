import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { persistor, store } from './redux/store.ts'
import { Provider } from 'react-redux'
import './index.css'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider.tsx'
import App from './App.tsx'
import Signup from './pages/Signup.tsx'
import Singin from './pages/Signin.tsx'
import RouterRedirector from './components/RouteRedirector.tsx'
import Toggle from './components/toggle.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RouterRedirector/>,
    children: [
      {
        path: '/',
        element: <App/>
      }
    ]
  },
  {
    path:'/toggle',
    element: <Toggle/>
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
