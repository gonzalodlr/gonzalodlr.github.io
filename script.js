/** @format */

/* =========================================================
   DATOS
   Para añadir o ampliar un proyecto basta con editar este array.
   ========================================================= */
const PROYECTOS = [
  {
    id: "ezmenu",
    titulo: "ezMenu",
    img: "img/proyectos/ezMenu.png",
    tags: ["Python", "Flask", "JavaScript"],
    resumen: "Aplicación web que integra dos APIs para buscar alimentos y recetas, crear la lista de la compra y exportarla como menú en PDF con QR.",
    descripcion: [
      "Proyecto de Integración de Sistemas Informáticos. El requisito era consumir dos APIs distintas, integrar sus datos y construir sobre ellas una aplicación de empresa.",
      "El resultado es una aplicación web para buscar alimentos y recetas, añadirlos a una lista de la compra y exportarla a PDF con formato de menú. Además genera un código QR que apunta a ese PDF para acceder al menú de forma rápida.",
    ],
    puntos: ["Integración de dos APIs externas", "Backend en Python con Flask", "Generación de PDF y código QR"],
    enlaces: [{ texto: "Código fuente", url: "https://github.com/gonzalodlr/isi-ezMenu" }],
  },
  {
    id: "kmeans",
    titulo: "K-means cluster",
    img: "img/proyectos/k-means.png",
    tags: ["Java", "MySQL"],
    resumen: "Sistema cliente-servidor en Java que agrupa datos almacenados en MySQL con el algoritmo de clustering K-means.",
    descripcion: [
      "Proyecto de Programación Avanzada durante mi año de Erasmus. Construye agrupaciones de datos mediante el algoritmo K-means a partir de tablas almacenadas en MySQL.",
      "Incluye arquitectura cliente-servidor y serialización/deserialización de los clusters, lo que me ayudó a profundizar mucho en Java.",
    ],
    puntos: ["Algoritmo K-means", "Arquitectura cliente-servidor", "Serialización de objetos y persistencia en MySQL"],
    enlaces: [{ texto: "Código fuente", url: "https://github.com/gonzalodlr/K-Means" }],
  },
  {
    id: "crawler",
    titulo: "SocialMediaCrawler",
    img: "img/proyectos/crawler.png",
    tags: ["Python", "Flask", "Node.js"],
    resumen: "Rastreador web que recorre un dominio y descubre las redes sociales asociadas a él.",
    descripcion: [
      "Crawler desarrollado para la asignatura de Gestión de Sistemas de Información.",
      "Recopila datos de una página web para obtener las redes sociales que pertenecen a ese dominio, combinando un backend en Python Flask con Node.js.",
    ],
    puntos: ["Rastreo y análisis de HTML", "API en Flask", "Servicios auxiliares en Node.js"],
    enlaces: [{ texto: "Código fuente", url: "https://github.com/gonzalodlr/SocialMediaCrawler" }],
  },
  {
    id: "gomera",
    titulo: "Gomera",
    img: "img/proyectos/gomera.png",
    tags: ["Python", "HDF5", "IA"],
    resumen: "Estudio del terreno a partir de datos geográficos para comparar algoritmos de búsqueda y encontrar caminos eficientes.",
    descripcion: [
      "Proyecto de Sistemas Inteligentes basado en un estudio geográfico del terreno, con los datos contenidos en un fichero HDF5.",
      "El objetivo es entender y comparar los distintos algoritmos de búsqueda y encontrar caminos eficientes en función de la información disponible.",
    ],
    puntos: ["Lectura de datos geográficos en HDF5", "Algoritmos de búsqueda", "Comparativa de eficiencia de caminos"],
    enlaces: [{ texto: "Código fuente", url: "https://github.com/SI-CR/lab-c1-3" }],
  },
  {
    id: "ipokemon",
    titulo: "IPOkemon",
    img: "img/proyectos/ipokemon.png",
    tags: ["C#", ".NET", "WPF"],
    resumen: "Aplicación de escritorio con personajes animados diseñados en Blend, fichas de habilidades y un minijuego.",
    descripcion: [
      "Aplicación de escritorio en C# para la asignatura de Interacción Persona-Ordenador.",
      "Permite visualizar personajes diseñados con Blend en WPF, consultar sus características y habilidades y jugar a un pequeño juego de captura y combate que aprovecha las animaciones de los propios diseños.",
    ],
    puntos: ["Diseño vectorial y animaciones con Blend", "Interfaz centrada en la usabilidad", "Minijuego de captura y combate"],
    enlaces: [{ texto: "Código fuente", url: "https://github.com/gonzalodlr/ipokemon" }],
  },
  {
    id: "shifter",
    titulo: "Sequential Shifter",
    img: "img/proyectos/shifter.webp",
    tags: ["Arduino", "Hardware"],
    resumen: "Cambio de marchas secuencial casero para un simulador de conducción, con microinterruptores y Arduino.",
    descripcion: [
      "Proyecto personal para mi simulador de conducción: un cambio secuencial construido a mano.",
      "Dos microinterruptores soldados a una placa se leen con Arduino, que se configura como dispositivo de entrada para subir y bajar marchas en el simulador.",
    ],
    puntos: ["Montaje y soldadura del hardware", "Programación del microcontrolador", "Integración con el software del simulador"],
    enlaces: [{ texto: "Ver vídeo", url: "https://vm.tiktok.com/ZGebeHAKL/" }],
  },
];

