import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { dvdService } from '../../services/dvdService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const DVDForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [dvd, setDvd] = useState({
    titulo: '',
    autor: '',
    director: '',
    genero: 'Sin clasificar',
    duracion: 0,
    anoPublicacion: new Date().getFullYear()
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadDVD();
    } else {
      // Cargar template para valores por defecto
      loadTemplate();
    }
  }, [id, isEditing]);

  const loadDVD = async () => {
    try {
      setLoading(true);
      const response = await dvdService.getById(id);
      setDvd(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar el DVD');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = async () => {
    try {
      const response = await dvdService.getTemplate();
      setDvd(prevDvd => ({
        ...prevDvd,
        ...response.data
      }));
    } catch (err) {
      console.error('Error al cargar template:', err);
      // No es crítico, mantener valores por defecto
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDvd({
      ...dvd,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!dvd.titulo.trim()) {
      setError('El título es requerido');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await dvdService.update(id, dvd);
      } else {
        await dvdService.create(dvd);
      }
      
      navigate('/dvds');
    } catch (err) {
      setError('Error al guardar el DVD');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <LoadingSpinner message="Cargando DVD..." />;
  }

  return (
    <div className="container mt-4">
      <h1>{isEditing ? 'Editar DVD' : 'Nuevo DVD'}</h1>

      <div className="mb-3">
        <Link to="/dvds" className="btn btn-secondary">
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
                value={dvd.titulo}
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
                value={dvd.autor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="director" className="form-label">Director</label>
              <input
                type="text"
                className="form-control"
                id="director"
                name="director"
                value={dvd.director}
                onChange={handleInputChange}
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
                value={dvd.genero}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="duracion" className="form-label">Duración (minutos)</label>
              <input
                type="number"
                className="form-control"
                id="duracion"
                name="duracion"
                value={dvd.duracion}
                onChange={handleInputChange}
                min="1"
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
                value={dvd.anoPublicacion}
                onChange={handleInputChange}
                min="1900"
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

export default DVDForm;