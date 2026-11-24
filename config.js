
const CONFIG = {

  /* ---- Logo ---- */
  logoParte1: "ARCHIVE",          
  logoParte2: "TUNG",            
  logoImagen: "",                



  /* ---- Menú (texto y archivo al que lleva) ---- */
  menu: [
    { texto: "Inicio",     href: "index.html",      id: "inicio" },
    { texto: "Mujer",      href: "mujer.html",      id: "mujer" },
    { texto: "Hombre",     href: "hombre.html",     id: "hombre" },
    { texto: "Accesorios", href: "accesorios.html", id: "accesorios" },
    { texto: "Productos",  href: "productos.html",  id: "productos" },
    { texto: "Ofertas",    href: "ofertas.html",    id: "ofertas" },
    { texto: "Contacto",   href: "contacto.html",   id: "contacto" }
  ],

  /* ---- Tienda / envío / pagos ---- */
  moneda: "$",                    // ✏️ símbolo de moneda
  envioGratisDesde: 80,           // ✏️ compra mínima para envío gratis
  costoEnvio: 8,                  // ✏️ costo de envío si no llega al mínimo
  metodosPago: ["Transferencia bancaria", "Mercado Pago", "Tarjeta de crédito/débito", "Efectivo (retiro)"], // ✏️ (también se muestran en el footer)
  mediosEnvio: ["Envío a todo el país", "Retiro coordinado"], // ✏️ se muestran en el footer
  ofertaHasta: "2026-12-31T23:59:59", // ✏️ fecha de fin de la cuenta regresiva (página Ofertas)

  /* ---- Preguntas frecuentes (Inicio) ---- */
  faq: [                          // ✏️ q = pregunta, a = respuesta. Si cambiás montos de envío o días, actualizá acá también
    { q: "¿Cómo funciona el envío gratis?", a: "En pedidos mayores a $80 el envío es gratis. Si tu compra no llega a ese monto, el envío tiene un costo de $8." },
    { q: "¿Cómo puedo pagar?", a: "Aceptamos transferencia bancaria, Mercado Pago, tarjeta de crédito/débito y efectivo (con retiro)." },
    { q: "¿Puedo cambiar una prenda?", a: "Sí, tenés hasta 30 días después de recibir tu compra para pedir el cambio." },
    { q: "¿Cómo sé qué talle elegir?", a: "Las medidas son aproximadas. Si tenés dudas, escribinos antes de comprar y te ayudamos a elegir." }
  ],

  /* ---- Contacto ---- */
  email: "contacto@archivetung.com",  // ✏️ el formulario de contacto abre un mail a esta dirección
  whatsapp: "",                       // ✏️ número con código de país, sin + ni espacios (ej: 5492231234567). Si lo dejás vacío, se ocultan los botones de WhatsApp (incluido el flotante)

  /* ---- Footer ---- */
  footerDescripcion: "Moda de archivo y piezas de culto. Cada prenda tiene historia, cada costura tiene carácter.", // ✏️
  copyright: "© 2026 Archive Tung. Todos los derechos reservados.", // ✏️
  marcasFooter: ["Rick Owens", "Margiela", "Jnco", "Southpole", "Affliction", "Polo"], // ✏️

  /* =======================================================
     SECCIÓN DE INSTAGRAM (aparece en Inicio y Contacto)
     ✏️ Cambiá los datos para vincular otra cuenta.
     ======================================================= */
  instagram: {
    usuario: "archive.tung",                         // ✏️ nombre que se ve en la tarjeta
    etiqueta: "@archive.tung",                       // ✏️ burbuja blanca arriba a la derecha
    url: "https://www.instagram.com/archive.tung/",  // ✏️ LINK de tu Instagram
    avatar: "img/instagram.jpg",                     // ✏️ IMAGEN al costado (foto de perfil). Poné tu archivo en la carpeta img/
    seguidores: "13,2 mil",                          // ✏️
    seguidos: "65",                                  // ✏️
    bio: [                                           // ✏️ cada línea es una línea de la bio (la primera sale en negrita)
      "ARCHIVE.TUNG | Moda de archivo",
      "Vendo ropa de archivo",
      "ENVÍOS A TODO EL PAÍS",
      "Hacé tu compra online"
    ],
    supratitulo: "INSTAGRAM",                                                       // ✏️ texto chico de arriba
    titulo: "Los drops se anuncian primero en Instagram. Activá las notificaciones y enterate antes que nadie.", // ✏️
    boton: "Ir a @archive.tung"                                                     // ✏️ texto del botón
  }
};
