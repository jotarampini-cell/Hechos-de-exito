# 🚀 Configuración de Git y GitHub

## 📋 Pasos para Configurar el Repositorio

### 1. Instalar Git (si no está instalado)

**Windows:**
- Descargar desde: https://git-scm.com/download/win
- O usar winget: `winget install Git.Git`

**Verificar instalación:**
```bash
git --version
```

### 2. Configurar Git (primera vez)

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-email@ejemplo.com"
```

### 3. Inicializar Repositorio

```bash
# Inicializar repositorio
git init

# Agregar todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: Hechos de Éxito app with security improvements"

# Cambiar a rama main
git branch -M main

# Agregar repositorio remoto
git remote add origin https://github.com/jotarampini-cell/Hechos-de-xito.git

# Push inicial
git push -u origin main
```

### 4. Verificar que .env.local NO se suba

```bash
# Verificar que .env.local esté en .gitignore
git status
# No debería aparecer .env.local en los archivos a commitear
```

## 🔒 Configuración de Seguridad en GitHub

### Variables de Entorno en GitHub

1. **Ir a tu repositorio en GitHub**
2. **Settings > Secrets and variables > Actions**
3. **Agregar las siguientes variables:**

```
GOOGLE_API_KEY = AIzaSyAbJ2-IRbdX7OarBEb-N2UOcR64PVLaHE0
NEXT_PUBLIC_APP_URL = https://tu-dominio.vercel.app
NODE_ENV = production
```

## 🚀 Deploy en Vercel

### Opción 1: Deploy desde GitHub

1. **Ir a vercel.com**
2. **Importar proyecto desde GitHub**
3. **Seleccionar tu repositorio**
4. **Configurar variables de entorno en Vercel Dashboard**
5. **Deploy automático**

### Opción 2: Deploy manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login en Vercel
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 📋 Checklist de Seguridad

- [ ] ✅ API key movida a variables de entorno
- [ ] ✅ .env.local agregado a .gitignore
- [ ] ✅ Headers de seguridad configurados
- [ ] ✅ Rate limiting implementado
- [ ] ✅ Error boundaries configurados
- [ ] ✅ Variables de entorno configuradas en Vercel/GitHub

## 🎯 Próximos Pasos

1. **Ejecutar los comandos de Git**
2. **Configurar variables en GitHub/Vercel**
3. **Hacer deploy**
4. **Probar la aplicación en producción**
5. **Configurar dominio personalizado (opcional)**

---

**¡Tu aplicación estará lista para producción con máxima seguridad!** 🔒


