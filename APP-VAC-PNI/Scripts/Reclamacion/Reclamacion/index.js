var model = {
    "ReclamosId": codReclamo,
   // "AnalistaId": usuario.Id,
    "Detalle": "",
    "CandidatoCorreo": "",
    "EstatusId": "",
    "Respuesta": "",
    "CategoriaId": "",
    "FaseId": "",
    "EnviaRespuesta": false
};

var tabla = $('#tablaReclamacion').DataTable({
    language: {
        "decimal": "",
        "emptyTable": "No hay información",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
        "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
        "infoFiltered": "(Filtrado de _MAX_ total entradas)",
        "infoPostFix": "",
        "thousands": ",",
        "lengthMenu": "Mostrar _MENU_ Entradas",
        "loadingRecords": "Cargando...",
        "processing": "Procesando...",
        "search": "Buscar:",
        "zeroRecords": "Sin resultados encontrados",
        "paginate": {
            "first": "Primero",
            "last": "Ultimo",
            "next": "Siguiente",
            "previous": "Anterior"
        }
    },
    "columns": [
        {
            "data": "Analista", "title": "Analista"
        },
        {
            "data": "Fecha", "title": "Fecha", "render": function (data) {
                moment.locale('es');
                return moment(data).format('LL');
            }
        },
        { "data": "Estado", "title": "Estado" },
        { "data": "Respuesta", "title": "Respuesta" },
        {
            "mRender": function (data, type, row) {
                return `<button onclick="editDetalleRecomendacion('${row.Id}','${row.CodigoTipoRespuesta > 0 ? row.CodigoTipoRespuesta : row.Respuesta}','${row.EstadoId}')" class="btn btn-primary">Editar</a>`;
            }, 'sortable': false, "title": 'Acciones'
        }
    ],
    "columnDefs": [
        { "className": "dt-center", "targets": "_all" }
    ],
    ajax: {
        "url": `${origen}/api/Reclamaciones/ObtenerDetalleReclamacion/${codReclamo}`,
        "type": "GET",
        "dataType": "json",
        "contentType": "application/json",
        "dataSrc": '',
        "error": function (jqXHR, statusCode, error) {
            console.error(error);
            $('#mitabla').DataTable().clear().draw();
        }
    }
});


$(document).on("change", "#CodigoTipoRespuesta", function () {

    var Codigo = parseInt($(this).val());

    if (Codigo <= 0) { $("#respuesta").val(""); return; }
        

        $.post(ObtenerDetalleRespuestaPorCodTipoUrl, { CodigoTipo: Codigo }, function (data) {
            $("#respuesta").val(data.Descripcion);
        }).done(function () {

        }).fail(function (error) {
            alert("error");
            console.error(error);
        });
        
});



var editDetalleRecomendacion = function (id, respuesta, estadoId) {

    $("#btn-operation").html("Actualizar");
    model.Id = id;

    if (respuesta > 0) {
        $("#CodigoTipoRespuesta").val(respuesta);
        $("#CodigoTipoRespuesta").change();
    } else
    {
        $("#respuesta").val(respuesta);
        $("#CodigoTipoRespuesta").val(0);
    }

    $("#estado").val(estadoId);
};

var crearDetalle = function (val) {

    model.EstatusId = $("#estado").val();
    model.Respuesta = $("#respuesta").val();
    model.CategoriaId = $("#categoria").val();
    model.FaseId = $("#fase").val();
    model.Detalle = $("#detalle").val();
    model.CandidatoCorreo = $("#correo").val();
    model.EnviaRespuesta = val;
    model.CodigoTipoRespuesta = $("#CodigoTipoRespuesta").val();

    $('#respuesta').attr('required', val);

    var cat = categorias.filter(x => x.Id == model.CategoriaId)[0];
    var estado = estados.filter(x => x.CodEstado == model.EstatusId)[0];

    if (val && (cat.Descripcion == "Sin categoria" || estado.Descripcion != 'Respondida')) {
        swal({
            title: "Error",
            text: 'Para enviar una respuesta el estado del reclamo debe ser "Respondida" y debes seleccionar una categoria',
            icon: "error",
            button: "Ok"
        }).then(function () {

        });
    } else if (!val && estado.Descripcion == 'Respondida') {
        swal({
            title: "Error",
            text: 'Para guardar cambios el estado del reclamo tiene que ser diferente a "Respondida"',
            icon: "error",
            button: "Ok"
        }).then(function () {

        });
    } else {
        AjaxPostOrUpdate(model);
    }

}


var AjaxPostOrUpdate = function (model) {
    var form = $("#form-reclamacion");
    var modeloValido = form.valid();

    if (modeloValido || !model.EnviaRespuesta) {
        Loading.iniciar();
        var textoSuccess = model.Id !== null ? "Exito! Actualización satisfactoria." : "Exito! Registro satisfactorio.";

        $.ajax({
            url: `${origen}/api/Reclamaciones/CrearDetalleReclamacion`,
            contentType: 'application/json',
            method: "POST",
            data: JSON.stringify(model),
            success: function (result) {
                Loading.finalizar();
                swal({
                    title: "Exito",
                    text: textoSuccess,
                    icon: "success",
                    button: "Ok"
                }).then(function () {
                    tabla.ajax.reload();
                    $("#btn-operation").html("Guardar cambios");
                    $("#viaRespuesta").val("");
                    $("#respuesta").val("");
                    $("#CodigoTipoRespuesta").val("0");
                });
            },
            error: function (request, msg, error) {
                Loading.finalizar();
                console.log("Error: " + request.responseText);
                swal({
                    title: "Error",
                    text: "Ha ocurrido un error",
                    icon: "error"
                }).then(function () {

                });
            }
        });
    }
}



