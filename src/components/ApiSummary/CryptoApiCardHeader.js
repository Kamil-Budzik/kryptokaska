import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Typography } from '@mui/material';
function CryptoApiCardHeader(props) {
    return (_jsxs(Grid, { container: true, justifyContent: "center", spacing: 2, alignItems: "center", children: [_jsx(Grid, { xs: 4, children: _jsxs(Typography, { component: "h5", children: [`Nazwa kryptoaktywa: `, _jsx("span", { style: { fontWeight: 'bold' }, children: `${props.crypto.fullName} (${props.crypto.shortName})` })] }) }), _jsx(Grid, { xs: 4, children: _jsxs(Typography, { component: "h5", children: [`Ilość: `, _jsx("span", { style: { fontWeight: 'bold' }, children: `${props.amount}` })] }) }), _jsx(Grid, { xs: 4, children: _jsxs(Typography, { component: "h5", children: [`Data: `, _jsx("span", { style: { fontWeight: 'bold' }, children: `${props.dateAndTime}` })] }) })] }));
}
export default CryptoApiCardHeader;
