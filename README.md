# Carolina Agudelo - Construyendo Juntas 🇨🇴

Página web estilo Linktree para la campaña política de Carolina Agudelo.

## 📁 Estructura del Proyecto

```
construyendo-juntas/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── profile.jpg          # Tu foto de perfil (150x150px mínimo)
│   ├── favicon.png          # Logo pequeño para el navegador
│   └── icons/               # Iconos SVG de redes sociales
│       ├── facebook.svg
│       ├── instagram.svg
│       ├── twitter.svg
│       ├── tiktok.svg
│       ├── youtube.svg
│       ├── linkedin.svg
│       ├── whatsapp.svg
│       ├── document.svg     # Icono para propuestas
│       ├── calendar.svg     # Icono para eventos
│       └── heart.svg        # Icono para voluntarios
└── README.md
```

## 🎨 Colores del Manual de Marca

- **Rojo Principal**: `#C01300`
- **Gris Oscuro**: `#3F4644`
- **Blanco**: `#FFFFFF`

## 🚀 Instrucciones de Configuración

### 1. Agregar Imágenes

#### Foto de Perfil
1. Coloca tu foto en: `images/profile.jpg` o `images/profile.png`
2. Recomendado: Imagen cuadrada, mínimo 400x400px
3. Formato: JPG o PNG

#### Favicon
1. Guarda tu logo en: `images/favicon.png`
2. Tamaño: 32x32px o 64x64px
3. Formato: PNG con fondo transparente

#### Iconos de Redes Sociales
1. Descarga o crea iconos SVG para cada red social
2. Guárdalos en: `images/icons/`
3. Nombres de archivo:
   - `facebook.svg`
   - `instagram.svg`
   - `twitter.svg`
   - `tiktok.svg`
   - `youtube.svg`
   - `linkedin.svg`
   - `whatsapp.svg`
   - `document.svg`
   - `calendar.svg`
   - `heart.svg`

