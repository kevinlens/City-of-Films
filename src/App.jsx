import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header';
import Hero from './components/Layout/Hero';
import Carousels from './components/Layout/Carousels';
import Footer from './components/Layout/Footer';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import DetailsTVShows from './pages/DetailsTVShows';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import SearchResults from './pages/SearchResults';
import CastInfo from './pages/CastInfo';
import SignIn from './pages/SignIn';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

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
            path='/signin'
            element={
              <>
                <Header modifiedHeader={true} />
                <SignIn />
                <Footer />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <Header modifiedHeader={true} />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path='/settings'
            element={
              <>
                <Header modifiedHeader={true} />
                <Settings />
                <Footer />
              </>
            }
          />
          <Route
            path='/dashboard'
            element={
              <>
                <Header modifiedHeader={true}/>
                <Dashboard />
                <Footer />
              </>
            }
          />
          <Route
            path='/details/movies/:id'
            element={
              <>
                <Header modifiedHeader={true}/>
                <Details />
                <Footer />
              </>
            }
          />
          <Route
            path='/details/tvShows/:id'
            element={
              <>
                <Header modifiedHeader={true}/>
                <DetailsTVShows />
                <Footer />
              </>
            }
          />
          <Route
            path='/cast/:id'
            element={
              <>
                <Header modifiedHeader={true}/>
                <CastInfo />
                <Footer />
              </>
            }
          />
          <Route
            path='/searchresults/:userSearchValue'
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
