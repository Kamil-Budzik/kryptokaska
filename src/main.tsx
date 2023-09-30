import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createHashRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
// pages
import App from './App.tsx'
import Summary from "./pages/Summary.tsx";
import Settings from "./pages/Settings.tsx";
import Manual from "./pages/Manual.tsx";
import NewReport from "./pages/NewReport.tsx";
import PdfSummary from "./pages/PdfSummary.tsx";
import ApiSummary from "./pages/ApiSummary.tsx";
//styles
import './index.css'

const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="summary" element={<Summary />} />
        <Route path="settings" element={<Settings />} />
        <Route path="manual" element={<Manual />} />
        <Route path="new-report" element={<NewReport />} />
        <Route path="pdf-summary" element={<PdfSummary />} />
        <Route path="api-summary" element={<ApiSummary />} />
      </Route>
    )
  );



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