**Dónde conseguir iconos SVG:**
- [Font Awesome](https://fontawesome.com/icons) (descarga como SVG)
- [Heroicons](https://heroicons.com/)
- [Feather Icons](https://feathericons.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)

### 2. Configurar Enlaces

Abre `index.html` y reemplaza los `#` con tus URLs reales:

```html
<!-- Ejemplo WhatsApp -->
<a href="https://wa.me/573001234567" target="_blank" class="link-button">

<!-- Ejemplo Instagram -->
<a href="https://instagram.com/tu_usuario" target="_blank" class="social-icon">
```

**Formato de enlaces:**
- WhatsApp: `https://wa.me/573001234567` (código país + número sin espacios)
- Facebook: `https://facebook.com/tu_pagina`
- Instagram: `https://instagram.com/tu_usuario`
- Twitter/X: `https://twitter.com/tu_usuario`
- TikTok: `https://tiktok.com/@tu_usuario`
- YouTube: `https://youtube.com/@tu_canal`
- LinkedIn: `https://linkedin.com/in/tu_perfil`

### 3. Agregar Google Form

1. Abre tu Google Form
2. Haz clic en **"Enviar"** (esquina superior derecha)
3. Selecciona el ícono **"<>"** (Insertar HTML)
4. Copia el código iframe que te da Google
5. En `index.html`, busca el comentario:
   ```html
   <!-- PEGA AQUÍ TU IFRAME DE GOOGLE FORMS -->
   ```
6. Pega tu iframe ahí y **elimina** el `<div class="form-placeholder">`

**Ejemplo de iframe:**
```html
<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc.../viewform?embedded=true" 
        width="100%" 
        height="800" 
        frameborder="0" 
        marginheight="0" 
        marginwidth="0">
    Cargando…
</iframe>
```

### 4. Personalizar Textos

En `index.html`, puedes cambiar:

```html
<!-- Título y eslogan -->
<h1 class="profile-name">Carolina Agudelo</h1>
<p class="profile-tagline">Construyendo Juntas</p>

<!-- Textos de botones -->
<span>Escríbenos por WhatsApp</span>
<span>Conoce nuestras propuestas</span>
<span>Próximos eventos</span>
<span>Únete como voluntario/a</span>

<!-- Título del formulario -->
<h2 class="form-title">Regístrate y únete al movimiento</h2>
```

## 📤 Subir a GitHub Pages

### Opción A: Usando Git (Línea de comandos)

```bash
# 1. Crear repositorio en GitHub
# Ve a github.com y crea un nuevo repositorio llamado "construyendo-juntas"

# 2. En tu computadora, dentro de la carpeta del proyecto:
git init
git add .
git commit -m "Primera versión de la página"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/construyendo-juntas.git
git push -u origin main

# 3. Activar GitHub Pages
# - Ve a Settings → Pages
# - En "Source", selecciona "main" → carpeta "/root"
# - Save
# Tu página estará en: https://TU_USUARIO.github.io/construyendo-juntas
```

### Opción B: Subir archivos manualmente

1. Crea un nuevo repositorio en GitHub
2. Haz clic en "uploading an existing file"
3. Arrastra todos tus archivos
4. Haz commit
5. Ve a Settings → Pages → Activa GitHub Pages

## 🌐 Configurar Dominio Personalizado

1. **Compra tu dominio** (ejemplo: `carolinaagudelo.com`)
2. En **GitHub** (tu repo):
   - Settings → Pages → Custom domain
   - Escribe: `carolinaagudelo.com`
   - Save

3. En tu **proveedor de dominio** (Namecheap, Cloudflare, etc.):
   - Agrega estos registros DNS:
   ```
   Tipo: A
   Host: @
   Valor: 185.199.108.153

   Tipo: A
   Host: @
   Valor: 185.199.109.153

   Tipo: A
   Host: @
   Valor: 185.199.110.153

   Tipo: A
   Host: @
   Valor: 185.199.111.153

   Tipo: CNAME
   Host: www
   Valor: TU_USUARIO.github.io
   ```

4. Espera 10-30 minutos para que se propague
5. GitHub generará automáticamente un certificado SSL (HTTPS)

## ✅ Checklist de Configuración

- [ ] Agregar foto de perfil en `images/profile.jpg`
- [ ] Agregar favicon en `images/favicon.png`
- [ ] Agregar todos los iconos SVG en `images/icons/`
- [ ] Configurar enlaces de WhatsApp
- [ ] Configurar enlaces de redes sociales
- [ ] Agregar iframe de Google Form
- [ ] Personalizar textos (nombre, eslogan, botones)
- [ ] Probar la página localmente (abriendo `index.html`)
- [ ] Subir a GitHub
- [ ] Activar GitHub Pages
- [ ] (Opcional) Configurar dominio personalizado

## 🧪 Probar Localmente

Simplemente abre el archivo `index.html` en tu navegador haciendo doble clic.

Para una experiencia más completa, usa un servidor local:

```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Luego abre: http://localhost:8000
```

## 📱 Responsive Design

La página está optimizada para:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1919px)
- ✅ Tablet (768px - 1023px)
- ✅ Móvil (320px - 767px)

## 🎯 Características

- ✨ Animaciones suaves de entrada
- 📱 100% responsive
- ♿ Accesible (navegación por teclado)
- 🎨 Diseño basado en el manual de marca
- ⚡ Carga rápida
- 🔒 HTTPS automático con GitHub Pages

## 💡 Tips Adicionales

1. **Optimiza tus imágenes** antes de subirlas:
   - Usa [TinyPNG](https://tinypng.com/) para comprimir
   - Mantén las fotos bajo 500KB

2. **Google Analytics** (opcional):
   - Agrega el código de tracking en el `<head>` de `index.html`

3. **Actualizar contenido**:
   - Edita `index.html` → Guarda → Haz commit → Push a GitHub
   - Los cambios se reflejarán en 1-2 minutos

## 📞 Soporte

Si necesitas ayuda, puedes:
1. Revisar la documentación de [GitHub Pages](https://pages.github.com/)
2. Consultar tutoriales de HTML/CSS básico
3. Buscar ayuda en comunidades de desarrollo web

---

**¡Éxito en tu campaña! 🇨🇴**

*"¡Por Colombia, siempre adelante, ni un paso atrás y lo que fuere menester sea!"*