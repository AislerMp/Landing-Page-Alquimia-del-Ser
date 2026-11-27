# Revisión de la landing de Alquimia del Ser

Pruebas del 26 de noviembre de 2026 con Microsoft Edge. La versión principal se sirvió por HTTP local bajo un subdirectorio, con la misma estructura de rutas relativas que usará en GitHub Pages.

| Resolución | Resultado |
| --- | --- |
| 1920 × 1080 | Carga y distribución correctas |
| 1440 × 1000 | Carga, distribución e interacciones de escritorio |
| 1024 × 768 | Carga y distribución correctas |
| 768 × 1024 | Carga y distribución correctas |
| 390 × 844 | Carga, distribución e interacciones táctiles |
| 360 × 568 | Disposición y acceso al contenido del detalle en una pantalla corta |
| 320 × 700 | Carga y distribución correctas |

En los siete tamaños se comprobaron imágenes, consola, saltos a secciones y desbordamiento horizontal. Se verificaron el menú móvil y los seis cuadros de detalle, incluidos sus textos, listas, imágenes, notas y consultas por WhatsApp. Escape y «Seguir explorando» devuelven el foco al control que abrió cada cuadro.

Se compararon las ocho franjas con el horario del encargo. Se probaron la vista de un día, el regreso a Semana y la apertura de detalles con hora, actividad y enlace de consulta. Se revisaron el enlace de Maps, el destinatario de correo y la construcción de las consultas por WhatsApp.

La versión autónoma se abrió desde disco en 1440 × 1000 y 390 × 844. Cargó las fotos y tipografías integradas, con las mismas interacciones. Se verificó la aparición de las secciones al hacer scroll y el comportamiento con la preferencia de movimiento reducido.

## Ajustes tras la revisión

- Se reequilibró el titular para dejar juntas las palabras «Un espacio para».
- Los seis selectores del calendario caben en una fila a 390 px. A 320 px se acomodan en dos filas de tres.
- Se redujo el espacio alrededor de la agenda y se verificó que los horarios y los detalles sigan legibles al alternar días.

## Ajustes con la nueva referencia de Readdy

Se probaron el subrayado de la navegación al desplazarse, `aria-current="location"` y los mensajes contextuales del botón fijo de WhatsApp. El diálogo de detalles utiliza transiciones de entrada y salida y mantiene la devolución del foco. Se verificó que la preferencia de movimiento reducido acorta esas transiciones.

La galería usa las seis imágenes de la referencia. En escritorio, la imagen y el texto se ven uno al lado del otro dentro de cada detalle. En pantallas estrechas, se apilan. El cuadro interior conserva su altura natural. En vistas cortas, la capa completa puede desplazarse para mantener el contenido accesible. La membresía conserva los US$100 mensuales y las seis actividades en el panel numerado.

El contacto muestra el mapa local al abrir la página. Se probó la carga del iframe bajo petición y el regreso al mapa local al cerrarlo. El destino de Google Maps respondió con HTTP 200. Se ajustó el ancho del mapa para evitar desbordamientos a 768 y 320 px.

## Dirección visual

La portada abre con un retrato de Rose tomado en el centro. El arco y el contorno dorado enmarcan la fotografía. La escala de la referencia combina Cormorant Garamond para titulares, Manrope para la interfaz y Parisienne para los acentos manuscritos. Los fondos marfil, rosa cálido y borgoña marcan los cambios entre presentación, exploración y contacto.

La membresía ocupa una sección propia con el precio y las seis actividades visibles. La agenda continúa la experiencia con una vista semanal compacta y acceso a los detalles de cada clase. En pantallas estrechas se prioriza la lectura de un día a la vez. El Club de Lectura tiene una indicación independiente mientras se confirma el horario.

Se usaron el emblema original, el retrato de la inauguración y la portada del libro. Las experiencias siguen la composición editorial de Readdy, con tamaños alternados para las imágenes. Las consultas sobre cupos y la inscripción se dirigen a los canales del negocio.

## Evidencia visual

- Página completa en [escritorio](../capturas/escritorio-completa.png) y [móvil](../capturas/movil-completa.png).
- Calendario en [escritorio](../capturas/escritorio-calendario.png) y [móvil](../capturas/movil-calendario.png).
- [Portada](../capturas/escritorio-hero.png), [experiencias](../capturas/escritorio-catalogo.png), [membresía](../capturas/escritorio-membresia.png), [Rose](../capturas/escritorio-rose.png) y [academia](../capturas/escritorio-academia.png).
- Detalle de la Sala de podcast en [escritorio](../capturas/escritorio-popup.png) y [móvil](../capturas/movil-popup.png).
- [Encabezado](../capturas/escritorio-cabecera.png), [contacto en escritorio](../capturas/escritorio-contacto.png), [contacto en móvil](../capturas/movil-contacto.png) y [pie de página](../capturas/escritorio-footer.png).

El [inventario de recursos](recursos.md) documenta los originales, el acceso a las referencias y los datos comerciales pendientes de confirmar.
