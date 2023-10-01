import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink as Link } from 'react-router-dom';
// components
import { Button } from '@mui/material';
import Wrapper from './components/UI/Wrapper';
// styles
import './App.css';
function App() {
    return (_jsx(Wrapper, { children: _jsx("main", { children: _jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: "/settings", children: _jsx(Button, { children: "Settings" }) }) }), _jsx("li", { children: _jsx(Link, { to: "/new-report", children: _jsx(Button, { children: "New report" }) }) }), _jsx("li", { children: _jsx(Link, { to: "/api-summary", children: _jsx(Button, { children: "Api summary" }) }) })] }) }) }) }));
}
export default App;
