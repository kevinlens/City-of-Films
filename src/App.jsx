import { Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header';
import Hero from './components/Layout/Hero';
import Carousels from './components/Layout/Carousels';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import SearchResults from './pages/SearchResults';
function App() {
  return (
    <div>
      <ScrollToTop>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header />
                <Hero />
                <Carousels />
                <Footer />
              </>
            }
          />
          <Route
            path='/dashboard'
            element={
              <>
                <Header />
                <Dashboard />
                <Footer />
              </>
            }
          />
          <Route
            path='/details'
            element={
              <>
                <Header />
                <Details />
                <Footer />
              </>
            }
          />
          <Route
            path='/searchresults'
            element={
              <>
                <Header />
                <SearchResults />
                <Footer />
              </>
            }
          />
          <Route
            path='*'
            element={
              <>
                <Header />
                <NotFound />
                <Footer />
              </>
            }
          />
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
