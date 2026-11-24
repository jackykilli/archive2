/* =========================================================
   PRODUCTOS.JS  -  TODAS LAS PRENDAS DEL SITIO
   ✏️ Acá editás nombre, descripción, precio, talles e IMAGEN
   de cada prenda. Podés agregar todas las que quieras
   (copiá un bloque { ... } completo y cambiá el id).

   ⚠️ Los PRECIOS, TALLES y la categoría (mujer/hombre) son de
   ejemplo: ponelos como corresponda.

   Campos de cada prenda:
   - nombre / marca / descripcion ... textos que se ven en la tienda
   - categoria ..... "mujer", "hombre" o "accesorios" (define en qué página aparece)
   - precio ........ precio actual (número)
   - precioAnterior  precio tachado. Si ponés un número, la prenda aparece en OFERTAS. Si no, dejá null
   - etiqueta ...... "Nuevo", "Oferta" o "" (sin etiqueta)
   - imagen ........ ✏️ RUTA DE LA FOTO. Ej: "img/rowns.jpg"
                     Las fotos van en la carpeta img/ junto a los .html (respetá mayúsculas y minúsculas del nombre).
   - color ......... fondo de la tarjeta si no hay foto
   - dibujo ........ dibujo de reemplazo si falta la foto: coat, denim, tee, hoodie, pants, bag, glasses
   - talles ........ lista de talles disponibles
   - detalles ...... lista de características (se ve al abrir la prenda)
   ========================================================= */
