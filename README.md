# 🛍️ Marketplace - Plataforma de Comercio Simple

Una aplicación de marketplace moderna construida con **Nuxt 4** y **Vue 3**, donde los usuarios pueden crear, gestionar y publicar sus productos de forma sencilla. Este proyecto demuestra habilidades avanzadas en desarrollo full-stack con las últimas tecnologías del ecosistema Vue.

![Nuxt](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=flat&logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=flat&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.x-4169E1?style=flat&logo=postgresql&logoColor=white)

## ✨ Características

### 🏠 Landing Page

- Presentación de la plataforma
- Visualización de productos destacados
- Sistema de autenticación integrado

### 👤 Panel de Usuario

- **Gestión de Productos**
  - ✅ Crear productos con múltiples imágenes
  - ✅ Actualizar información y estado (activo/inactivo)
  - ✅ Ver detalles completos de cada producto
  - ✅ Eliminar productos
  - ✅ Gestión de tags y categorías

### 🛒 Marketplace

- Exploración de todos los productos disponibles
- Filtrado y búsqueda de productos
- Sistema de contacto directo con vendedores

### 📬 Sistema de Mensajes

- Los usuarios reciben solicitudes de contacto en su dashboard
- Bandeja de entrada personalizada
- Notificaciones de nuevas consultas

### 🔐 Autenticación

- Registro e inicio de sesión seguro
- Gestión de sesiones con Nuxt Auth Utils
- Protección de rutas privadas

## 🛠️ Stack Tecnológico

### Frontend

- **[Nuxt 4](https://nuxt.com/)** - Framework Vue full-stack
- **[Vue 3](https://vuejs.org/)** - Framework JavaScript progresivo
- **[Nuxt UI](https://ui.nuxt.com/)** - Biblioteca de componentes UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático

### Backend

- **[Nuxt Server API](https://nuxt.com/docs/guide/directory-structure/server)** - API Routes integradas
- **[Prisma](https://www.prisma.io/)** - ORM para base de datos
- **[Zod](https://zod.dev/)** - Validación de esquemas TypeScript-first
- **[Nuxt Auth Utils](https://github.com/Atinux/nuxt-auth-utils)** - Autenticación y gestión de sesiones

### Base de Datos

- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos relacional
- **[Docker](https://www.docker.com/)** - Contenedorización para desarrollo

### Almacenamiento de Imágenes

- **[Cloudinary](https://cloudinary.com/)** - CDN y gestión de imágenes

## 📋 Requisitos Previos

- Node.js 20.x o superior
- Docker y Docker Compose
- Cuenta de Cloudinary (para subida de imágenes)
- pnpm, npm o yarn

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/marketplace.git
cd marketplace
```

### 2. Instalar dependencias

```bash
npm install
# o
pnpm install
# o
yarn install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="postgresql://user:password@localhost:5432/marketplace?schema=public"

# Cloudinary
CLOUD_NAME=tu_cloud_name
CLOUD_API_KEY=tu_api_key
CLOUD_API_SECRET=tu_api_secret

# Autenticación
NUXT_SESSION_PASSWORD=tu_password_secreto_minimo_32_caracteres
```

## 📦 Build para Producción

```bash
# Generar build de producción
npm run build

# Preview del build
npm run preview
```

## 🚢 Deploy

### Vercel (Recomendado)

```bash
vercel deploy
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Rodrigo Aquiño Valdez**

- GitHub: [@whoysAndre](https://github.com/whoysAndre)

## 🙏 Agradecimientos

- [Nuxt Team](https://nuxt.com/) por el increíble framework
- [Nuxt UI](https://ui.nuxt.com/) por los componentes
- [Prisma](https://www.prisma.io/) por el excelente ORM
- Comunidad de Vue.js por el apoyo constante

---

⭐ Si este proyecto te fue útil, considera darle una estrella en Gi
