import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Usage from './pages/Usage';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import SystemHealth from './pages/SystemHealth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'analytics',
        element: <Analytics />,
      },
      {
        path: 'usage',
        element: <Usage />,
      },
      {
        path: 'alerts',
        element: <Alerts />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'system-health',
        element: <SystemHealth />,
      },
    ],
  },
]);
