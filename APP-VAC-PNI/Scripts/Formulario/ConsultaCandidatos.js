
$(document).ready(function () {

    if ($("#CodigoRegion").val() !== "" && $("#CodigoRegion").val() !== null) {
        if ($("#CodigoDistrito").val() !== "" && $("#CodigoDistrito").val() !== null) {
            $("#CodigoCargo").removeAttr('disabled');
            $("#CodigoPuesto").removeAttr('disabled');
        }
    }

    $("#Cedula").mask('999-9999999-9');

});

var $tblCandidatos = $("#tblCandidatos").dataTable({
    paging: true,
    ordering: false,
    searching: false,
    Processing: true,
    serverSide: true,
    paginate: true,
    ajax: {
        url: ConsultaCandidatosUrl,
        type: 'POST',
        data: function (d) {
            if (localStorage.Codigo !== "" && $("#CodigoRegion").val() !== "") {
                $("#CodigoPuesto").val(localStorage.Codigo);
            } else {
                localStorage.Codigo = "";
            }
            d.CodigoRegion = $("#CodigoRegion").val(),
                d.CodigoDistrito = $("#CodigoDistrito").val(),
                d.CodigoCargo = $("#CodigoCargo").val(),
                d.Cedula = $("#Cedula").val(),
                d.CodigoEstadoPrevalidacion = $("#CodigoEstadoPrevalidacion").val(),
                d.CodigoEstadoConsulta = $("#CodigoEstadoConsulta").val(),
                d.CodigoPuesto = $("#CodigoPuesto").val()
        }
    },
    columns: [
        { data: 'DistritoReside', name: 'DistritoReside', sTitle: 'Distrito' },
        { data: "Cedula", name: 'Cedula', sTitle: 'Cédula' },
        { data: "Nombres", name: 'Nombres', sTitle: 'Nombre' },
        { data: "Apellidos", name: 'Apellidos', sTitle: 'Apellido' },
        { data: "Nombre", name: 'Nombre', sTitle: 'Cargo aplicado' },
        { data: "DescripcionEstado", name: 'DescripcionEstado', sTitle: 'Estado' },
        //{ data: "DescripcionEstadoPrevalidacion", name: 'DescripcionEstadoPrevalidacion', sTitle: 'Estado Prevalidación' }, 
        {
            sTitle: "Opción",
            data: 'Cedula',
            bSearchable: false,
            bSortable: false,
            class: 'center',
            "mRender": function (data, e, row) {
                var button = '<a class="btn btn-primary btnVerDetalle" title="Presione para ver el detalle de este candidato." hash="' + row['CodigoCandidato'] + '" data="' + data + '"  href=#>' +
                    ' <i class="fa fa-pencil-square-o" ></i > Ver detalle  </a>';
                return button;
            }
        }
    ],
    lengthMenu: [[10, 10, 25, 50], [5, 10, 25, 50]],
    Length: 10,
    lengthChange: false,
    oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
});

$(document).on("change", "#CodigoRegion", function () {

    //  $('#GifContainer').removeClass('hidden');

    var RegionCodigo = $(this).val();
    $tblCandidatos.api().ajax.reload(null, false);
    LimpiarCampos();

    if (RegionCodigo === "" || isNaN(RegionCodigo) || RegionCodigo === null) {

        //$("#CodigoDistrito").empty();
        //   $('#GifContainer').addClass('hidden');
        $("#CodigoDistrito").empty();
        $("#CodigoDistrito").append(CreateElementOption());
        $("#CodigoCargo").val("");
        $("#CodigoPuesto").val("");
        $("#CodigoEstadoPrevalidacion").val("");
        $("#CodigoEstadoConsulta").val("");
        $("#CodigoPuesto").attr('disabled', 'disabled');
    } else {
        var datos = { CodigoRegion: RegionCodigo };
        var parametros = JSON.stringify(datos);
        ActualizaDropDownConParametro(GetDistritoByRegionUrl, $("#CodigoDistrito"), parametros);
    }


});

$(document).on("change", "#CodigoDistrito", function () {
    if ($(this).val() !== "" && !isNaN($(this).val()) && $(this).val() !== null) {
        $('#GifContainer').removeClass('hidden');
        $tblCandidatos.api().ajax.reload(null, false);
        $("#CodigoCargo").removeAttr('disabled');
        $('#GifContainer').addClass('hidden');
        $("#CodigoPuesto").removeAttr('disabled');
    } else {
        $("#CodigoCargo").val('');
        $("#CodigoCargo").attr('disabled', 'disabled');
        $("#CodigoPuesto").attr('disabled', 'disabled');
    }
});

$(document).on("change", "#CodigoCargo, #CodigoEstadoPrevalidacion, #CodigoEstadoConsulta , #CodigoPuesto", function () {

    localStorage.Codigo = $("#CodigoPuesto").val();
    $('#GifContainer').removeClass('hidden');
    $tblCandidatos.api().ajax.reload(null, false);
    $('#GifContainer').addClass('hidden');
});


$(document).on("click", ".btnVerDetalle", function () {
    var cedula = $(this).attr("data");
    window.location.href = ruta + 'Formulario/Index?Cedula=' + cedula;
});


