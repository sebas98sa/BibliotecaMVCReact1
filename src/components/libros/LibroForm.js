import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { libroService } from '../../services/libroService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const LibroForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    isbn: '',
    numeroPaginas: '',
    genero: '',
    editorial: '',
    anoPublicacion: new Date().getFullYear()
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadLibro();
    }
  }, [id, isEditing]);

  const loadLibro = async () => {
    try {
      setLoading(true);
      const response = await libroService.getById(id);
      setLibro(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar el libro');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLibro({
      ...libro,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!libro.titulo.trim()) {
      setError('El título es requerido');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await libroService.update(id, libro);
      } else {
        await libroService.create(libro);
      }
      
      navigate('/libros');
    } catch (err) {
      setError('Error al guardar el libro');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <LoadingSpinner message="Cargando libro..." />;
  }

  return (
    <div className="container mt-4">
      <h1>{isEditing ? 'Editar Libro' : 'Nuevo Libro'}</h1>

      <div className="mb-3">
        <Link to="/libros" className="btn btn-secondary">
          Volver al Listado
        </Link>
      </div>

      <ErrorMessage message={error} onClose={() => setError('')} />

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">Título</label>
              <input
                type="text"
                className="form-control"
                id="titulo"
                name="titulo"
                value={libro.titulo}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="autor" className="form-label">Autor</label>
              <input
                type="text"
                className="form-control"
                id="autor"
                name="autor"
                value={libro.autor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="isbn" className="form-label">ISBN</label>
              <input
                type="text"
                className="form-control"
                id="isbn"
                name="isbn"
                value={libro.isbn}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="numeroPaginas" className="form-label">Número de Páginas</label>
              <input
                type="number"
                className="form-control"
                id="numeroPaginas"
                name="numeroPaginas"
                value={libro.numeroPaginas}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="genero" className="form-label">Género</label>
              <input
                type="text"
                className="form-control"
                id="genero"
                name="genero"
                value={libro.genero}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="editorial" className="form-label">Editorial</label>
              <input
                type="text"
                className="form-control"
                id="editorial"
                name="editorial"
                value={libro.editorial}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="anoPublicacion" className="form-label">Año de Publicación</label>
              <input
                type="number"
                className="form-control"
                id="anoPublicacion"
                name="anoPublicacion"
                value={libro.anoPublicacion}
                onChange={handleInputChange}
                min="1000"
                max="2100"
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LibroForm;