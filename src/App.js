import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import Main from './pages/Main';
import customTheme from './utils/theme';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <div className="App">
          <Main />
        </div>
      </ChakraProvider>
    </BrowserRouter>
    
  );
}

export default App;
