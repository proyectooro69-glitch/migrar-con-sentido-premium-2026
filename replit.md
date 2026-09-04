# Migrar con Sentido

## Desarrollo

La aplicación usa Vite, React, TypeScript, TanStack Start y Tailwind CSS.

```bash
npm install
npm run dev -- --host 0.0.0.0 --port 5000
```

El workflow `Start application` ejecuta ese comando y publica el preview en el puerto 5000.

## Verificación

```bash
npm run lint:types
npm run build
```

`npm run lint:js` requiere una configuración `eslint.config.*`; el repositorio importado no la incluía.

## Estado de las fases

- La portada pública conserva el video y la imagen adjuntos en `public/assets/`, con hero a pantalla completa, navegación responsive, CTA y fallback.
- Noticias y testimonios sin contenido no se muestran en el sitio público.
- La sección FAQ contiene preguntas útiles y el acordeón funciona sin mostrar texto provisional.
- La base PostgreSQL incluye tablas para ajustes, servicios, noticias, testimonios, FAQ, colaboradoras legales y multimedia.
- `/admin` está preparado con autenticación gestionada, allowlist de administrador y una interfaz inicial responsive.

La persistencia de formularios, el CRUD completo, la subida de multimedia y la validación server-side de cada endpoint pertenecen a la siguiente fase de implementación.