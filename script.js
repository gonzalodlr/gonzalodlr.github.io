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
