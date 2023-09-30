import { useState } from 'react';
// components
import ListDisplay from '../components/Settings/ListDisplay';
import SettingsForm from '../components/Settings/SettingsForm';
import Wrapper from '../components/UI/Wrapper';
import styled from '@emotion/styled';

export interface Crypto {
  shortName: string;
  longName: string;
}

const StyledSection = styled.section`
  header {
    margin: 24px 0;
  }
`;

function Settings() {
  const [items, setItems] = useState<Crypto[]>([
    { shortName: 'BT', longName: 'Bitcoin' },
    { shortName: 'ET', longName: 'Ethereum' },
  ]);

  const handleAddition = (shortName: string, longName: string) => {
    setItems((prev) => [...prev, { shortName, longName }]);
  };

  const handleDelete = (shortName: string) => {
    setItems((prev) => prev.filter((item) => item.shortName !== shortName));
  };

  return (
    <Wrapper>
      <SettingsForm handleAddition={handleAddition} />
      {items.length ? (
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
