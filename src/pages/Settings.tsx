import { useEffect, useState } from 'react';
// components
import ListDisplay from '../components/Settings/ListDisplay';
import SettingsForm from '../components/Settings/SettingsForm';
import Wrapper from '../components/UI/Wrapper';
import { StyledSection, StyledInnerWrapper } from './Settings.styles.ts';
import FolderSelector from '../components/Settings/FolderSelector';

export interface Crypto {
  shortName: string;
  fullName: string;
}

function Settings() {
  const [items, setItems] = useState<Crypto[]>([]);
  const [logPath, setLogPath] = useState('');

  useEffect(() => {
    window.ipcRenderer.send('load-settings');
    window.ipcRenderer.on('settings-loaded', (_event, arg) => {
      console.log(arg?.availableCryptos);
      if (arg?.availableCryptos) setItems(arg?.availableCryptos);
      if (arg?.logPath) setLogPath(arg?.logPath);
    });
  }, []);

  const handleAddition = (shortName: string, fullName: string) => {
    console.log(items);
    setItems((prev) => [...prev!, { shortName, fullName }]);
    window.ipcRenderer.send('add-new-crypto', {
      id: shortName,
      shortName: shortName,
      fullName: fullName,
    });
  };

  const handleDelete = (shortName: string) => {
    setItems((prev) => prev?.filter((item) => item.shortName !== shortName));
    window.ipcRenderer.send('remove-available-crypto', shortName);
  };

  return (
    <Wrapper>
      <StyledInnerWrapper>
        <FolderSelector logPath={logPath} setLogPath={setLogPath} />
        <SettingsForm handleAddition={handleAddition} />
        {items?.length ? (
          <StyledSection>
            <header>Twoje kryptowaluty</header>
            <ListDisplay items={items} handleDelete={handleDelete} />
          </StyledSection>
        ) : (
          <p>No values provided</p>
        )}
      </StyledInnerWrapper>
    </Wrapper>
  );
}

export default Settings;
