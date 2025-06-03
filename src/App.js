import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Páginas
import Home from './pages/Home';
import LibrosPage from './pages/LibrosPage';
import RevistasPage from './pages/RevistasPage';
import DVDsPage from './pages/DVDsPage';

// Componentes de formularios
import LibroForm from './components/libros/LibroForm';
import RevistaForm from './components/revistas/RevistaForm';
import DVDForm from './components/dvds/DVDForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Página principal */}
          <Route path="/" element={<Home />} />
          
          {/* Rutas de Libros */}
          <Route path="/libros" element={<LibrosPage />} />
          <Route path="/libros/nuevo" element={<LibroForm />} />
          <Route path="/libros/editar/:id" element={<LibroForm />} />
          
          {/* Rutas de Revistas */}
          <Route path="/revistas" element={<RevistasPage />} />
          <Route path="/revistas/nuevo" element={<RevistaForm />} />
          <Route path="/revistas/editar/:id" element={<RevistaForm />} />
          
          {/* Rutas de DVDs */}
          <Route path="/dvds" element={<DVDsPage />} />
          <Route path="/dvds/nuevo" element={<DVDForm />} />
          <Route path="/dvds/editar/:id" element={<DVDForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;