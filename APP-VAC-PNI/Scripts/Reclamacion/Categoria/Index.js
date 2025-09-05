
var model = {
    "Id": "",
    "Descripcion": ""
};

var tabla = $('#tablaCategoria').DataTable({
        "scrollX": true,
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
            { "data": "Id", "title": "Numero Categoria" },
            { "data": "Descripcion", "title": "Categoria" },
            {
                "mRender": function (data, type, row) {
                    return `<button onclick="editCategoria('${row.Descripcion}','${row.Id}')" class="btn btn-primary">Editar</a>`;
                }, 'sortable': false, "title": 'Acciones'
            }
        ],
        "columnDefs": [
            { "className": "dt-center", "targets": "_all" }
        ],
        ajax: {
            "url": `${origen}/api/Categoria/ObtenerCategorias`,
            "type": "GET",
            "dataType": "json",
            "contentType": "application/json",
            "dataSrc": '',
            "error": function (jqXHR, statusCode, error) {
                console.error(error);
                $('#tablaCategoria').DataTable().clear().draw();
            }
        }
});

var editCategoria = function (texto,id) {
        $("#btn-operation").html("Actualizar");
        model.Id = id;
        model.Descripcion = texto;
        $("#categoria").val(texto);
}


var crearCategoria = function () {
    model.Descripcion = $("#categoria").val();
    AjaxPostOrUpdate(model);
}


var AjaxPostOrUpdate = function (model) {
    var form = $("#form-categoria");
    var modeloValido = form.valid();

    if (modeloValido) {
        Loading.iniciar();
        var textoSuccess = model.Id != null ? "Exito! Actualización satisfactoria." : "Exito! Registro satisfactorio.";

        $.ajax({
            url: `${origen}/api/Categoria/CrearCategoria`,
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
                    $("#btn-operation").html("Enviar");
                    $("#categoria").val("");
                    model = {
                        "Id": "",
                        "Descripcion": ""
                    };
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
