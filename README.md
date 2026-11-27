# Alquimia del Ser

Landing en español para el centro de arte y bienestar de Rose Amador en Woodside, Queens. La página presenta la membresía Transformación Integral, el calendario semanal y una galería con seis experiencias.

## Abrir la página

Abre [index.html](index.html) en un navegador. También puedes abrir [alquimia-autonoma.html](alquimia-autonoma.html), que reúne la página, las fotografías, las fuentes y el mapa local en un solo archivo. El mapa interactivo y los enlaces a servicios externos necesitan conexión.

Para probar el comportamiento bajo HTTP desde la carpeta del proyecto, ejecuta `python -m http.server 8000 --bind 127.0.0.1` y abre `http://127.0.0.1:8000/`. Python es opcional y se usa para la vista local y la generación de la copia autónoma.

## Editar

| Ubicación | Contenido |
| --- | --- |
| `index.html` | Textos, agenda semanal, canales de contacto y metadatos |
| `css/styles.css` | Identidad visual, componentes, distribución adaptable y movimiento |
| `css/experiences.css` | Composición y tipografía de las seis experiencias |
| `css/schedule.css` | Vista semanal y estilo de la agenda |
| `js/catalog-data.js` | Textos, actividades, notas e imágenes de las seis experiencias |
| `js/catalog.js` | Presentación de las tarjetas y apertura de sus detalles |
| `js/schedule.js` | Selección de días y detalles del calendario |
| `js/main.js` | Menú, navegación activa, WhatsApp contextual, animaciones de entrada y diálogo compartido |
| `js/contact.js` | Carga del mapa interactivo y restauración del foco |
| `assets/` | Emblema, fotografías, portada, tipografías y licencias |

Actualiza el horario en el bloque `#calendario` de `index.html`. Las horas visibles corresponden a Nueva York. Publica los precios, imágenes y enlaces de cada ficha cuando estén confirmados. Después de un cambio, puedes regenerar la copia autónoma ejecutando `python scripts/generar-autonoma.py`.

## Publicar cuando se apruebe

El archivo [`.gitignore`](.gitignore) excluye configuraciones locales, cachés, registros y la carpeta de referencias de trabajo. La landing, sus recursos y la versión autónoma quedan disponibles para el repositorio.

1. Copia `index.html`, `.nojekyll`, `css/`, `js/` y `assets/` a la raíz de la rama de publicación del repositorio elegido.
2. En el repositorio abre **Settings → Pages**, selecciona **Deploy from a branch** y elige la rama y **/(root)**. Guarda la configuración. La página usa rutas relativas para funcionar desde un subdirectorio. [Configuración de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. Cuando apruebes la indexación, retira la etiqueta `robots` con `noindex, nofollow` de `index.html`. Usa la URL pública definitiva para `og:image`, `og:url` y el enlace canónico. Luego puedes registrar la propiedad en Search Console. [Directiva noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing).

Si posteriormente se activa GA4, registra únicamente interacciones genéricas. Los datos de formularios, las consultas de terapias y los mensajes de WhatsApp quedan fuera de los eventos de Analytics.

## Material de entrega

- [Inventario y fuentes](docs/recursos.md)
- [Pruebas y valoración visual](docs/pruebas.md)
- [Capturas del navegador](capturas/)
