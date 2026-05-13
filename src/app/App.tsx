import { useState, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { InitialLoader } from './components/InitialLoader';

export default function App() {
  // Temporarily disabled initial loader for debugging
  // const [isInitialLoading, setIsInitialLoading] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsInitialLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);

  // if (isInitialLoading) {
  //   return <InitialLoader />;
  // }

  return <RouterProvider router={router} />;
}
