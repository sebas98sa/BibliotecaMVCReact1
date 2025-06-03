import api from './api';

const DVDS_ENDPOINT = '/dvds';

export const dvdService = {
  // Obtener todos los DVDs
  getAll: () => api.get(DVDS_ENDPOINT),

  // Obtener DVD por ID
  getById: (id) => api.get(`${DVDS_ENDPOINT}/${id}`),

  // Crear nuevo DVD
  create: (dvd) => api.post(DVDS_ENDPOINT, dvd),

  // Actualizar DVD
  update: (id, dvd) => api.put(`${DVDS_ENDPOINT}/${id}`, dvd),

  // Eliminar DVD
  delete: (id) => api.delete(`${DVDS_ENDPOINT}/${id}`),

  // Obtener template con valores por defecto
  getTemplate: () => api.get(`${DVDS_ENDPOINT}/template`),

  // Buscar por género
  searchByGenero: (genero) => api.get(`${DVDS_ENDPOINT}/buscar/genero?genero=${encodeURIComponent(genero)}`),

  // Buscar por director
  searchByDirector: (director) => api.get(`${DVDS_ENDPOINT}/buscar/director?director=${encodeURIComponent(director)}`),

  // Buscar por autor
  searchByAutor: (autor) => api.get(`${DVDS_ENDPOINT}/buscar/autor?autor=${encodeURIComponent(autor)}`),

  // Búsqueda general
  search: (params) => {
    const queryParams = new URLSearchParams();
    if (params.genero) queryParams.append('genero', params.genero);
    if (params.director) queryParams.append('director', params.director);
    if (params.autor) queryParams.append('autor', params.autor);
    
    return api.get(`${DVDS_ENDPOINT}/buscar?${queryParams.toString()}`);
  }
};