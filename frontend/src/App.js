import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomeView from './views/homeView/HomeView';
import AboutView from './views/aboutView/AboutView';
import ContactView from './views/contactView/ContactView';
import FormsView from './views/formsView/FormsView';

function App() {
  return (
    <Router>
      <div className="container--fluid">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomeView />} exact />
            <Route path="/about" element={<AboutView />} exact />
            <Route path="/contact" element={<ContactView />} exact />
            <Route path="/forms" element={<FormsView />} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