const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* =========================================================
   TEMA
   ========================================================= */
function temaActual() {
  const t = document.documentElement.dataset.theme;
  if (t) return t;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function alternarTema() {
  const nuevo = temaActual() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nuevo;
  try {
    localStorage.setItem("tema", nuevo);
  } catch (e) {}
  malla.leerColor();
}

$("#tema").addEventListener("click", alternarTema);

/* =========================================================
   MALLA DE FONDO: puntos que se conectan entre sí y con el cursor
   ========================================================= */
const malla = (() => {
  const canvas = $("#malla");
  const ctx = canvas.getContext("2d");
  const raton = { x: -9999, y: -9999 };
  const DIST = 130;
  const DIST_RATON = 190;
  let puntos = [];
  let ancho, alto, color, acento;

  function leerColor() {
    const css = getComputedStyle(document.documentElement);
    color = css.getPropertyValue("--malla").trim();
    acento = css.getPropertyValue("--malla-acento").trim();
    if (sinMovimiento) dibujar();
  }

  function redimensionar() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = window.innerWidth;
    alto = window.innerHeight;
    canvas.width = ancho * dpr;
    canvas.height = alto * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(110, Math.round((ancho * alto) / 14000));
    puntos = Array.from({ length: n }, () => ({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));
    if (sinMovimiento) dibujar();
  }

  function linea(a, b, rgb, alfa) {
    ctx.strokeStyle = `rgba(${rgb}, ${alfa})`;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function dibujar() {
    ctx.clearRect(0, 0, ancho, alto);
    ctx.lineWidth = 1;
    for (let i = 0; i < puntos.length; i++) {
      const p = puntos[i];
      if (!sinMovimiento) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > ancho) p.vx *= -1;
        if (p.y < 0 || p.y > alto) p.vy *= -1;
      }

      const dr = Math.hypot(p.x - raton.x, p.y - raton.y);
      const cerca = dr < DIST_RATON ? 1 - dr / DIST_RATON : 0;

      for (let j = i + 1; j < puntos.length; j++) {
        const q = puntos[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < DIST) linea(p, q, color, 0.07 * (1 - d / DIST) + 0.12 * cerca * (1 - d / DIST));
      }
      if (cerca) linea(p, raton, acento, 0.45 * cerca);

      ctx.fillStyle = cerca ? `rgba(${acento}, ${0.35 + 0.5 * cerca})` : `rgba(${color}, 0.22)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.4 + cerca, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function bucle() {
    if (!document.hidden) dibujar();
    requestAnimationFrame(bucle);
  }

  window.addEventListener("resize", redimensionar);
  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    raton.x = e.clientX;
    raton.y = e.clientY;
    if (sinMovimiento) dibujar();
  });
  document.documentElement.addEventListener("mouseleave", () => {
    raton.x = raton.y = -9999;
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => leerColor());

  leerColor();
  redimensionar();
  if (!sinMovimiento) bucle();

  return { leerColor };
})();

/* =========================================================
   CABECERA: menú móvil, sección activa y borde al hacer scroll
   ========================================================= */
const nav = $("#nav");
const botonMenu = $("#menu");

botonMenu.addEventListener("click", () => {
  const abierto = nav.classList.toggle("abierto");
  botonMenu.setAttribute("aria-expanded", abierto);
});

$$("a", nav).forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", false);
  })
);

const observadorNav = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      $$("a", nav).forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id));
    }
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
$$("main > section").forEach((s) => observadorNav.observe(s));

/* =========================================================
   PROYECTOS
   ========================================================= */
const lista = $("#lista-proyectos");
const modal = $("#modal");

lista.innerHTML = PROYECTOS.map(
  (p) => `
  <article class="tarjeta proyecto revelar" data-id="${p.id}">
    <div class="marco"><img src="${p.img}" alt="" loading="lazy"></div>
    <div class="proyecto-cuerpo">
      <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <h3>${p.titulo}</h3>
      <p>${p.resumen}</p>
      <button class="ver" aria-label="Ver detalle de ${p.titulo}">Ver detalle <svg><use href="#i-flecha"/></svg></button>
    </div>
  </article>`
).join("");

function abrirProyecto(id) {
  const p = PROYECTOS.find((x) => x.id === id);
  if (!p) return;
  $("#modal-contenido").innerHTML = `
    <div class="marco"><img src="${p.img}" alt="Captura de ${p.titulo}"></div>
    <div class="modal-cuerpo">
      <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      <h3 id="modal-titulo">${p.titulo}</h3>
      ${p.descripcion.map((d) => `<p>${d}</p>`).join("")}
      ${p.puntos?.length ? `<h4>Lo más destacado</h4><ul>${p.puntos.map((x) => `<li>${x}</li>`).join("")}</ul>` : ""}
      <div class="cta">
        ${p.enlaces
          .map(
            (e, i) =>
              `<a class="btn ${i === 0 ? "btn-primario" : ""}" href="${e.url}" target="_blank" rel="noopener">${e.texto} <svg><use href="#i-flecha"/></svg></a>`
          )
          .join("")}
      </div>
    </div>`;
  modal.showModal();
  modal.scrollTop = 0;
}

lista.addEventListener("click", (e) => {
  const tarjeta = e.target.closest(".proyecto");
  if (tarjeta) abrirProyecto(tarjeta.dataset.id);
});

// Cerrar diálogos con el botón o haciendo clic fuera
for (const d of [modal, $("#paleta")]) {
  d.addEventListener("click", (e) => {
    if (e.target === d || e.target.closest("[data-cerrar]")) d.close();
  });
}

/* =========================================================
   CONTADORES + ENTRADA SUAVE AL HACER SCROLL
   ========================================================= */
function contar(el) {
  const fin = +el.dataset.contar;
  if (sinMovimiento) return;
  const inicio = performance.now();
  const paso = (t) => {
    const k = Math.min(1, (t - inicio) / 1200);
    el.textContent = Math.round(fin * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
}

const observadorRevelar = new IntersectionObserver(
  (entradas) => {
    for (const e of entradas) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("visible");
      $$("[data-contar]", e.target).forEach(contar);
      observadorRevelar.unobserve(e.target);
    }
  },
  { threshold: 0.1 }
);

// Retraso escalonado para los elementos que comparten contenedor
$$(".revelar").forEach((el) => {
  const hermanos = $$(":scope > .revelar", el.parentElement);
  el.style.setProperty("--retraso", Math.min(hermanos.indexOf(el), 5) * 0.06 + "s");
  observadorRevelar.observe(el);
});

/* =========================================================
   PALETA DE BÚSQUEDA (Ctrl/⌘ + K)
   ========================================================= */
const paleta = $("#paleta");
const entrada = $("#paleta-input");
const listaPaleta = $("#paleta-lista");
let seleccion = 0;
let resultados = [];

const COMANDOS = [
  { texto: "Inicio", tipo: "Sección", accion: () => irA("#inicio") },
  { texto: "Sobre mí", tipo: "Sección", accion: () => irA("#sobremi") },
  { texto: "Skills", tipo: "Sección", accion: () => irA("#skills") },
  { texto: "Proyectos", tipo: "Sección", accion: () => irA("#proyectos") },
  { texto: "Contacto", tipo: "Sección", accion: () => irA("#contacto") },
  ...PROYECTOS.map((p) => ({ texto: p.titulo, tipo: "Proyecto", accion: () => abrirProyecto(p.id) })),
  { texto: "Cambiar tema claro / oscuro", tipo: "Acción", accion: alternarTema },
  { texto: "Abrir LinkedIn", tipo: "Enlace", accion: () => window.open("https://www.linkedin.com/in/gonzalodlr/", "_blank", "noopener") },
  { texto: "Abrir GitHub", tipo: "Enlace", accion: () => window.open("https://github.com/gonzalodlr", "_blank", "noopener") },
];

function irA(sel) {
  $(sel).scrollIntoView({ behavior: sinMovimiento ? "auto" : "smooth" });
}

function normalizar(s) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function pintarPaleta() {
  const q = normalizar(entrada.value.trim());
  resultados = COMANDOS.filter((c) => normalizar(c.texto + " " + c.tipo).includes(q));
  seleccion = Math.min(seleccion, Math.max(0, resultados.length - 1));
  listaPaleta.innerHTML = resultados.length
    ? resultados
        .map((c, i) => `<li role="option" data-i="${i}" aria-selected="${i === seleccion}">${c.texto}<small>${c.tipo}</small></li>`)
        .join("")
    : `<li class="vacio">Sin resultados</li>`;
  $('[aria-selected="true"]', listaPaleta)?.scrollIntoView({ block: "nearest" });
}

function abrirPaleta() {
  entrada.value = "";
  seleccion = 0;
  pintarPaleta();
  paleta.showModal();
  entrada.focus();
}

function ejecutar(i) {
  const c = resultados[i];
  if (!c) return;
  paleta.close();
  c.accion();
}

$("#abrir-paleta").addEventListener("click", abrirPaleta);
entrada.addEventListener("input", () => {
  seleccion = 0;
  pintarPaleta();
});
entrada.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
    e.preventDefault();
    const n = resultados.length || 1;
    seleccion = (seleccion + (e.key === "ArrowDown" ? 1 : n - 1)) % n;
    pintarPaleta();
  } else if (e.key === "Enter") {
    ejecutar(seleccion);
  }
});
listaPaleta.addEventListener("click", (e) => {
  const li = e.target.closest("li[data-i]");
  if (li) ejecutar(+li.dataset.i);
});

window.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    paleta.open ? paleta.close() : abrirPaleta();
  }
});

if (/Mac|iPhone|iPad/.test(navigator.platform)) $(".btn-paleta kbd").textContent = "⌘ K";

$("#anio").textContent = new Date().getFullYear();
