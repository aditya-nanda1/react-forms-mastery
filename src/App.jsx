import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import PizzaOrder from './components/PizzaOrder';
import './styles/index.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '95%',
      maxWidth: '1200px',
      padding: '0.75rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 1000,
      borderRadius: '1rem'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>🍕</span>
          <h1 style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            background: 'linear-gradient(to right, var(--primary), var(--secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0
          }}>
            Mario's Pizza
          </h1>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/">
          <button className={`btn ${location.pathname === '/' ? 'btn-primary' : ''}`} style={{
            background: location.pathname === '/' ? '' : 'transparent',
            color: location.pathname === '/' ? 'white' : 'var(--text-muted)'
          }}>
            Order Now
          </button>
        </Link>
        <Link to="/register">
          <button className={`btn ${location.pathname === '/register' ? 'btn-primary' : ''}`} style={{
            background: location.pathname === '/register' ? '' : 'transparent',
            color: location.pathname === '/register' ? 'white' : 'var(--text-muted)'
          }}>
            Register
          </button>
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />

        <main className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
          <Routes>
            <Route path="/" element={<PizzaOrder />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
