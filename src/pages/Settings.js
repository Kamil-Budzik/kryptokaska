import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
// components
import ListDisplay from '../components/Settings/ListDisplay';
import SettingsForm from '../components/Settings/SettingsForm';
import Wrapper from '../components/UI/Wrapper';
import { StyledSection, StyledInnerWrapper } from './Settings.styles.ts';
import FolderSelector from '../components/Settings/FolderSelector';
function Settings() {
    const [items, setItems] = useState([]);
    const [logPath, setLogPath] = useState('');
    useEffect(() => {
        window.ipcRenderer.send('load-settings');
        window.ipcRenderer.on('settings-loaded', (_event, arg) => {
            console.log(arg?.availableCryptos);
            if (arg?.availableCryptos)
                setItems(arg?.availableCryptos);
            if (arg?.logPath)
                setLogPath(arg?.logPath);
        });
    }, []);
    const handleAddition = (shortName, fullName) => {
        console.log(items);
        setItems((prev) => [...prev, { shortName, fullName }]);
        window.ipcRenderer.send('add-new-crypto', {
            id: shortName,
            shortName: shortName,
            fullName: fullName,
        });
    };
    const handleDelete = (shortName) => {
        setItems((prev) => prev?.filter((item) => item.shortName !== shortName));
        window.ipcRenderer.send('remove-available-crypto', shortName);
    };
    return (_jsx(Wrapper, { children: _jsxs(StyledInnerWrapper, { children: [_jsx(FolderSelector, { logPath: logPath, setLogPath: setLogPath }), _jsx(SettingsForm, { handleAddition: handleAddition }), items?.length ? (_jsxs(StyledSection, { children: [_jsx("header", { children: "Twoje kryptowaluty" }), _jsx(ListDisplay, { items: items, handleDelete: handleDelete })] })) : (_jsx("p", { children: "No values provided" }))] }) }));
}
export default Settings;
