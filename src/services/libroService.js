import api from './api';

const LIBROS_ENDPOINT = '/libros';

export const libroService = {
  // Obtener todos los libros
  getAll: () => api.get(LIBROS_ENDPOINT),

  // Obtener libro por ID
  getById: (id) => api.get(`${LIBROS_ENDPOINT}/${id}`),

  // Crear nuevo libro
  create: (libro) => api.post(LIBROS_ENDPOINT, libro),

  // Actualizar libro
  update: (id, libro) => api.put(`${LIBROS_ENDPOINT}/${id}`, libro),

  // Eliminar libro
  delete: (id) => api.delete(`${LIBROS_ENDPOINT}/${id}`),

  // Buscar por título
  searchByTitulo: (titulo) => api.get(`${LIBROS_ENDPOINT}/buscar/titulo?q=${encodeURIComponent(titulo)}`),

  // Buscar por autor
  searchByAutor: (autor) => api.get(`${LIBROS_ENDPOINT}/buscar/autor?q=${encodeURIComponent(autor)}`),

  // Búsqueda general
  search: (params) => {
    const queryParams = new URLSearchParams();
    if (params.titulo) queryParams.append('titulo', params.titulo);
    if (params.autor) queryParams.append('autor', params.autor);
    
    return api.get(`${LIBROS_ENDPOINT}/buscar?${queryParams.toString()}`);
  }
};