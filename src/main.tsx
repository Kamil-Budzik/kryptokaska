import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
// pages
import App from './App.tsx';
import Summary from './pages/Summary.tsx';
import Settings from './pages/Settings.tsx';
import Manual from './pages/Manual.tsx';
import NewReport from './pages/NewReport.tsx';
import PdfSummary from './pages/PdfSummary.tsx';
import ApiSummary from './pages/ApiSummary.tsx';
// styles
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/summary" element={<Summary />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/manual" element={<Manual />} />
      <Route path="/new-report" element={<NewReport />} />
      <Route path="/pdf-summary" element={<PdfSummary />} />
      <Route path="/api-summary" element={<ApiSummary />} />
      <Route path="/" element={<PdfSummary />} />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
