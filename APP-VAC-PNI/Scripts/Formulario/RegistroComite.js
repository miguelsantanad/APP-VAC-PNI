
var $TableConsultaComisionEvaluadora;
//var $ContentPartialMiembroEvaluacionExistente = $("#ContentPartialMiembroEvaluacionExistente");
var $btnGuardarComisionEvaluadora = $("#btnGuardarComisionEvaluadora");


$(document).ready(function () {

    $("#Fecha").mask("99-99-9999");

});


//$(document).on("click", ".btnAgregar",
//    function () {
//        var MiembrosViewModel = GetMiembroViewModel($(this));
//        PintaTablaMiembro(MiembrosViewModel);
//    });

//function GetMiembroViewModel($this)
//{       
//            var ViewModel = null;

//            var hash = $this.attr("data");
//            var codigo = $this.parent().parent().children('td').eq(0).text();
//            var nombre = $this.parent().parent().children('td').eq(1).text();
//            var cedula = $this.parent().parent().children('td').eq(2).text();
        
//    if (!ExistMiembro(hash))
//    {

//    var Miembro =
//            {
//                CodigoMiembro: codigo,
//                Nombre: nombre,
//                Cedula: cedula,
//                Hash: hash
//            };

//            if (ViewModel === null) {
//                ViewModel = [Miembro];
//            } else {
//                ViewModel.push(Miembro);
//            }
//    }
//    return ViewModel;
//}


function GetMiembroViewModelFromTable() {

    var ViewModel = null;

    $("#tableMiembroComisionEvaluacion tbody tr").each(function () {
        
        var hash = $(this).find('td').eq(0).attr("data");
        var codigo = $(this).find('td').eq(0).text();
        var nombre = $(this).find('td').eq(0).text();
        var cedula = $(this).find('td').eq(1).text();

        if (!ExistMiembro(hash)) {

            var Miembro =
            {
                CodigoMiembro: codigo,
                Nombre: nombre,
                Cedula: cedula,
                Hash: hash
            };

            if (ViewModel === null) {
                ViewModel = [Miembro];
            } else {
                ViewModel.push(Miembro);
            }
        }        
    });

    return ViewModel;
}

function ExistMiembro(codigo)
{
    var result = false;
    $("#TableComisionEvaluadora tbody tr").each(function () {
        var value = $(this).find("td").eq(0).attr("data");        
        if (value === codigo) {
            swal("Atención", "Estimado usuario este miembro ya esta en la lista para ser agregado como nuevo miembro de esta comisión evaluadora.", "error");   
            result = true;
        }
    });
    return result;
}

//function PintaTablaMiembro(MiembroViewModel) {

//    if (MiembroViewModel !== null && MiembroViewModel !== "") {
//        MiembroViewModel.forEach(function (element) {

//            var $Tr = "";
//            $Tr += "<tr>";            
//            $Tr += "<td data=" + element.Hash + " data-Nombre=" + element.Nombre + " >" + element.Nombre + "</td>";
//            $Tr += "<td data-Cedula=" + element.Cedula + " >" + element.Cedula + "</td>";
//            $Tr += "<td>" + getActionButton(element.CodigoMiembro) + "</td>";
//            $Tr += "</tr>";
//            $("#TableComisionEvaluadora tbody").append($Tr);

//            $btnGuardarComisionEvaluadora.show();
//        });
//    }
//}

function getActionButton(CodigoMiembro) {
    
        Button = "<button type=\"button\" data-Id=" + CodigoMiembro + " title='Presione para remover este miembro' class=\"btn btn-danger btnRemoverMiembro\">";
        Button += " <i class=\"fa fa-pencil-square-o\"></i> Remover";
        Button += " </button>";

    return Button;
}

$(document).on("click", ".btnRemoverMiembro", function ()
{
    $(this).closest('tr').remove();

    var rowCount = $('#TableComisionEvaluadora >tbody >tr').length;    
    if (rowCount <= 0)
        $btnGuardarComisionEvaluadora.hide();

    return false;
});

$(document).on("click", "#btnCancelarComisionEvaluadora", function ()
{   
    $("#TableComisionEvaluadora tbody tr").remove();
    $btnGuardarComisionEvaluadora.hide();
    $("#Fecha").val('');
});

