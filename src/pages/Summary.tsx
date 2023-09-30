import { useSelector } from 'react-redux';
import { RootState } from '../store';

function Summary() {
  const state = useSelector((state: RootState) => state.newReport);
  return (
    <>
      <header>
        <h1>Summary</h1>
        {JSON.stringify(state)}
      </header>
    </>
  );
}

export default Summary;
