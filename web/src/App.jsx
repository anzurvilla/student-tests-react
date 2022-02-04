import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {ThemeProvider} from '@mui/material/styles';
import theme from './config/theme';
import About from './pages/About';
import Home from './pages/Home';
import ClassRoom1 from './pages/ClassRoom1';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
          <Route path="/about" exact element={<About />}></Route>
          <Route path="/classroom1" exact element={<ClassRoom1 />}></Route>
          <Route path="*" element={<Navigate to ="/" />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}