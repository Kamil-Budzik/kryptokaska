import { useEffect, useState } from 'react';
// components
import ListDisplay from '../components/Settings/ListDisplay';
import SettingsForm from '../components/Settings/SettingsForm';
import Wrapper from '../components/UI/Wrapper';
import styled from '@emotion/styled';

export interface Crypto {
  shortName: string;
  fullName: string;
}

const StyledSection = styled.section`
  header {
    margin: 24px 0;
  }
`;

function Settings() {
  const [items, setItems] = useState<Crypto[]>();

  useEffect(() => {
    window.ipcRenderer.send('load-settings');
    window.ipcRenderer.on('settings-loaded', (_event, arg) => {
      if (!arg?.avaibleCryptos) return;
      setItems(arg?.avaibleCryptos);
    });
  }, []);

  const handleAddition = (shortName: string, fullName: string) => {
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
      <SettingsForm handleAddition={handleAddition} />
      {items?.length ? (
        <StyledSection>
          <header>Twoje kryptowaluty</header>
          <ListDisplay items={items} handleDelete={handleDelete} />
        </StyledSection>
      ) : (
        <p>No values provided</p>
      )}
    </Wrapper>
  );
}

export default Settings;
