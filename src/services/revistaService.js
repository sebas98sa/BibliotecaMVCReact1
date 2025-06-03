import api from './api';

const REVISTAS_ENDPOINT = '/revistas';

export const revistaService = {
  // Obtener todas las revistas
  getAll: () => api.get(REVISTAS_ENDPOINT),

  // Obtener revista por ID
  getById: (id) => api.get(`${REVISTAS_ENDPOINT}/${id}`),

  // Crear nueva revista
  create: (revista) => api.post(REVISTAS_ENDPOINT, revista),

  // Actualizar revista
  update: (id, revista) => api.put(`${REVISTAS_ENDPOINT}/${id}`, revista),

  // Eliminar revista
  delete: (id) => api.delete(`${REVISTAS_ENDPOINT}/${id}`),

  // Buscar por categoría
  searchByCategoria: (categoria) => api.get(`${REVISTAS_ENDPOINT}/buscar/categoria?q=${encodeURIComponent(categoria)}`),

  // Buscar por editorial
  searchByEditorial: (editorial) => api.get(`${REVISTAS_ENDPOINT}/buscar/editorial?q=${encodeURIComponent(editorial)}`),

  // Buscar por autor
  searchByAutor: (autor) => api.get(`${REVISTAS_ENDPOINT}/buscar/autor?q=${encodeURIComponent(autor)}`),

  // Buscar por número
  searchByNumero: (numero) => api.get(`${REVISTAS_ENDPOINT}/numero/${numero}`),

  // Búsqueda general
  search: (params) => {
    const queryParams = new URLSearchParams();
    if (params.categoria) queryParams.append('categoria', params.categoria);
    if (params.editorial) queryParams.append('editorial', params.editorial);
    if (params.autor) queryParams.append('autor', params.autor);
    
    return api.get(`${REVISTAS_ENDPOINT}/buscar?${queryParams.toString()}`);
  }
};