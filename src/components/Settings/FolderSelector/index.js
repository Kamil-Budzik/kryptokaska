import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Tooltip } from '@mui/material';
import { StyledDivContainer, StyledFlexContainer } from './styles.ts';
import EditIcon from '@mui/icons-material/Edit';
const ListDisplay = ({ logPath, setLogPath, }) => {
    const handleSelectFolder = () => {
        window.ipcRenderer.send('select-folder');
        window.ipcRenderer.on('folder-selected', (_event, arg) => {
            setLogPath(arg);
            window.ipcRenderer.send('update-log-path', arg);
        });
    };
    return (_jsxs(StyledFlexContainer, { children: [_jsx(Input, { value: logPath, disabled: true, readOnly: true, fullWidth: true }), _jsx(Tooltip, { title: "Edytuj sciezke", children: _jsx(StyledDivContainer, { onClick: handleSelectFolder, children: _jsx(EditIcon, {}) }) })] }));
};
export default ListDisplay;
