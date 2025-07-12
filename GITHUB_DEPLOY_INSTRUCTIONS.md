# 🚀 Cómo Desplegar AnimeEro desde GitHub

## Pasos para Subir a GitHub

### 1. Crear Repositorio en GitHub
1. Ve a [github.com](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `animeero` (o el que prefieras)
4. Descripción: "Plataforma de anime streaming con React y API de AnimeFLV"
5. Público o Privado (como prefieras)
6. **NO** inicializar con README (ya tienes uno)

### 2. Subir Archivos
Tienes varias opciones:

**Opción A: Interfaz Web**
1. Arrastra todos los archivos de esta carpeta a GitHub
2. Commit: "Initial commit - AnimeEro project"
3. Push

**Opción B: Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit - AnimeEro project"
git remote add origin https://github.com/TUUSUARIO/animeero.git
git push -u origin main
```

**Opción C: GitHub Desktop**
1. Descarga GitHub Desktop
2. Clona el repositorio vacío
3. Copia todos los archivos
4. Commit y Push

### 3. Desplegar en Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Selecciona "Import Git Repository"
4. Elige tu repositorio `animeero`
5. Vercel detectará automáticamente la configuración
6. Haz clic en "Deploy"

## 📁 Archivos Incluidos

✅ **client/** - Aplicación React completa
✅ **api/** - Funciones serverless para Vercel
✅ **server/** - Código backend (referencia)
✅ **shared/** - Tipos y esquemas compartidos
✅ **package.json** - Dependencias del proyecto
✅ **vercel.json** - Configuración de Vercel
✅ **README.md** - Documentación del proyecto
✅ **.gitignore** - Archivos a ignorar en Git
✅ **Archivos de configuración** - Vite, Tailwind, etc.

## 🔧 Configuración Automática

Vercel detectará automáticamente:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

## 🚀 Ventajas de GitHub + Vercel

- **Auto-deploy**: Cada cambio se despliega automáticamente
- **Historial**: Control de versiones completo
- **Colaboración**: Fácil para trabajar en equipo
- **Rollback**: Fácil revertir cambios
- **Gratis**: Ambos servicios son gratuitos

## 📝 Después del Despliegue

Tu sitio estará disponible en:
`https://animeero-[random].vercel.app`

Puedes:
- Cambiar el nombre del dominio
- Configurar dominio personalizado
- Ver logs de deployment
- Configurar variables de entorno

¡Tu plataforma AnimeEro estará en línea en minutos!