$(document).on("click", "#btnBuscarCandidato", function () {
    $tblCandidatos.api().ajax.reload(null, false);
});

$(document).on("click", "#btnLimpiarCampos", function () {
    LimpiarTodosCampos();
});

$(document).on("keyup", "#Cedula", function (e) {
    var value = $(this).val();
    var code = e.which;
    if (code === 13) {
        if (value !== null && value !== "") {
            $tblCandidatos.api().ajax.reload(null, false);
        }
    }
});

function LimpiarCampos() {
    $("#CodigoCargo").val("");
    $("#CodigoCargo").attr('disabled', 'disabled');
    $("#Cedula").val("");
    $("#CodigoDistrito").val("");
}

function LimpiarTodosCampos() {
    $("#CodigoCargo").val("");
    $("#CodigoCargo").attr('disabled', 'disabled');
    $("#Cedula").val("");
    $("#CodigoDistrito").val("");
    $("#CodigoRegion").val("");
    $("#CodigoPuesto").val("");
    $("#CodigoEstadoConsulta").val();
    $tblCandidatos.api().ajax.reload(null, false);
}

$("#btnCambiarEstadoCandidato").click(function () {

    var EstadoCompletado = "4";
    var EstadoEnSeguimiento = "2";
    var CodigoEstadoPrevalidacion = $("#CodigoEstadoPrevalidacion").val();
    var rowCount = parseInt($("#tblCandidatos").find('tr').length);
    var CodigoCargo = $("#CodigoCargo").val();

    if (CodigoCargo !== "2") {
        swal("Precaución", "Estimado usuario para poder actualizar los registros debe elegir la opción de cargo docente en el campo o listado de cargo. ", "error");
        return;
    }

    if (rowCount > 2) {

        if (EstadoCompletado === CodigoEstadoPrevalidacion) {
            swal({
                title: "Atención",
                text: "¿Estimado usuario esta seguro de desea cambiar los registros actualmente filtrado por regional y distrito a el estado de admitido?",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false,
                buttons: {
                    cancel: {
                        text: "No",
                        value: false,
                        visible: true,
                        closeModal: true
                    },
                    confirm: {
                        text: "Sí",
                        value: true,
                        visible: true,
                        className: "confirmButton",
                        closeModal: true
                    }
                }
            }).then((registrar) => {

                if (registrar) {

                    $('#GifContainer').removeClass('hidden');

                    var url = ruta + 'Formulario/ActualizaCandidatoAdmitido';
                    var datosCandidato = GetCedulaCandidatos($("#tblCandidatos tr"));

                    var datos =
                    {
                        CodigoRegion: $("#CodigoRegion").val(),
                        CodigoDistrito: $("#CodigoDistrito").val(),
                        CandidatosVm: datosCandidato
                    };

                    var parametros = JSON.stringify(datos);

                    ActualizaEstadoCandidato(url, parametros);
                }
            });
        } else if (CodigoEstadoPrevalidacion === EstadoEnSeguimiento) {

            $("#modalEstadoCandidato").modal('show');
        }
    } else {
        swal("Precaución", "Estimado usuario no existen registros filtrados suficientes para actualizar.", "error");
    }
});

function GetCedulaCandidatos($Tr) {
    var DatosMiembros = null;

    $Tr.each(function () {

        var cedula = $(this).find('td').eq(7).find('a').attr('hash');

        if (cedula !== undefined && cedula !== null && cedula !== "") {

            var FormularioViewModel = {
                CodHash: cedula
            };

            if (DatosMiembros === null) {
                DatosMiembros = [FormularioViewModel];
            } else {
                DatosMiembros.push(FormularioViewModel);
            }
        }

    });

    return DatosMiembros;
}

$(document).on("click", "#btnGuardarEstadoCandidato", function () {

    var value = $("#CodigoEstado").val();

    if (value === null || value === "" || value === undefined) {
        swal("Precaución", "Favor elegir el estado de la lista para poder actualizar .", "error");
    } else {


        $('#GifContainer').removeClass('hidden');

        var url = ruta + 'Formulario/ActualizaEstadoCandidatoAnoAdmitido';
        var datosCandidato = GetCedulaCandidatos($("#tblCandidatos tr"));

        var datos =
        {
            CodigoRegion: $("#CodigoRegion").val(),
            CodigoDistrito: $("#CodigoDistrito").val(),
            CodigoEstado: $("#CodigoEstado").val(),
            CandidatosVm: datosCandidato

        };
        var parametros = JSON.stringify(datos);
        ActualizaEstadoCandidato(url, parametros);
    }

});

function ActualizaEstadoCandidato(Url, Parametros) {
    $.ajax(
        {
            url: Url,
            contentType: "application/json",
            type: "POST",
            data: Parametros,
            dataType: "json",
            success: function (data) {

                $tblCandidatos.api().ajax.reload(null, false);
                $('#GifContainer').addClass('hidden');
                swal("Atención", data.message, "success");

                $('#GifContainer').addClass('hidden');

            }, error: function () {
                $('#GifContainer').addClass('hidden');

                swal("Precaución", "Estimado usuario se ha producido un error inesprado favor de contactar el aministrador del sistema.", "error");
            }
        });
}
