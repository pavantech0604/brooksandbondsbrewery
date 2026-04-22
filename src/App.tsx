import { Routes, Route } from 'react-router-dom';
import { BreweryProvider } from './context/BreweryContext';
import Home from './pages/Home';
import AdminLayout from './pages/Admin/AdminLayout';
import Dashboard from './pages/Admin/Dashboard';
import MenuManager from './pages/Admin/MenuManager';
import ReservationManager from './pages/Admin/ReservationManager';

function App() {
  return (
    <BreweryProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Admin Portal Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="menu" element={<MenuManager />} />
          <Route path="reservations" element={<ReservationManager />} />
        </Route>
      </Routes>
    </BreweryProvider>
  );
}

export default App;

