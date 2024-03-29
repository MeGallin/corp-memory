import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import HomeView from './views/homeView/HomeView';
import AboutView from './views/aboutView/AboutView';
import ContactView from './views/contactView/ContactView';
import FormsView from './views/formsView/FormsView';
import UserDashboardView from './views/userDashboardView/UserDashboardView';
import AdminView from './views/adminView/AdminView';
import ErrorView from './views/errorView/ErrorView';
import ResetPasswordView from './views/resetPasswordView/ResetPasswordView';

function App() {
  return (
    <Router>
      <div className="container--fluid">
        <Header />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<HomeView />} exact />
            <Route path="/admin" element={<AdminView />} exact />
            <Route path="/about" element={<AboutView />} exact />
            <Route path="/contact" element={<ContactView />} exact />
            <Route path="/forms" element={<FormsView />} exact />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordView />}
            />
            <Route
              path="/user-dashboard"
              element={<UserDashboardView />}
              exact
            />
            <Route path="*" element={<ErrorView />} exact />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
