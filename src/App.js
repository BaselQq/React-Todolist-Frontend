import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Login from './Login';

function App() {
  return (
    <ChakraProvider>
      <Login/>
    </ChakraProvider>
  );
}

export default App;
