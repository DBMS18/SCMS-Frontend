import './App.css';
import Contact from './pages/Contact';
import Store from './pages/Store';
import Header from './components/Header/Header'
import { ChakraProvider } from '@chakra-ui/react';
import customTheme from './utils/theme';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <div className="App">
          <Header />
          <Contact />
          <Store />
        </div>
      </ChakraProvider>
    </BrowserRouter>
    
  );
}

export default App;
