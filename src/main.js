import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom';
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
const router = createHashRouter(createRoutesFromElements(_jsxs(_Fragment, { children: [_jsx(Route, { path: "/summary", element: _jsx(Summary, {}) }), _jsx(Route, { path: "/settings", element: _jsx(Settings, {}) }), _jsx(Route, { path: "/manual", element: _jsx(Manual, {}) }), _jsx(Route, { path: "/new-report", element: _jsx(NewReport, {}) }), _jsx(Route, { path: "/pdf-summary", element: _jsx(PdfSummary, {}) }), _jsx(Route, { path: "/api-summary", element: _jsx(ApiSummary, {}) }), _jsx(Route, { path: "/", element: _jsx(App, {}) })] })));
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(RouterProvider, { router: router }) }) }));
// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');
// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message);
});