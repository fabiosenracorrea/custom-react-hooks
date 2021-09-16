import styled from 'styled-components';

const ContainerPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

function App(): JSX.Element {
  return (
    <ContainerPlaceholder>
      <h3>APP to be updated to demonstrate each hook</h3>
    </ContainerPlaceholder>
  );
}

export default App;
