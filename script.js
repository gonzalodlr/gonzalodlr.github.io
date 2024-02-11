/** @format */

// Descargar cv
function abrirPDF() {
  // Ruta del archivo PDF en la carpeta 'src'
  var rutaPDF = "src/CV.pdf";

  // Abre una nueva pestaña con el PDF
  window.open(rutaPDF, "_blank");
}

let menuVisible = false;
//Función que oculta o muestra el menu
function mostrarOcultarMenu() {
  if (menuVisible) {
    document.getElementById("nav").classList = "";
    menuVisible = false;
  } else {
    document.getElementById("nav").classList = "responsive";
    menuVisible = true;
  }
}

function seleccionar() {
  //oculto el menu una vez que selecciono una opcion
  document.getElementById("nav").classList = "";
  menuVisible = false;
}
//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades() {
  var skills = document.getElementById("skills");
  var distancia_skills =
    window.innerHeight - skills.getBoundingClientRect().top;
  if (distancia_skills >= 300) {
    let habilidades = document.getElementsByClassName("progreso");
    habilidades[0].classList.add("java");
    habilidades[1].classList.add("python");
    habilidades[2].classList.add("c-");
    habilidades[3].classList.add("c");
    habilidades[4].classList.add("sql");
    habilidades[5].classList.add("htmlcss");
    habilidades[6].classList.add("efectividad");
    habilidades[7].classList.add("trabajo");
    habilidades[8].classList.add("creatividad");
    habilidades[9].classList.add("dedicacion");
    habilidades[10].classList.add("adaptacion");
    habilidades[11].classList.add("resolutivo");
  }
}

//detecto el scrolling para aplicar la animacion de la barra de habilidades
window.onscroll = function () {
  efectoHabilidades();
};
