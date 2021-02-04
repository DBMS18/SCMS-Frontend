import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import Header from './components/Header/Header';
import customTheme from "./utils/theme";


function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <div className="App">
        <Header />
        <h1>asf</h1>
      </div>
    </ChakraProvider>
    
  );
}

export default App;
