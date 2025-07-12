# AnimeEro

Una plataforma web dinámica para ver anime, construida con la API de AnimeFLV, que ofrece una experiencia de usuario moderna e intuitiva.

## 🚀 Características

- **Búsqueda de anime** con filtros avanzados
- **Navegación por catálogo** con paginación
- **Reproductor de episodios** integrado
- **Interfaz responsive** optimizada para todos los dispositivos
- **Proxy de imágenes** para evitar problemas de CORS
- **Diseño moderno** con Tailwind CSS

## 🛠️ Tecnologías

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo y build
- **Wouter** para routing
- **TanStack Query** para gestión de estado del servidor
- **Tailwind CSS** para estilos
- **Radix UI** con shadcn/ui para componentes

### Backend
- **Node.js** con Express
- **Proxy API** para AnimeFLV
- **Funciones serverless** para Netlify

## 📁 Estructura del Proyecto

```
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes reutilizables
│   │   ├── pages/          # Páginas de la aplicación
│   │   ├── lib/            # Utilidades y configuración
│   │   └── hooks/          # Hooks personalizados
│   └── index.html
├── server/                 # Backend Express
├── netlify/                # Funciones serverless
│   └── functions/
├── shared/                 # Tipos y esquemas compartidos
└── netlify.toml           # Configuración de Netlify
```

## 🔧 Desarrollo Local

1. **Instalar dependencias**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

3. **Abrir en el navegador**
   ```
   http://localhost:5000
   ```

## 🚀 Despliegue

### Netlify (Recomendado)

Este proyecto está configurado para desplegarse automáticamente en Netlify:

1. **Conecta tu repositorio** con Netlify
2. **Configuración automática** detectada por `netlify.toml`
3. **Build command**: `npm run build`
4. **Publish directory**: `dist/public`

### Otros Servicios

- **Vercel**: Compatible con configuración adicional
- **Railway**: Soporta el stack completo
- **Render**: Funciona con aplicaciones Node.js

## 🌐 API

La aplicación utiliza la API de AnimeFLV a través de un proxy para:
- Búsqueda de anime
- Detalles de episodios
- Listado de anime en emisión
- Últimos episodios

## 📝 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📧 Contacto

Para preguntas o sugerencias, puedes abrir un issue en este repositorio.

---

**Nota**: Este proyecto es solo para fines educativos y no tiene afiliación oficial con AnimeFLV.