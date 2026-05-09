import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SelectionProvider } from './context/SelectionContext';
import GlobalStyles from './styles/GlobalStyles';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PetDetail from './pages/PetDetail';
import About from './pages/About';

/**
 * App — Root component.
 *
 * The SelectionProvider wraps the Router so that selection state
 * persists across all route transitions. GlobalStyles inject the
 * CSS variables and reset styles used throughout the app.
 */
export default function App() {
  return (
    <SelectionProvider>
      <Router>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </SelectionProvider>
  );
}