const PRODUCTOS = [
  {
    id: 1,
    nombre: "Hoodie con cierre asimétrico",
    marca: "Rick Owens",
    categoria: "mujer",
    precio: 320,
    precioAnterior: null,
    etiqueta: "Nuevo",
    imagen: "img/rowns.jpg",
    color: "#e8e8e8",
    dibujo: "hoodie",
    talles: ["XS", "S", "M", "L"],
    descripcion: "Hoodie negro con capucha en punta y cierre diagonal metálico. Una pieza clásica de Rick Owens.",
    detalles: ["Color negro", "Capucha en punta", "Cierre diagonal metálico", "Bolsillo frontal"]
  },
  {
    id: 2,
    nombre: "Jean bolsillos grandes",
    marca: "Jnco",
    categoria: "hombre",
    precio: 120,
    precioAnterior: 150,
    etiqueta: "Oferta",
    imagen: "img/jnco.jpg",
    color: "#e8e8e8",
    dibujo: "denim",
    talles: ["28", "30", "32", "34"],
    descripcion: "Jean ancho de lavado azul con bolsillos enormes estampados y parche en la pierna. Estética 90s de Jnco.",
    detalles: ["Denim azul con lavado", "Bolsillos laterales grandes con estampa", "Parche en la pierna", "Bajo desflecado"]
  },
  {
    id: 3,
    nombre: "Zapatillas altas con cierre",
    marca: "Rick Owens",
    categoria: "accesorios",
    precio: 450,
    precioAnterior: null,
    etiqueta: "Nuevo",
    imagen: "img/Zapas.jpg",
    color: "#e8e8e8",
    dibujo: "bag",
    talles: ["38", "39", "40", "41", "42"],
    descripcion: "Zapatillas altas de cuero negro con puntera blanca, cierre lateral y cordones anchos.",
    detalles: ["Cuero negro con puntera blanca", "Cierre lateral", "Cordones anchos", "Suela blanca"]
  },
  {
    id: 4,
    nombre: "Sweater acanalado con cintas",
    marca: "Margiela",
    categoria: "mujer",
    precio: 160,
    precioAnterior: 200,
    etiqueta: "Oferta",
    imagen: "img/mmgiela.jpg",
    color: "#e8e8e8",
    dibujo: "tee",
    talles: ["XS", "S", "M", "L"],
    descripcion: "Sweater negro de punto acanalado con cintas adhesivas brillantes sobre el frente y la etiqueta numerada de MM6.",
    detalles: ["Punto acanalado negro", "Cintas brillantes en el frente", "Etiqueta numerada MM6", "Cuello redondo"]
  },
  {
    id: 5,
    nombre: "Remera gráfica South Pole",
    marca: "Southpole",
    categoria: "hombre",
    precio: 45,
    precioAnterior: 60,
    etiqueta: "Oferta",
    imagen: "img/sp.jpg",
    color: "#e8e8e8",
    dibujo: "tee",
    talles: ["S", "M", "L", "XL"],
    descripcion: "Remera gris con gran estampado gráfico de South Pole en verde, blanco y negro, con detalles de cuadros.",
    detalles: ["Color gris", "Estampado gráfico en el frente", "Cuello en V", "Etiqueta con logo en el bajo"]
  },
  {
    id: 6,
    nombre: "Anillo Maison Margiela",
    marca: "Margiela",
    categoria: "accesorios",
    precio: 190,
    precioAnterior: 230,
    etiqueta: "Oferta",
    imagen: "img/mmargielaacc.jpg",
    color: "#e8e8e8",
    dibujo: "glasses",
    talles: ["Única"],
    descripcion: "Anillo plateado con la numeración característica de Maison Margiela grabada y el número 11 destacado.",
    detalles: ["Acabado plateado", "Numeración grabada", "Inscripción Maison Margiela Paris en el interior"]
  },
  {
    id: 7,
    nombre: "Hoodie London con cierre",
    marca: "Project G/R",
    categoria: "mujer",
    precio: 140,
    precioAnterior: null,
    etiqueta: "",
    imagen: "img/hoodie.jpg",
    color: "#e8e8e8",
    dibujo: "hoodie",
    talles: ["S", "M", "L"],
    descripcion: "Hoodie negro corto con cierre, letras London England aplicadas, escudos en las mangas y detalles desgastados.",
    detalles: ["Color negro", "Letras aplicadas London England", "Escudos en las mangas", "Detalles desgastados"]
  },
  {
    id: 8,
    nombre: "Remera Affliction azul",
    marca: "Affliction",
    categoria: "hombre",
    precio: 55,
    precioAnterior: null,
    etiqueta: "",
    imagen: "img/aff.jpg",
    color: "#e8e8e8",
    dibujo: "tee",
    talles: ["M", "L", "XL"],
    descripcion: "Remera azul lavada con gran estampado ornamental en blanco y celeste y cruces negras sobre el hombro.",
    detalles: ["Azul lavado", "Estampado ornamental con cruces", "Cuello redondo"]
  },
  {
    id: 9,
    nombre: "Zapatillas Tabi",
    marca: "Margiela",
    categoria: "accesorios",
    precio: 260,
    precioAnterior: null,
    etiqueta: "",
    imagen: "img/mmargielashoe.jpg",
    color: "#e8e8e8",
    dibujo: "bag",
    talles: ["37", "38", "39", "40"],
    descripcion: "Zapatillas blancas de cuero con la puntera dividida tipo Tabi y la etiqueta numerada de Maison Margiela.",
    detalles: ["Cuero blanco", "Puntera dividida Tabi", "Etiqueta numerada en la lengüeta", "Cordones planos"]
  },
  {
    id: 10,
    nombre: "Jean flare desgastado",
    marca: "Archive",
    categoria: "mujer",
    precio: 210,
    precioAnterior: null,
    etiqueta: "",
    imagen: "img/jean.jpg",
    color: "#e8e8e8",
    dibujo: "pants",
    talles: ["28", "30", "32", "34"],
    descripcion: "Jean flare de tiro alto con lavado gris desgastado y bota muy amplia.",
    detalles: ["Lavado gris desgastado", "Tiro alto", "Bota flare amplia"]
  },
  {
    id: 11,
    nombre: "Polo con dragón y bandera",
    marca: "Polo",
    categoria: "hombre",
    precio: 95,
    precioAnterior: null,
    etiqueta: "",
    imagen: "img/polor.jpg",
    color: "#e8e8e8",
    dibujo: "tee",
    talles: ["S", "M", "L"],
    descripcion: "Polo turquesa con parche de bandera, dragón bordado en rojo y caracteres en la parte delantera.",
    detalles: ["Color turquesa", "Parche de bandera", "Dragón bordado", "Cuello con detalle en tela"]
  },
  {
    id: 12,
    nombre: "Remera Hysteric Buda",
    marca: "Hysteric",
    categoria: "hombre",
    precio: 70,
    precioAnterior: null,
    etiqueta: "Nuevo",
    imagen: "img/shirt.jpg",
    color: "#e8e8e8",
    dibujo: "tee",
    talles: ["S", "M", "L", "XL"],
    descripcion: "Remera negra de corte amplio con gran ilustración tibetana a color y la firma Hysteric en blanco.",
    detalles: ["Negro lavado", "Ilustración a color en el frente", "Firma Hysteric", "Corte amplio"]
  }
];
