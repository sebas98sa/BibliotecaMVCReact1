import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { libroService } from '../../services/libroService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const LibrosList = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    titulo: '',
    autor: ''
  });

  useEffect(() => {
    loadLibros();
  }, []);

  const loadLibros = async () => {
    try {
      setLoading(true);
      const response = await libroService.getAll();
      setLibros(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar los libros');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este libro?')) {
      try {
        await libroService.delete(id);
        setLibros(libros.filter(libro => libro.id !== id));
      } catch (err) {
        setError('Error al eliminar el libro');
        console.error(err);
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await libroService.search(searchParams);
      setLibros(response.data);
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

  if (loading) return <LoadingSpinner message="Cargando libros..." />;

  return (
    <div className="container mt-4">
      <h1>Listado de Libros</h1>

      <div className="mb-3">
        <Link to="/" className="btn btn-secondary me-2">
          Volver al Inicio
        </Link>
        <Link to="/libros/nuevo" className="btn btn-primary">
          Nuevo Libro
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
            <div className="col-md-5">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={searchParams.titulo}
                onChange={handleInputChange}
                placeholder="Buscar por título"
              />
            </div>
            <div className="col-md-5">
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
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Tabla de libros */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Páginas</th>
              <th>Año Publicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.length > 0 ? (
              libros.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.id}</td>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor}</td>
                  <td>{libro.isbn}</td>
                  <td>{libro.numeroPaginas}</td>
                  <td>{libro.anoPublicacion}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link
                        to={`/libros/editar/${libro.id}`}
                        className="btn btn-warning btn-sm"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(libro.id)}
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
                <td colSpan="7" className="text-center">
                  No hay libros disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LibrosList;