import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dvdService } from '../../services/dvdService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const DVDsList = () => {
  const [dvds, setDvds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    genero: '',
    director: '',
    autor: ''
  });

  useEffect(() => {
    loadDVDs();
  }, []);

  const loadDVDs = async () => {
    try {
      setLoading(true);
      const response = await dvdService.getAll();
      setDvds(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar los DVDs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este DVD?')) {
      try {
        await dvdService.delete(id);
        setDvds(dvds.filter(dvd => dvd.id !== id));
      } catch (err) {
        setError('Error al eliminar el DVD');
        console.error(err);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await dvdService.search(searchParams);
      setDvds(response.data);
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

  if (loading) return <LoadingSpinner message="Cargando DVDs..." />;

  return (
    <div className="container mt-4">
      <h1>Listado de DVDs</h1>

      <div className="mb-3">
        <Link to="/" className="btn btn-secondary me-2">
          Volver al Inicio
        </Link>
        <Link to="/dvds/nuevo" className="btn btn-primary">
          Nuevo DVD
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
              <label htmlFor="genero" className="form-label">Género</label>
              <input
                type="text"
                className="form-control"
                id="genero"
                name="genero"
                value={searchParams.genero}
                onChange={handleInputChange}
                placeholder="Buscar por género"
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="director" className="form-label">Director</label>
              <input
                type="text"
                className="form-control"
                id="director"
                name="director"
                value={searchParams.director}
                onChange={handleInputChange}
                placeholder="Buscar por director"
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

      {/* Tabla de DVDs */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Director</th>
              <th>Género</th>
              <th>Duración (min)</th>
              <th>Año Publicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dvds.length > 0 ? (
              dvds.map((dvd) => (
                <tr key={dvd.id}>
                  <td>{dvd.id}</td>
                  <td>{dvd.titulo}</td>
                  <td>{dvd.autor}</td>
                  <td>{dvd.director}</td>
                  <td>{dvd.genero}</td>
                  <td>{dvd.duracion}</td>
                  <td>{dvd.anoPublicacion}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/dvds/editar/${dvd.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(dvd.id)}
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
                  No hay DVDs disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DVDsList;