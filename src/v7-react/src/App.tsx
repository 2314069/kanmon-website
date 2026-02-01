import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import TopPage from './pages/TopPage';
import ProgramPage from './pages/ProgramPage';
import ClassroomPage from './pages/ClassroomPage';
import InfoPage from './pages/InfoPage';
import EdistPage from './pages/EdistPage';
import InterbookingPage from './pages/InterbookingPage';
import ApplyPage from './pages/ApplyPage';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/program" element={<ProgramPage />} />
        <Route path="/classroom" element={<ClassroomPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/edist" element={<EdistPage />} />
        <Route path="/interbooking" element={<InterbookingPage />} />
        <Route path="/apply" element={<ApplyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
