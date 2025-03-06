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

        let item = '<div class="container mt-3">' +

            '<div class="row abc">' +
            '<p class="neo sp2">'+ proyecto.titulo +'1</p>' +
            '<p class="neo">' + proyecto.descripcion + '</p>' +
            '<div class="row xyz">' +
            '<div class="col col-sm-04 brd altC">Contenido 01' +
            '<div id="carouselExample" class="carousel slide">' +
            '<div class="carousel-inner">' +
            '<div class="carousel-item active">' +
            '<div class="carousel-inner">' + itemsCarusel + '</div>' +
            '</div>' +
            '</div>' +
            '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample"' +
            'data-bs-slide="prev">' +
            '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
            '<span class="visually-hidden">Previous</span>' +
            '</button>' +
            '<button class="carousel-control-next" type="button" data-bs-target="#carouselExample"' +
            '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
            '<span class="visually-hidden">Next</span>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '<div class="col col-sm-04 brd altC">' +
            '<p>Etiquetas</p>' +
            '<div>' + generarTags(proyecto.etiquetas) + '</div>' +
            '</div>' +
            '<div class="col col-sm-04 brd dfic">' +

            '<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">' +
            'Launch demo modal' +
            '</button>' +

            '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"' +
            'aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<h1 class="modal-title fs-5" id="exampleModalLabel">'+ proyecto.titulo +'</h1>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
            '</div>' +
            '<div class="modal-body">' +
            '' + proyecto.descripcion + '' +
            '<p class="sp2">Etiquetas</p>' +
            '<div>' + generarTags(proyecto.etiquetas) + '</div>' +
            '</div>' +
            '<img src="../IMG/Perfil.png" alt="Bootstrap" width="475" height="200">' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '</div>' +
            '</div>';

        $(".alingItem").append(item)

    }

};

function actualizarProy(idItem) {

    if (ValidadCampo()) {
      let item = {
        "titulo": $("#idTituloProyF").val(),
        "descripcion": $("#idDescProyF").text(),
        "fecha": $("#idFecProyF").val(),
        "tecnologias": $("#idTecProyF").val().split(";"),
        "etiquetas": $("#idEtiqProyF").val().split(";"),
        "imagenes": $("#idImgProyF").val().split(";")
      };
  
      $.ajax({
        url:  "http://localhost:777/api/todos/" + idItem,
        type: "PUT",
        async: false,
        cache: false,
        contentType: "application/json",
        data: JSON.stringify(item), // Convertir el objeto a JSON
        success: function (d) {
          getItems();
          proyectosTemporales = listaDeProyecytos;
          generarProyectos();
          $("#idModalForm").modal('hide');
        }
      });
  
    } else {
      $("#IdModalAdvert").modal('show');
    }
  }
  
  function editarProyectoV2(val) {
    let proyecto = getItem2(val);
  
    $("#idModalForm").modal('show');
  
    $("#idTituloForm").text("Editando " + proyecto.titulo);
  
    $("#idTituloProyF").val(proyecto.titulo);
    $("#idDescProyF").text(proyecto.descripcion);
    $("#idFecProyF").val(proyecto.fecha);
  
    let tecnologias = proyecto.tecnologias.join(";");
    let etiquetas = proyecto.etiquetas.join(";");
    let imagenes = proyecto.imagenes.join(";");
  
    $("#idTecProyF").val(tecnologias);
    $("#idEtiqProyF").val(etiquetas);
    $("#idImgProyF").val(imagenes);
  
    $("#idBtnGuardar").empty();
    $("#idBtnGuardar").append('<a class="btn btn-primary" onclick="actualizarProy(`' + proyecto._id + '`)">Guardar</a>');
  
  }
  
  function obtenerParam() {
  
    if (window.location.search != '') {
  
      let param = window.location.search
      param = param.split("=")[1];
      $("#idValor").val(param);
      buscarProyectos(param);
  
    }
  }
  
  function vistaprevia(val) {
    let proyecto = listaDeProyecytos.find(x => x._id == val);
    $("#TituloCambio").text(proyecto.titulo);
    $("#Desc").text(proyecto.descripcion);
  
  
  
  
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
  
    let item = ' <div class="card mb-3" style="max-width: 440px;">' +
      '<div class="row g-0">' +
      '<div class="col">' +
      '<div>' + generarTags(proyecto.etiquetas) + '</div>' +
      '<div id="carouselExample2' + proyecto._id + '" class="carousel slide">' +
      '<div class="carousel-inner">' + itemsCarusel + '</div>' +
      '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExample2' + proyecto._id + '" data-bs-slide="prev">' +
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
      '<span class="visually-hidden">Previous</span>' +
      '</button>' +
      '<button class="carousel-control-next" type="button" data-bs-target="#carouselExample2' + proyecto._id + '" data-bs-slide="next">' +
      '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
      '<span class="visually-hidden">Next</span>' +
      '</button>' +
      '</div>';
    $("#idSlider").empty();
    $("#idSlider").append(item);
    $("#vistamodal").modal('show');
  }
  
  function getItems() {
    let result = null;
    $.ajax({
      url: "http://localhost:777/api/todos",
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
      url: "http://localhost:777/api/todos/" + val,
      type: "GET",
      async: false,
      cache: false,
      success: function (d) {
        result = d;
      }
    });
    return result;
  }  