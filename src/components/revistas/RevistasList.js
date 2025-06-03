import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { revistaService } from '../../services/revistaService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const RevistasList = () => {
  const [revistas, setRevistas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    categoria: '',
    editorial: '',
    autor: ''
  });

  useEffect(() => {
    loadRevistas();
  }, []);

  const loadRevistas = async () => {
    try {
      setLoading(true);
      const response = await revistaService.getAll();
      setRevistas(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar las revistas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta revista?')) {
      try {
        await revistaService.delete(id);
        setRevistas(revistas.filter(revista => revista.id !== id));
      } catch (err) {
        setError('Error al eliminar la revista');
        console.error(err);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await revistaService.search(searchParams);
      setRevistas(response.data);
      setError('');
    } catch (err) {
      setError('Error en la búsqueda');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <LoadingSpinner message="Cargando revistas..." />;

  return (
    <div className="container mt-4">
      <h1>Listado de Revistas</h1>

      <div className="mb-3">
        <Link to="/" className="btn btn-secondary me-2">
          Volver al Inicio
        </Link>
        <Link to="/revistas/nuevo" className="btn btn-primary">
          Nueva Revista
        </Link>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />

      {/* Formulario de búsqueda */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Búsqueda</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch} className="row g-3">
            <div className="col-md-4">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="categoria"
                name="categoria"
                value={searchParams.categoria}
                onChange={handleInputChange}
                placeholder="Buscar por categoría"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="editorial" className="form-label">Editorial</label>
              <input
                type="text"
                className="form-control"
                id="editorial"
                name="editorial"
                value={searchParams.editorial}
                onChange={handleInputChange}
                placeholder="Buscar por editorial"
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="autor" className="form-label">Autor</label>
              <input
                type="text"
                className="form-control"
                id="autor"
                name="autor"
                value={searchParams.autor}
                onChange={handleInputChange}
                placeholder="Buscar por autor"
              />
            </div>
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tabla de revistas */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th>
              <th>Número</th>
              <th>Editorial</th>
              <th>Año Publicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {revistas.length > 0 ? (
              revistas.map((revista) => (
                <tr key={revista.id}>
                  <td>{revista.id}</td>
                  <td>{revista.titulo}</td>
                  <td>{revista.autor}</td>
                  <td>{revista.categoria}</td>
                  <td>{revista.numero}</td>
                  <td>{revista.editorial}</td>
                  <td>{revista.anoPublicacion}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/revistas/editar/${revista.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(revista.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay revistas disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevistasList;