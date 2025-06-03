# Sistema de Gestión de Biblioteca - Frontend React

Una aplicación React que consume la API REST del sistema de biblioteca desarrollado en Spring Boot.
## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.


# Sistema de Gestión de Biblioteca - Frontend React

Una aplicación React moderna que consume la API REST del sistema de biblioteca desarrollado en Spring Boot, proporcionando una interfaz de usuario completa para la gestión de libros, revistas y DVDs.

## 🚀 Características

- **Gestión completa de Libros**: CRUD completo con búsquedas por título y autor
- **Gestión de Revistas**: CRUD con búsquedas por categoría, editorial y autor  
- **Gestión de DVDs**: CRUD con búsquedas por género, director y autor
- **Interfaz responsiva**: Diseñada con Bootstrap 5
- **Navegación fluida**: Implementada con React Router DOM v6
- **Consumo de API REST**: Integración completa con backend Spring Boot
- **Manejo de errores**: Sistema robusto de manejo de errores y validaciones
- **Estados de carga**: Indicadores de carga para mejor experiencia de usuario

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **React 19.1.0** - Biblioteca principal para UI
- **React DOM 19.1.0** - Renderizado de componentes
- **React Router DOM 6.11.0** - Enrutamiento y navegación
- **Axios 1.4.0** - Cliente HTTP para consumo de APIs
- **Bootstrap 5.3.0** - Framework CSS para diseño responsivo

### **Herramientas de Desarrollo**
- **React Scripts 5.0.1** - Herramientas de construcción y desarrollo
- **Create React App** - Configuración base del proyecto
- **Webpack** - Bundler (incluido en React Scripts)
- **Babel** - Transpilador JavaScript (incluido en React Scripts)

### **Testing**
- **@testing-library/react 16.3.0** - Utilidades para testing de componentes
- **@testing-library/jest-dom 6.6.3** - Matchers adicionales para Jest
- **@testing-library/user-event 13.5.0** - Simulación de eventos de usuario
- **@testing-library/dom 10.4.0** - Utilidades DOM para testing

### **Métricas y Monitoreo**
- **web-vitals 2.1.4** - Métricas de rendimiento web

## 📋 Prerrequisitos

- **Node.js 16+** (Recomendado: Node.js 18 LTS)
- **npm 8+** o **yarn 1.22+**
- **Backend Spring Boot** ejecutándose en `http://localhost:8080`
- **Base de datos MySQL** configurada y en funcionamiento

## 🛠️ Instalación

### Opción 1: Instalación Manual
```bash
# Crear proyecto React
npx create-react-app biblioteca-react
cd biblioteca-react

# Instalar dependencias principales
npm install react-router-dom@6.11.0 axios@1.4.0 bootstrap@5.3.0

# Verificar instalación
npm list react-router-dom axios bootstrap
```

### Opción 2: Clonar y Configurar
```bash
# Clonar el proyecto
git clone https://github.com/Norbey32/BibliotecaMVCReact.git
cd biblioteca-react

# Instalar todas las dependencias
npm install

# Verificar que todas las dependencias estén instaladas
npm list
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── common/
│   │   ├── ErrorMessage.js      # Componente de mensajes de error
│   │   └── LoadingSpinner.js    # Componente de loading
│   ├── libros/
│   │   ├── LibrosList.js        # Lista de libros
│   │   └── LibroForm.js         # Formulario de libros
│   ├── revistas/
│   │   ├── RevistasList.js      # Lista de revistas
│   │   └── RevistaForm.js       # Formulario de revistas
│   └── dvds/
│       ├── DVDsList.js          # Lista de DVDs
│       └── DVDForm.js           # Formulario de DVDs
├── services/
│   ├── api.js                   # Configuración base de Axios
│   ├── libroService.js          # Servicios para libros
│   ├── revistaService.js        # Servicios para revistas
│   └── dvdService.js            # Servicios para DVDs
├── pages/
│   ├── Home.js                  # Página principal
│   ├── LibrosPage.js            # Página de libros
│   ├── RevistasPage.js          # Página de revistas
│   └── DVDsPage.js              # Página de DVDs
└── App.js                       # Configuración de rutas
```

## 🔧 Configuración del Backend

Asegúrate de agregar esta configuración CORS en tu proyecto Spring Boot:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 🚀 Ejecución

1. **Iniciar el backend**: Ejecuta tu aplicación Spring Boot
2. **Iniciar el frontend**: 
   ```bash
   npm start
   ```
3. **Acceder a la aplicación**: http://localhost:3000

## 📡 Endpoints Consumidos

### Libros
- `GET /api/libros` - Obtener todos los libros
- `GET /api/libros/{id}` - Obtener libro por ID
- `POST /api/libros` - Crear nuevo libro
- `PUT /api/libros/{id}` - Actualizar libro
- `DELETE /api/libros/{id}` - Eliminar libro
- `GET /api/libros/buscar?titulo={titulo}&autor={autor}` - Búsqueda

### Revistas
- `GET /api/revistas` - Obtener todas las revistas
- `GET /api/revistas/{id}` - Obtener revista por ID
- `POST /api/revistas` - Crear nueva revista
- `PUT /api/revistas/{id}` - Actualizar revista
- `DELETE /api/revistas/{id}` - Eliminar revista
- `GET /api/revistas/buscar?categoria={categoria}&editorial={editorial}&autor={autor}` - Búsqueda

### DVDs
- `GET /api/dvds` - Obtener todos los DVDs
- `GET /api/dvds/{id}` - Obtener DVD por ID
- `POST /api/dvds` - Crear nuevo DVD
- `PUT /api/dvds/{id}` - Actualizar DVD
- `DELETE /api/dvds/{id}` - Eliminar DVD
- `GET /api/dvds/template` - Obtener template con valores por defecto
- `GET /api/dvds/buscar?genero={genero}&director={director}&autor={autor}` - Búsqueda

## 🎨 Características de la UI

- **Diseño responsivo**: Funciona en desktop, tablet y móvil
- **Bootstrap 5**: Interfaz moderna y profesional
- **Navegación intuitiva**: Breadcrumbs y navegación clara
- **Validaciones**: Formularios con validación en tiempo real
- **Confirmaciones**: Diálogos de confirmación para eliminaciones
- **Estados de carga**: Spinners durante operaciones asíncronas
- **Manejo de errores**: Mensajes de error informativos

## 🔍 Funcionalidades de Búsqueda

Cada entidad incluye:
- **Búsqueda en tiempo real**: Resultados dinámicos
- **Múltiples criterios**: Búsqueda por diferentes campos
- **Filtros avanzados**: Combinación de criterios
- **Reset automático**: Limpieza de filtros

## 🛡️ Manejo de Errores

- **Errores de red**: Notificaciones cuando el backend no está disponible
- **Errores de validación**: Mensajes específicos por campo
- **Errores 404**: Manejo de recursos no encontrados
- **Errores de servidor**: Mensajes informativos para errores 500

## 🔧 Personalización

### Cambiar URL del Backend
Modifica `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://tu-servidor:puerto/api';
```

### Personalizar Estilos
Edita `src/index.css` para modificar la apariencia.

## 📦 Scripts Disponibles

- `npm start` - Inicia la aplicación en modo desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de Webpack

## 🚨 Solución de Problemas

### Error de CORS
- Verifica que la configuración CORS esté en el backend
- Asegúrate de que el backend esté ejecutándose en puerto 8080

### Error de conexión
- Confirma que el backend esté corriendo
- Verifica la URL en `src/services/api.js`

### Errores de dependencias
```bash
npm install
# o
rm -rf node_modules package-lock.json
npm install
```


## 📡 Integración con API REST

### Configuración de Conexión
- **URL Base**: `http://localhost:8080/api`
- **Configurada en**: `src/services/api.js`
- **Cliente HTTP**: Axios con interceptores para manejo de errores

### Endpoints Consumidos

#### **Libros** (`/api/libros`)
- `GET /` - Obtener todos los libros
- `GET /{id}` - Obtener libro por ID
- `POST /` - Crear nuevo libro
- `PUT /{id}` - Actualizar libro existente
- `DELETE /{id}` - Eliminar libro
- `GET /buscar?titulo={titulo}&autor={autor}` - Búsqueda por criterios

#### **Revistas** (`/api/revistas`)
- `GET /` - Obtener todas las revistas
- `GET /{id}` - Obtener revista por ID
- `POST /` - Crear nueva revista
- `PUT /{id}` - Actualizar revista existente
- `DELETE /{id}` - Eliminar revista
- `GET /buscar?categoria={categoria}&editorial={editorial}&autor={autor}` - Búsqueda

#### **DVDs** (`/api/dvds`)
- `GET /` - Obtener todos los DVDs
- `GET /{id}` - Obtener DVD por ID
- `POST /` - Crear nuevo DVD
- `PUT /{id}` - Actualizar DVD existente
- `DELETE /{id}` - Eliminar DVD
- `GET /template` - Obtener template con valores por defecto
- `GET /buscar?genero={genero}&director={director}&autor={autor}` - Búsqueda

## 🎨 Características de la Interfaz

### **Diseño Responsivo**
- **Framework**: Bootstrap 5.3.0
- **Breakpoints**: Compatible con desktop, tablet y móvil
- **Grid System**: Layout responsivo en todas las páginas

### **Navegación**
- **React Router DOM v6**: Navegación SPA sin recargas
- **Breadcrumbs**: Navegación clara entre secciones
- **Enlaces dinámicos**: Navegación contextual

### **Componentes UI**
- **Cards**: Diseño moderno con sombras y efectos hover
- **Tables**: Tablas responsivas con estilos Bootstrap
- **Forms**: Formularios con validación en tiempo real
- **Buttons**: Botones con estados de carga y confirmaciones
- **Alerts**: Sistema de notificaciones para errores y éxitos

## 🔍 Funcionalidades de Búsqueda

### **Características Avanzadas**
- **Búsqueda en tiempo real**: Resultados dinámicos mientras escribes
- **Múltiples criterios**: Combinación de diferentes campos de búsqueda
- **Filtros específicos por entidad**:
  - **Libros**: Título, autor
  - **Revistas**: Categoría, editorial, autor
  - **DVDs**: Género, director, autor
- **Reset de filtros**: Limpieza automática de criterios

### **UX de Búsqueda**
- **Formularios intuitivos**: Campos claramente etiquetados
- **Validación**: Prevención de búsquedas vacías
- **Estados de carga**: Indicadores durante la búsqueda
- **Resultados vacíos**: Mensajes informativos cuando no hay resultados

## 🛡️ Manejo de Errores

### **Tipos de Errores Manejados**
- **Errores de red**: Cuando el backend no está disponible
- **Errores 404**: Recursos no encontrados
- **Errores 500**: Errores del servidor
- **Errores de validación**: Campos requeridos y formatos
- **Timeouts**: Conexiones lentas o interrumpidas

### **Estrategias de Error Handling**
- **Interceptores Axios**: Manejo global de errores HTTP
- **Try-catch**: Manejo específico en cada operación
- **Estados de error**: Componentes `ErrorMessage` reutilizables
- **Fallbacks**: Valores por defecto cuando fallan las operaciones

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm start              # Inicia servidor de desarrollo en puerto 3000
npm test               # Ejecuta suite de tests con Jest
npm run build          # Construye aplicación para producción
npm run eject          # Expone configuración de Webpack (irreversible)

# Utilidades
npm install            # Instala todas las dependencias
npm update             # Actualiza dependencias a versiones compatibles
npm audit              # Revisa vulnerabilidades de seguridad
npm audit fix          # Corrige vulnerabilidades automáticamente
```

## 🔧 Personalización

### **Cambiar URL del Backend**
```javascript
// src/services/api.js
const API_BASE_URL = 'http://tu-servidor:puerto/api';
```

### **Personalizar Estilos**
```css
/* src/index.css - Agregar estilos personalizados */
.custom-class {
  /* Tus estilos aquí */
}
```

### **Configurar Proxy para Desarrollo**
```json
// package.json - Agregar proxy para evitar CORS en desarrollo
{
  "proxy": "http://localhost:8080"
}
```

## 🚨 Solución de Problemas Comunes

### **Error: "Can't resolve 'react-router-dom'"**
```bash
npm install react-router-dom
```

### **Error de CORS**
- Verifica configuración CORS en Spring Boot
- Asegúrate de que el backend esté en puerto 8080
- Revisa que la URL en `api.js` sea correcta

### **Error: "Module not found"**
- Verifica que todos los archivos estén en las ubicaciones correctas
- Revisa las rutas de importación (usar `./` no `../` desde src/)

### **Errores de dependencias**
```bash
# Limpiar cache y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **Backend no responde**
- Verifica que Spring Boot esté ejecutándose
- Confirma que la base de datos MySQL esté activa
- Revisa logs del backend para errores

## 📊 Rendimiento y Optimización

### **Configuraciones Incluidas**
- **Code Splitting**: Carga lazy de componentes
- **Tree Shaking**: Eliminación de código no usado
- **Minificación**: Código optimizado para producción
- **Gzip**: Compresión automática en build

### **Métricas Web Vitals**
- **LCP**: Largest Contentful Paint monitoreado
- **FID**: First Input Delay optimizado
- **CLS**: Cumulative Layout Shift minimizado

## 🤝 Contribución

### **Proceso de Desarrollo**
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nuevaFuncionalidad`)
3. Commit cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nuevaFuncionalidad`)
5. Crea un Pull Request

### **Estándares de Código**
- Usar ESLint configuración de React
- Componentes funcionales con Hooks
- Nombres descriptivos en español para variables de negocio
- Comentarios JSDoc para funciones complejas

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.

## 📞 Soporte

Para reportar bugs o solicitar nuevas características:
- Crear issue en el repositorio
- Describir pasos para reproducir el problema
- Incluir versiones de Node.js y npm utilizadas

---

**Desarrollado con ❤️ usando React y Spring Boot**