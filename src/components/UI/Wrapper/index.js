import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
// components
import { Button } from '@mui/material';
import { Container } from '@mui/system';
function Wrapper({ children }) {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };
    return (_jsxs(Container, { children: [_jsx("nav", { children: _jsx(Button, { onClick: handleGoBack, sx: { displayPrint: "none" }, variant: "outlined", children: "Return" }) }), children] }));
}
export default Wrapper;
