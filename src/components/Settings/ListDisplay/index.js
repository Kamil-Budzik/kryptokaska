import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Input } from '@mui/material';
const ListDisplay = ({ items, handleDelete, }) => {
    return (_jsx("ul", { children: items.map((item) => (_jsxs("li", { children: [_jsx(Input, { value: item.shortName, disabled: true, readOnly: true }), _jsx(Input, { value: item.fullName, disabled: true, readOnly: true }), _jsx(Button, { onClick: () => handleDelete(item.shortName), children: "X" })] }, item.shortName))) }));
};
export default ListDisplay;
