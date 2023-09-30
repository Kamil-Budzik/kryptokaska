import { Input, Tooltip } from '@mui/material';
import { StyledDivContainer, StyledFlexContainer } from './styles.ts';
import EditIcon from '@mui/icons-material/Edit';

const ListDisplay = ({
  logPath,
  setLogPath,
}: {
  logPath: string;
  setLogPath: (v: string) => void;
}) => {
  const handleSelectFolder = () => {
    window.ipcRenderer.send('select-folder');
    window.ipcRenderer.on('folder-selected', (_event, arg) => {
      setLogPath(arg);
      window.ipcRenderer.send('update-log-path', arg);
    });
  };
  return (
    <StyledFlexContainer>
      <Input value={logPath} disabled readOnly fullWidth />
      <Tooltip title="Edytuj sciezke">
        <StyledDivContainer onClick={handleSelectFolder}>
          <EditIcon />
        </StyledDivContainer>
      </Tooltip>
    </StyledFlexContainer>
  );
};

export default ListDisplay;