$('#Fecha').datepicker({
    onSelect: function (dateText, inst) {
        if (!validarFechaComisionEvaluadora(dateText)) {
            swal("Atención", "Estimado usuario la fecha no debe ser superior al día de hoy.", "warning");
            $('#Fecha').val('');
        } 
    },
    inline: true,
    dateFormat: 'dd-mm-yy',
    language: 'es'       
});


$('#Fecha').blur(function () {

    if ($(this).val() != "")
    {
       if (FechaEsValida($(this).val()))
        {
            if (!validarFechaComisionEvaluadora($(this).val())) {
                swal("Atención", "Estimado usuario la fecha no debe ser superior al día de hoy.", "warning");
                $('#Fecha').val('');
            }
        }        
    }    
 });




//function GetDatosFromTableComisionEvaluadora($Tr)
//{
//    var DatosMiembros = null;

//    $Tr.each(function () {

//        var codigo = $(this).find('td').eq(0).attr("data");
        
//        var Miembros = {
//            CodHash: codigo,
//            Fecha : $("#Fecha").val()
//        };

//        if (DatosMiembros === null) {
//            DatosMiembros = [Miembros]
//        } else {
//            DatosMiembros.push(Miembros);
//        }        
//    });

//    return DatosMiembros;
//}


$("#btnGuardarComisionEvaluadora").click(function ()
{
    var rowCount = $('#TableComisionEvaluadora >tbody >tr').length;

    if (rowCount >= 1) {
        if ($("#Fecha").val() != "" && $("#Fecha").val() != null) {
            var $Tr = $("#TableComisionEvaluadora tbody tr");
            var Datos = GetDatosFromTableComisionEvaluadora($Tr);
            Miembros = JSON.stringify(Datos);
            GuardaMiembros(GuardarComisionEvaluadoraUrl, Miembros);
        } else { swal("Atención", "Estimado usuario el campo fecha no puedes estar vacio. ", "warning"); }
    } else { swal("Atención", "Estimado usuario no existen miembro suficiente para crear la comisión evaluadora. ", "warning") }
    
});


//function GuardaMiembros(Url, Datos)
//{
//    $.ajax(
//        {
//            url: Url,
//            contentType: "application/json",
//            type: "POST",
//            data: Datos,
//            dataType: "json",
//            success: function (Result) {
//                DisplayMessage(Result, ClearTableComisionEvaluadora);
//            }, error: function () {

//            }
//        });    
//}

//function ClearTableComisionEvaluadora()
//{
//    $("#btnCancelarComisionEvaluadora").click();
//    $TableConsultaComisionEvaluadora.api().ajax.reload(null, true);
//}

$TableConsultaComisionEvaluadora = $("#TableConsultaComisionEvaluadora").dataTable({
            paging: true,
            ordering: false,
            searching: false,
            Processing: true,
            serverSide: true,
            paginate: true,
            ajax: {
                url: GetComisionEvaluadoraUrl,
                type: 'POST',
                data: function (d) {

                }
            },
            columns: [
                { data: 'Codigo', name: 'Codigo', sTitle: 'Codigo' },
                { data: "Nombre", name: 'Nombre', sTitle: 'Nombre' },
                { data: "Fecha", name: 'Fecha', sTitle: 'Fecha' },
                {
                    sTitle: "Opción",
                    data: 'Codigo',
                    bSearchable: false,
                    bSortable: false,
                    class: 'center',
                    "mRender": function (data) {
                        var button = '<a class="btn btn-primary btnVerMiembro" title="Presione para ver los miembros de esta comisión" data-Id='+data+' href=#>' +
                            ' <i class="fa fa-pencil-square-o" ></i > Ver miembros  </a>';
                        return button;
                    }
                }
            ],
            lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
            Length: 5,
            lengthChange: false,
            oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
});

$(document).on("click", ".btnVerMiembro",
    function () {

        $('#GifContainer').removeClass('hidden');

        var value = $(this).attr("data-Id");
        var datos = { CodigoComisionEvaluadora: value };

        GetPartialViewResultConParametros(GetPartialMiembrosComisionEvaluadoraUrl, $ContentPartialMiembroEvaluacionExistente
            ,null, datos);

});

$(document).on("click", "#btnReutilizarMiembro",
    function () {
        $("#btnCancelarComisionEvaluadora").click();
        var Datos = GetMiembroViewModelFromTable();
        PintaTablaMiembro(Datos);
        $("#btnTapRegistroComisionEvaluadora").click();        
    });












