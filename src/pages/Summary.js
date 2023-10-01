import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from 'react-redux';
function Summary() {
    const state = useSelector((state) => state.newReport);
    return (_jsx(_Fragment, { children: _jsxs("header", { children: [_jsx("h1", { children: "Summary" }), JSON.stringify(state)] }) }));
}
export default Summary;
