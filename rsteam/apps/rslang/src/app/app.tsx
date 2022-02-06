// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import {BrowserRouter} from 'react-router-dom';
import Navbar from '../components/UI/navbar/Navbar';
import AppRouter from '../components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
