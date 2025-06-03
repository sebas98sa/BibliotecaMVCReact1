import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { revistaService } from '../../services/revistaService';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorMessage from '../common/ErrorMessage';

const RevistaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [revista, setRevista] = useState({
    titulo: '',
    autor: '',
    categoria: 'General',
    numero: 1,
    editorial: '',
    anoPublicacion: new Date().getFullYear()
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadRevista();
    }
  }, [id, isEditing]);

  const loadRevista = async () => {
    try {
      setLoading(true);
      const response = await revistaService.getById(id);
      setRevista(response.data);
      setError('');
    } catch (err) {
      setError('Error al cargar la revista');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRevista({
      ...revista,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!revista.titulo.trim()) {
      setError('El título es requerido');
      return;
    }

    if (revista.numero <= 0) {
      setError('El número debe ser mayor a 0');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditing) {
        await revistaService.update(id, revista);
      } else {
        await revistaService.create(revista);
      }
      
      navigate('/revistas');
    } catch (err) {
      setError('Error al guardar la revista');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return <LoadingSpinner message="Cargando revista..." />;
  }

  return (
    <div className="container mt-4">
      <h1>{isEditing ? 'Editar Revista' : 'Nueva Revista'}</h1>

      <div className="mb-3">
        <Link to="/revistas" className="btn btn-secondary">
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
                value={revista.titulo}
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
                value={revista.autor}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoría</label>
              <input
                type="text"
                className="form-control"
                id="categoria"
                name="categoria"
                value={revista.categoria}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="numero" className="form-label">Número</label>
              <input
                type="number"
                className="form-control"
                id="numero"
                name="numero"
                value={revista.numero}
                onChange={handleInputChange}
                min="1"
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
                value={revista.editorial}
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
                value={revista.anoPublicacion}
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

export default RevistaForm;