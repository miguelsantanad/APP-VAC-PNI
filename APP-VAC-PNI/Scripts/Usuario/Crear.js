
var $TableUsuario = null;
var $modalEditarUsuarios = $("#modalEditarUsuarios");
var $ContentPartialUsuario = $("#ContentPartialUsuario");




function OnBeginCrearUsuario()
{
    $('#GifContainer').removeClass('hidden');

}
function onSucessCrearUsuario(Result)
{
    DisplayMessage(Result, eventSuccess);
}

function eventSuccess()
{
    $('#GifContainer').addClass('hidden');
    $("#modalEditarUsuarios").modal('hide');
     $TableUsuario.api().ajax.reload(null, true);   
}


function onfaileCrearUsuario(Result)
{
    debugger;
    console.log(Result);
    swal("Completado", Result, "success");
}


$("#btnBuscar").click(function () {
    $TableUsuario.api().ajax.reload(null, true);
});

$(document).ready(function () {

    $("#Cedula").mask('999-9999999-9');

    $TableUsuario = $("#tblUsuarios").dataTable({
        paging: true,
        ordering: false,
        searching: false,
        Processing: true,
        serverSide: true,
        paginate: true,
        ajax: {
            url: GetUsuariosUrl,
            type: 'POST',
            data: function (d) {
                d.NombreConsulta = $("#NombreConsulta").val(),
                d.CodigoRegionConsulta = $("#CodigoRegionConsulta").val()
            }
        },
        columns: [

            { data: "Nombre", name: 'Nombre', sTitle: 'Nombre' },
            { data: 'Regional', name: 'Regional', sTitle: 'Regional' },
            { data: "Estado", name: 'Estado', sTitle: 'Estado' },
            { data: "Limitado", name: 'Limitado', sTitle: 'Limitado' },
            { data: "Rol", name: 'Rol', sTitle: 'Rol' },
            {
                sTitle: "Opción",
                data: 'Hash',
                bSearchable: false,
                bSortable: false,
                class: 'center',
                "mRender": function (data) {
                    var button = '<span class="btn btn-primary btnEditar" title="Presione para agregar este miembro al listado de nuevo miembros." data="' + data + '" >' +
                        ' <i class="fa fa-pencil-square-o" ></i > Editar estados de usuario  </span>';
                    return button;
                }
            }
        ],
        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
        Length: 5,
        lengthChange: false,
        oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
    });
          
});



$(document).on("click", ".btnEditar", function () {

    $('#GifContainer').removeClass('hidden');
    var datos = { Id: $(this).attr("data") };
    GetPartialViewResultConParametros(EditUrl, $ContentPartialUsuario, $modalEditarUsuarios, datos);

});

