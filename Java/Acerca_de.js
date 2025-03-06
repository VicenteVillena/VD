$(document).ready(function () {
    getItems();
  
    proyectosTemporales = listaDeProyecytos
    generarProyectos();
  
    obtenerParam();
  
    $("#idValor").on("search", function () {
  
      proyectosTemporales = listaDeProyecytos;
      generarProyectos();
    });
  
  });
  
  let proyectosTemporales = [];
  
  let listaDeProyecytos = [];
  
  $("#idBuscar").on("click", function () {
  
    buscarProyectos($("#idValor").val());
  });
  
  function buscarProyectos(val) {
    proyectosTemporales = listaDeProyecytos;
    proyectosTemporales = proyectosTemporales.filter(x => x.titulo.includes(val));
  
    generarProyectos();
  };
  
  function generarTags(arr) {
    let resultado = "";
  
    if (arr != undefined && arr != null && arr.length > 0) {
      arr.forEach(e => {
        resultado += '<span class="badge text-bg-success">' + e + '</span>';
      });
    }
  
    return resultado;
  }

debugger

function generarProyectos() {

    $(".alingItem").empty();

    for (let i = 0; i < proyectosTemporales.length; i++) {
        const proyecto = proyectosTemporales[i];

        let itemsCarusel = "";

        if (proyecto.imagenes.length > 0) {

            for (let i = 0; i < proyecto.imagenes.length; i++) {
                if (i == 0) {
                    itemsCarusel += '<div class="carousel-item active">' +
                        '<img src="' + proyecto.imagenes[i] + '" class="d-block w-100" alt="...">' +
                        '</div>';
                } else {
                    itemsCarusel += '<div class="carousel-item">' +
                        '<img src="' + proyecto.imagenes[i] + '" class="d-block w-100" alt="...">' +
                        '</div>';
                }
            }

        } else {
            itemsCarusel = '<div class="carousel-item">' +
                ' <img src="..." class="d-block w-100" alt="...">' +
                '</div>';
        }

        let item = '<div class="card colorContainer" style="width: 16rem;">' +
        '<img src="' + tarjeta.imagen + '" class="card-img-top" alt="...">' +
        '<div class="card-body">' +
        '<h5 class="card-title">' + tarjeta.nombre + '</h5>' +
        '<p class="card-text">' + tarjeta.descripcion + '</p>' +
        '</div>' +
        '<div class="card-body">' +
        '<a href=' + tarjeta.redesLink + ' class="card-link">' + tarjeta.redes + '</a>' +
        '<a href=' + tarjeta.redesLink2 + ' class="card-link">' + tarjeta.redes2 + '</a>' +
        '</div>' +
        '</div>';

        $(".alingItem").append(item)

    }

};

  function getItems() {
    let result = null;
    $.ajax({
      url: "http://localhost:777/api/tarjeta/todos",
      type: "GET",
      async: false,
      cache: false,
      success: function (d) {
        listaDeProyecytos = [];
        listaDeProyecytos = d;
        console.log("Resultados obtenidos");
        console.log(listaDeProyecytos);
      }
    });
    return result;
  }
  
  function getItem2(val) {
    let result = null;
    $.ajax({
      url: "http://localhost:777/api/tarjeta/todos/" + val,
      type: "GET",
      async: false,
      cache: false,
      success: function (d) {
        result = d;
      }
    });
    return result;
  }  