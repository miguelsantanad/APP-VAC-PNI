




$(document).ready(function () {

    if ($("#CodigoRegion").val() !== "" && $("#CodigoRegion").val() !== null) {
        if ($("#CodigoDistrito").val() !== "" && $("#CodigoDistrito").val() !== null) {
            $("#CodigoCargo").removeAttr('disabled');
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
            d.CodigoRegion = $("#CodigoRegion").val(),
                d.CodigoDistrito = $("#CodigoDistrito").val(),
                d.CodigoCargo = $("#CodigoCargo").val(),
                d.Cedula = $("#Cedula").val(),
                d.CodigoEstadoPrevalidacion = $("#CodigoEstadoPrevalidacion").val()
        }
    },
    columns: [
        { data: 'DistritoReside', name: 'DistritoReside', sTitle: 'Distrito' },
        { data: "Cedula", name: 'Cedula', sTitle: 'Cédula' },
        { data: "Nombres", name: 'Nombres', sTitle: 'Nombre' },
        { data: "Apellidos", name: 'Apellidos', sTitle: 'Apellido' },
        { data: "Nombre", name: 'Nombre', sTitle: 'Cargo aplicado' },
        { data: "DescripcionEstado", name: 'DescripcionEstado', sTitle: 'Estado' },
        { data: "DescripcionEstadoPrevalidacion", name: 'DescripcionEstadoPrevalidacion', sTitle: 'Estado Prevalidación' },
        {
            sTitle: "Opción",
            data: 'Cedula',
            bSearchable: false,
            bSortable: false,
            class: 'center',
            "mRender": function (data) {
                var button = '<a class="btn btn-primary btnVerDetalle" title="Presione para ver el detalle de este candidato." data="' + data + '"  href=#>' +
                    ' <i class="fa fa-pencil-square-o" ></i > Ver detalle  </a>';
                return button;
            }
        }
    ],
    lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
    Length: 5,
    lengthChange: false,
    oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
});

$(document).on("change", "#CodigoRegion", function () {

    //  $('#GifContainer').removeClass('hidden');

    var RegionCodigo = $(this).val();
    LimpiarCampos();

    if (RegionCodigo == "" || isNaN(RegionCodigo) || RegionCodigo == null) {

        //$("#CodigoDistrito").empty();
        //   $('#GifContainer').addClass('hidden');
        $("#CodigoDistrito").empty();
        $("#CodigoDistrito").append(CreateElementOption());
    } else {
        var datos = { CodigoRegion: RegionCodigo };
        var parametros = JSON.stringify(datos);
        ActualizaDropDownConParametro(GetDistritoByRegionUrl, $("#CodigoDistrito"), parametros);
    }


});

$(document).on("change", "#CodigoDistrito", function () {
    if ($(this).val() != "" && !isNaN($(this).val()) && $(this).val() != null) {
        $('#GifContainer').removeClass('hidden');
        $("#CodigoCargo").removeAttr('disabled');
        $('#GifContainer').addClass('hidden');
    } else {
        $("#CodigoCargo").val('');
        $("#CodigoCargo").attr('disabled', 'disabled');
    }
});



$(document).on("click", "#btnBuscarCandidato", function () {

    var CodigoRegion = $("#CodigoRegion").val();
    var CodigoDistrito = $("#CodigoDistrito").val();
    var CodigoCargo = $("#CodigoCargo").val();

    if (CodigoRegion === null || CodigoRegion === "" || CodigoRegion === undefined)
    {
        swal("Atención", "Estimado usuario favor selecceione una región para poder acceder al reporte.", "warning");
        return;
    }
    
    if (CodigoCargo !== null && CodigoCargo !== "" && CodigoCargo !== undefined) {
        window.open(ruta + 'Formulario/ReporteCandidatosPDF?CodigoRegion=' + CodigoRegion + '&CodigoDistrito=' + CodigoDistrito + '&CodigoCargo=' + CodigoCargo, '_blank');
    } else {
        swal("Atención", "Estimado usuario favor seleccione el cargo para poder acceder al reporte.", "warning");
    }

});

$(document).on("click", "#btnLimpiarCampos", function () {
    LimpiarTodosCampos();
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
    $tblCandidatos.api().ajax.reload(null, false);
}
