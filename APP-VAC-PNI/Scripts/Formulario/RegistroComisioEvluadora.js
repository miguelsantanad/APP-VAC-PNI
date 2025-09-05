
var $TableMiembroComite;
//var $TableConsultaComisionEvaluadora;
var $TableConsultaComisionEvaluadora;
var $ModalComisionEvaluadora = $("#modalComisionEvaluadora");
var $ModalMiembrosComite = $("#modalMiembrosComite");
var $ContentComisionesEvaluadora = $("#ContentComisionesEvaluadora");
var $ContentPartialMiembroEvaluacionExistente = $("#ContentPartialMiembroEvaluacionExistente");
var $PanelMiembrosDeConsultaComisionEvaluadora = $("#PanelMiembrosDeConsultaComisionEvaluadora");
var $panelContentTablaMiembroSeleccionado = $("#panelContentTablaMiembroSeleccionado");
var $btnGuardarComisionEvaluadora = $("#btnGuardarComisionEvaluadora");
var $ContentComisionEvaluadoraElegida =  $("#contentComisionEvaluadoraElegida");

$(document).ready(function () {

    $("#Fecha").mask("99-99-9999");
    $("#txtFechaEvaluacion").mask("99-99-9999");

    var cedulaValue = $("#txtCedula").val();    
    if (cedulaValue !== "" && cedulaValue !== null)
    {        
       
        $("#drpAcciones").val("1");                
        $('#VerificarDocumentos').removeClass('hidden');
        $("#comisionEvaluadora").removeClass('hidden');
     
    }
       
});


$(document).on("change", "#CodigoRegionComisionEvaluadora", function () {
  
    var RegionCodigo = $(this).val();
    if (RegionCodigo === "" || RegionCodigo === null) {
        $("#CodigoDistritoComisionEvaluadora").empty();
    } else {
        var datos = { CodigoRegion: RegionCodigo };
        var parametros = JSON.stringify(datos);
        ActualizaDropDownConParametro(GetDistritoComisionEvaludoraByRegionUrl, $("#CodigoDistritoComisionEvaluadora"), parametros);
    }

});


$TableMiembroComite = $("#TableMiembroComite").dataTable({
    paging: true,
    ordering: false,
    searching: false,
    Processing: true,
    serverSide: true,
    paginate: true,
    ajax: {
        url: GetMiembrosComiteUrl,
        type: 'POST',
        data: function (d) {
            d.CampoBusqueda = $("#CampoBusqueda").val()
        }
    },
    columns: [
        { data: 'Codigo', name: 'Codigo', sTitle: 'Codigo' },
        { data: "Nombre", name: 'Nombre', sTitle: 'Nombre' },
        { data: "Cedula", name: 'Cedula', sTitle: 'Cédula' },
        {
            sTitle: "Opción",
            data: 'Hash',
            bSearchable: false,
            bSortable: false,
            class: 'center',
            "mRender": function (data) {
                var button = '<a class="btn btn-primary btnAgregar" title="Presione para agregar este miembro al listado de nuevo miembros." data="' + data + '"  href=#>' +
                    ' <i class="fa fa-pencil-square-o" ></i > Agregar  </a>';
                return button;
            }
        }
    ],
    lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
    Length: 5,
    lengthChange: false,
    oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
});


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
                var button = '<a class="btn btn-primary btnVerMiembroComisionExistente" title="Presione para ver los miembros de esta comisión" data-Id=' + data + ' href=#>' +
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


$('.FechaComisionEvaluadora').datepicker({
    onSelect: function (dateText, inst) {
        if (!validarFechaComisionEvaluadora(dateText)) {
            swal("Atención", "Estimado usuario la fecha no debe ser superior al día de hoy.", "warning");
            $('#txtFechaEvaluacion').val('');
        }else {
                $('#GifContainer').removeClass('hidden');
            var datos = { Fecha: $('#txtFechaEvaluacion').val(), CodigoCandidato: $('#txtCodCandidato').val() };
               GetPartialViewResultConParametros(GetPartialMiembrosPorFechaComisionEvaluadoraUrl, $ContentComisionEvaluadoraElegida, null, datos);
               $("#contentComisionEvaluadoraElegida").removeClass('hidden');  
            //if ($(".ComisionEvaluadoraNoEncontrada").is(':visible'))
            //{

            //}
        }
    },
    inline: true,
    dateFormat: 'dd-mm-yy',
    language: 'es'
});


function InicializaDatosComisionCalificadora(Fecha)
{
    if (!validarFechaComisionEvaluadora(Fecha)) {
        swal("Atención", "Estimado usuario la fecha no debe ser superior al día de hoy.", "warning");
        $('#txtFechaEvaluacion').val('');
    } else {
        $('#GifContainer').removeClass('hidden');
        var datos = { Fecha: $('#txtFechaEvaluacion').val(), CodigoCandidato: $('#txtCodCandidato').val() };
        GetPartialViewResultConParametros(GetPartialMiembrosPorFechaComisionEvaluadoraUrl, $ContentComisionEvaluadoraElegida, null, datos);
        $("#contentComisionEvaluadoraElegida").removeClass('hidden');
        //if ($(".ComisionEvaluadoraNoEncontrada").is(':visible')) {

        //}
    }
}


$(document).on("click", "#btnBuscarComisionPorCodigo", function () {

    var CodigoComision = $("#txtCodigoComisionEvaluadora").val();
    if (CodigoComision !== "" && CodigoComision !== null)
    {
        if (parseInt(CodigoComision) > 0)
        {
            var datos = { Codigo: CodigoComision, CodigoCandidato: $('#txtCodCandidato').val() };
            GetPartialViewResultConParametros(GetPartialMiembrosPorCodigoComisionEvaluadoraUrl, $ContentComisionEvaluadoraElegida, null, datos);
            $("#contentComisionEvaluadoraElegida").removeClass('hidden');          
        }
        
    }
});




$(document).on("click", ".btnVerMiembro",
    function () {

        $('#GifContainer').removeClass('hidden');

        var value = $(this).attr("data-Id");
        var datos = { CodigoComisionEvaluadora: value };

        GetPartialViewResultConParametros(GetPartialMiembrosComisionEvaluadoraUrl, $ContentPartialMiembroEvaluacionExistente
            , null, datos);

});

function cargarMiembroComisionEvaluadora(codigoComisinoEvaluadora,panelToUpdate)
{
    $('#GifContainer').removeClass('hidden');
        
    var datos = { CodigoComisionEvaluadora: codigoComisinoEvaluadora };

    GetPartialViewResultConParametros(GetPartialMiembrosComisionEvaluadoraUrl, panelToUpdate
        , null, datos);
}

function cargarMiembroSelecionadoPorComisionEvaluadora(codigoComisinoEvaluadora, panelToUpdate) {

    $('#GifContainer').removeClass('hidden');
    $ContentComisionEvaluadoraElegida.removeClass('hidden');
    var datos = { CodigoComisionEvaluadora: codigoComisinoEvaluadora };

    GetPartialViewResultConParametros(GetPartialMiembrosSeleccionadosUrl, panelToUpdate
        , null, datos);
}



$(document).on("click", ".chkComisionEvaluadora", function () {

    var name = $(this).attr("id");
    var countCheck = 0;

    if (name != undefined && name != null && name != "") {

        $("#tableComisionEvaludora tbody tr").each(function () {

            //checkbox
            var $input = $(this).find('td').eq(2).find('input');

            if ($input.is(':checked') && $input.attr("id") != name) {
                $input.attr("checked", false);
            }
        });

        cargarMiembroComisionEvaluadora($(this).attr("data-Id"), $ContentPartialMiembroEvaluacionExistente);

    } else {
        cancelarSeleccionComision();         
    }

    countCheck = validaComisionesSelecionada();
    if (countCheck > 1) {
        cancelarSeleccionComision();   
    }
});

function cancelarSeleccionComision()
{     
    swal("Atención", "Se ha detectado inyección y manipulación del html, la operación ha sido cancelada.", "warning");   

    $("#tableComisionEvaludora tbody tr").each(function () {

        //checkbox
        var $input = $(this).find('td').eq(2).find('input');

        if ($input.is(':checked')) {
            $input.attr("checked", false);
        }
    });

    $ModalComisionEvaluadora.modal("hide");
}



$(document).on("click", "#btnCancelarComisionEvaluadora", function () {
    $("#TableComisionEvaluadora tbody tr").remove();
    $btnGuardarComisionEvaluadora.hide();
    $("#Fecha").val('');
});


//$(document).on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {

//    var rowCount = $('#TableComisionEvaluadora >tbody >tr').length;
//    if (rowCount >= 1)
//        $("#modalMiembrosComite").scrollTop(1000);
//});

$(document).on("click", "#btnTapConsultaComisionEvaludora", function () {

    $TableConsultaComisionEvaluadora.api().ajax.reload(null, true);
});

$(document).on("click", ".btnVerMiembroComisionExistente",
    function () {

        $('#GifContainer').removeClass('hidden');

        var value = $(this).attr("data-Id");
        var datos = { CodigoComisionEvaluadora: value };

        GetPartialViewResultConParametros(GetPartialMiembrosComisionEvaluadoraUrl, $PanelMiembrosDeConsultaComisionEvaluadora
            , null, datos);

        $([document.documentElement, document.body]).animate({
            scrollTop: $("#PanelMiembrosDeConsultaComisionEvaluadora").offset().top
        }, 1000);

    });

function validaComisionesSelecionada() {

    var count = 0;

    $("#tableComisionEvaludora tbody tr").each(function () {        
        //checkbox
        var $input = $(this).find('td').eq(2).find('input');
        if ($input.is(':checked')) {
            count += 1;
        }
    });

    return count;
}



function PintaTablaComisionElegida(MiembroViewModel) {

    if (MiembroViewModel !== null && MiembroViewModel !== "") {
        MiembroViewModel.forEach(function (element) {

            var $Tr = "";
            $Tr += "<tr>";
            $Tr += "<td data=" + element.Codigo + " data-Nombre=" + element.Nombre + " >" + element.Nombre + "</td>";
            $Tr += "<td data-Cedula=" + element.Fecha + " >" + element.Fecha + "</td>";
            $Tr += "<td>" + getActionButton(element.Codigo) + "</td>";
            $Tr += "</tr>";
            $("#tableComisionEvaludoraSelecionada tbody").append($Tr);

            $("#lblComisionEvaluadora").text(element.Nombre);
            $btnGuardarComisionEvaluadora.show();
        });
    }
}

function getDropDown(CodigoMiembro)
{

    DropDown = "<select class=\"form-control DrowDownListCandidato\"  data-val-required=\"El campo rol es  requerido\" id='DrowDownListCandidato" + CodigoMiembro + "' name='DrowDownListCandidato" + CodigoMiembro +"' >";
    DropDown += " <option value=''> -Seleccione- </option>";
    DropDown += "</select> <span style='display:none;color:red'>Campo requerido </span> ";

    return DropDown;
}

function getActionButton(CodigoMiembro) {

    Button = "<button type=\"button\" data-Id=" + CodigoMiembro + " title='Presione para remover esta comisión evaluadora' class=\"btn btn-danger btnRemoverComision\">";
    Button += " <i class=\"fa fa-pencil-square-o\"></i> Remover";
    Button += " </button>";

    return Button;
}




function getCheckBox(CodigoMiembro)
{
    Button = "<input type=\"checkbox\" data-id=" + CodigoMiembro + " class=\"form-control chkMiembro\" checked style=\"width: 30px;\" />";    
    return Button;
}


$(document).on("click", ".btnRemoverComision", function () {

    $(this).closest('tr').remove();
    $("#txtFechaEvaluacion").val('');    
});

function GetDatosComisionEvaluadora() {


    $("#tableComisionEvaludora tbody tr").each(function () {
        
        //checkbox
        var $input = $(this).find('td').eq(2).find('input');

        if ($input.is(':checked'))
        {
            $("#lblComisionEvaluadora").text($(this).find('td').eq(0).attr("data-nombre"));
            $("#txtCodComisionEvaluadora").val($input.attr("data-id"));
            return false;    
        }       
    });

}


function ExisteComisionEvaluadora(codigo) {
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

    if ($(this).val() != "") {
        if (FechaEsValida($(this).val())) {
            if (!validarFechaComisionEvaluadora($(this).val())) {
                swal("Atención", "Estimado usuario la fecha no debe ser superior al día de hoy.", "warning");
                $('#Fecha').val('');
            }
        }
    }
});

$(document).on("click", "#btnDesbloquearCampo", function () {
    $("#Nombre").attr("readonly", false).val('');
    $("#Cedula").attr("readonly", false).val('');
    $("#btnDesbloquearCampo").addClass("hidden");
});






$("#btnGuardarComisionEvaluadora").click(function () {

    var rowCount = $('#TableComisionEvaluadora >tbody >tr').length;
    var $Tr = $("#TableComisionEvaluadora tbody tr");

    if (!$("#FrmComisionEvaluadora").valid())
        return;

    if (!ValidaRolesMiembro($Tr))
        return;

    if (rowCount >= 1) {
        if ($("#Fecha").val() != "" && $("#Fecha").val() != null) {           
            var Datos = GetDatosFromTableComisionEvaluadora($Tr);
            Miembros = JSON.stringify(Datos);
            GuardaMiembros(GuardarComisionEvaluadoraUrl, Miembros);
        } else { swal("Atención", "Estimado usuario el campo fecha no puedes estar vacio. ", "warning"); }
    } else { swal("Atención", "Estimado usuario no existen miembro suficiente para crear la comisión evaluadora. ", "warning") }

});

function GetDatosFromTableComisionEvaluadora($Tr) {
    var DatosMiembros = null;

    $Tr.each(function () {

        var codigo = $(this).find('td').eq(0).attr("data");
        var $DropDownListCargo = $(this).find('td').eq(2).find("select");

        var Miembros = {
            CodHash: codigo,
            Fecha: $("#Fecha").val(),
            CodigoRegionComisionEvaluadora: $("#CodigoRegionComisionEvaluadora").val(),
            CodigoDistritoComisionEvaluadora: $("#CodigoDistritoComisionEvaluadora").val(),
            CodRolesMiembrosComite: $DropDownListCargo.val(),
            CodigoTipoComision: $("#CodigoTipoComision").val()
        };

        if (DatosMiembros === null) {
            DatosMiembros = [Miembros]
        } else {
            DatosMiembros.push(Miembros);
        }
    });

    return DatosMiembros;
}


function ValidaRolesMiembro($Tr)
{
    var success = true;

    $Tr.each(function () {

        var $DropDownList = $(this).find('td').eq(2).find("select");
        var $SpanError = $(this).find('td').eq(2).find("span");

        if ($DropDownList.val() === "" || $DropDownList.val() === null)
        {
            $SpanError.show();
            success = false;
        }
    });

    return success;
}


function GuardaMiembros(Url, Datos) {
    $.ajax(
        {
            url: Url,
            contentType: "application/json",
            type: "POST",
            data: Datos,
            dataType: "json",
            success: function (Result) {
                DisplayMessage(Result, ClearTableComisionEvaluadora);
                
                if ($("#ConsultaCandidatosPanel").is(":visible"))
                {             
                    $("#txtCodComisionEvaluadora").val(Result.codigoComisionEvaluadora);
                    $("#lblComisionEvaluadora").text(Result.nombre);
                    //$panelContentTablaMiembroSeleccionado;
                    $("#tableComisionEvaludoraSelecionada tbody tr").remove();
                    debugger;
                    cargarMiembroSelecionadoPorComisionEvaluadora(Result.codigoComisionEvaluadora, $panelContentTablaMiembroSeleccionado);
                }

            }, error: function () {

            }
        });
}

function ClearTableComisionEvaluadora() {
    $("#btnCancelarComisionEvaluadora").click();
    $TableConsultaComisionEvaluadora.api().ajax.reload(null, true);
}

$(document).on("click", ".btnAgregar",
    function () {

        var Codigo = $(this).attr("data");
        var Parametros = null;
        var TomarEncuentaSuperUsuario = false;
        var tablaName = '';

        if ($("#ConsultaCandidatosPanel").is(":visible")) {
            //se agrega a la tabla que esta en el panel correspondiente a los datos del candidatos.
            tablaName = 'tableMiembroComisionSelecionados';
            TomarEncuentaSuperUsuario = false;
            Parametros = { CodigoMiembroComite: Codigo, TomarEncuentaSuperUsuario: TomarEncuentaSuperUsuario };
            var MiembrosViewModel = GetMiembroViewModel($(this), tablaName);           
        } else {
            //Se agregan a la tabla del modal para crear una nueva comisión evaluadora
            tablaName = 'TableComisionEvaluadora';
            TomarEncuentaSuperUsuario = true;
            Parametros = { CodigoMiembroComite: Codigo, TomarEncuentaSuperUsuario: TomarEncuentaSuperUsuario };
            var MiembrosViewModel = GetMiembroViewModel($(this), tablaName);           
        }

        var Datos = JSON.stringify(Parametros);    

        $.ajax(
            {
                url: ConfirmaRegionalMimebroComiteUrl,
                contentType: "application/json",
                type: "POST",
                data: Datos,
                dataType: "json",
                success: function (Result) {

                    if (Result.Success) {

                        if (tablaName === 'tableMiembroComisionSelecionados') {
                            if (MiembrosViewModel != null) {
                                AddRowTableMiembroComisionSelecionados(MiembrosViewModel);
                                $ModalMiembrosComite.modal('hide');
                            }
                        } else {
                            PintaTablaNuemvoMiembro(MiembrosViewModel);
                        }
                      
                    } else {

                        swal("Atención", Result.Message, "warning");
                    }           
                }, error: function (Result) {
                    debugger;
                    var Mensaje = Result.responseText;
                    swal("Atención", Mensaje, "warning");
                }
            });
        
    });

$(document).on("click", "#btnLlamarCreacionDeComision", function () {

    $("#btnTapConsultaComisionEvaludora").click();
    $("#btnNuevaComisionEvaluacion").click();

});


function GetMiembroViewModel($this,tablaName) {
    var ViewModel = null;

    debugger;

    var hash = $this.attr("data");
    var codigo = $this.parent().parent().children('td').eq(0).text();
    var nombre = $this.parent().parent().children('td').eq(1).text();
    var cedula = $this.parent().parent().children('td').eq(2).text();

    switch (tablaName) {
        case 'TableComisionEvaluadora':
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

            break;
        case 'tableMiembroComisionSelecionados':
            if (!ExistMiembroTableMiembroComisionSelecionados(hash)) {

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
            break;
    }

    return ViewModel;
}

$(document).on("click", "#btnNuevaComisionEvaluacion", function () {
    $ModalMiembrosComite.modal('show');
    $("#Cedula").val('');
});

$(document).on("click", "#btnAgregarMiembroComisionEvaluadora", function ()
{
    //$("#Fecha").val($("#txtFechaEvaluacion").val());
    //var $tr = $("#tableMiembroComisionSelecionados tbody tr");
    //var Datos = GetMiembroViewModelFromTable($tr);
    //PintaTablaMiembro(Datos);

    $ModalMiembrosComite.modal('show');
});



$(document).on("click", "#btnModificarComisionEvaluadora",
    function () {     
        
        var rowCount = $('#tableMiembroComisionEvaluacion >tbody >tr').length;
        if (rowCount > 0) {
            $("#Fecha").val($("#txtFechaEvaluacion").val());
            $("#TableComisionEvaluadora tbody tr").remove();
            var $tr = $("#tableMiembroComisionEvaluacion tbody tr");            
            var Datos = GetMiembroViewModelFromTable($tr);
            PintaTablaMiembro(Datos);
            $ModalComisionEvaluadora.modal('hide');
            $ModalMiembrosComite.modal('show');
        } else
        {
            swal("Atención", "Estimado usuario no existen miembro suficiente para poder continuar. ", "warning")
        }        
   
    });

$ModalComisionEvaluadora.on('hide.bs.modal', function () {
   // $("#tableMiembroComisionEvaluacion tbody tr").remove();

});

$ModalMiembrosComite.on('show.bs.modal', function () {
    $TableMiembroComite.api().ajax.reload(null, true);        
});

$ModalMiembrosComite.on('hide.bs.modal', function () {
    $("#TableComisionEvaluadora tbody tr").remove();
    $('body').css("overflow", "scroll");
});


function GetMiembroViewModelFromTable($tr) {

    var ViewModel = null;

    $tr.each(function () {

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

function PintaTablaMiembro(MiembroViewModel) {

    if (MiembroViewModel !== null && MiembroViewModel !== "") {
        MiembroViewModel.forEach(function (element) {

            var $Tr = "";
            $Tr += "<tr>";
            $Tr += "<td data=" + element.Hash + " data-Nombre=" + element.Nombre + " >" + element.Nombre + "</td>";
            $Tr += "<td data-Cedula=" + element.Cedula + " >" + element.Cedula + "</td>";
            $Tr += "<td></td>"; 
            $Tr += "</tr>";
            $("#TableComisionEvaluadora tbody").append($Tr);

            $btnGuardarComisionEvaluadora.show();
        });
        $("#modalMiembrosComite").scrollTop(1000);

    }
}

$(document).on("change", "#CodigoTipoComision", function ()
{
    CargarListadoRoles($(this));
        
});

$(document).on("change", ".DrowDownListCandidato", function () {

    var datos = $(this).val();
    if (datos === "" || datos === null) {
        $(this).closest("td").find("span").show();
    } else {
        $(this).closest("td").find("span").hide();
    }
        
});



function CargarListadoRoles($DropDownList)
{
    var value = $DropDownList.val();

    CargaDropDownRoles(value);

    if (value === "" || value == null) {
        $(".DrowDownListCandidato").empty();
        $(".DrowDownListCandidato").append(CreateElementOption());
    }
}

function CargaDropDownRoles(value)
{
    if (value === "1") {

        $(".DrowDownListCandidato").each(function () {
            $DropDwonList = $(this);
            var Roles = GetCookie("RolesDirectores");
            if (Roles !== null)
                SetDropDown(Roles, $DropDwonList, null);
        });

    } else if (value === "2") {

        $(".DrowDownListCandidato").each(function () {
            $DropDwonList = $(this);
            var Roles = GetCookie("RolesDocente");
            if (Roles !== null)
                SetDropDown(Roles, $DropDwonList, null);
        });
    }
}



function PintaTablaNuemvoMiembro(MiembroViewModel) {

    if (MiembroViewModel !== null && MiembroViewModel !== "") {
        MiembroViewModel.forEach(function (element) {

            var $Tr = "";
            $Tr += "<tr>";
            $Tr += "<td data=" + element.Hash + " data-Nombre=" + element.Nombre + " >" + element.Nombre + "</td>";
            $Tr += "<td data-Cedula=" + element.Cedula + " >" + element.Cedula + "</td>";
            $Tr += "<td>" + getDropDown(element.CodigoMiembro) + "</td>";
            $Tr += "<td>" + getActionButton(element.CodigoMiembro) + "</td>";
            $Tr += "</tr>";
            $("#TableComisionEvaluadora tbody").append($Tr);

            $btnGuardarComisionEvaluadora.show();

            CargaDropDownRoles($("#CodigoTipoComision").val())

        });
        $("#modalMiembrosComite").scrollTop(1000);

    }
}


function AddRowTableMiembroComisionSelecionados(MiembroViewModel) {

    if (MiembroViewModel !== null && MiembroViewModel !== "") {
        MiembroViewModel.forEach(function (element) {

            var $Tr = "";
            $Tr += "<tr>";
            $Tr += "<td data=" + element.Hash + " data-Nombre=" + element.Nombre + " >" + element.Nombre + "</td>";
            $Tr += "<td data-Cedula=" + element.Cedula + " >" + element.Cedula + "</td>";
            $Tr += "<td>" + getDropDown(element.CodigoMiembro) + "</td>";
            $Tr += "<td align=\"center\" >" + getCheckBox(element.CodigoMiembro) + "</td>";
            $Tr += "</tr>";
            $("#tableMiembroComisionSelecionados tbody").append($Tr);
            CargaDropDownRoles($("#txtTipoComision").val())

            $btnGuardarComisionEvaluadora.show();
        });
        $("#modalMiembrosComite").scrollTop(1000);

    }
}


function PintaTablaMiembroElegidos(MiembroViewModel) {

    if (MiembroViewModel !== null && MiembroViewModel !== "") {
        MiembroViewModel.forEach(function (element) {

            var $Tr = "";
            $Tr += "<tr>";
            $Tr += "<td data=" + element.Hash + " data-Nombre=" + element.Nombre + " >" + element.Nombre + "</td>";
            $Tr += "<td data-Cedula=" + element.Cedula + " >" + element.Cedula + "</td>";
            $Tr += "</tr>";

            $("#tableComisionEvaludoraSelecionada tbody").append($Tr);        
        });        
    }
}



function ExistMiembro(codigo) {
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

function ExistMiembroTableMiembroComisionSelecionados(codigo) {
    var result = false;
    $("#tableMiembroComisionSelecionados tbody tr").each(function () {
        var value = $(this).find("td").eq(0).attr("data");
        if (value === codigo) {
            swal("Atención", "Estimado usuario este miembro ya esta en la lista para ser agregado como nuevo miembro de esta comisión evaluadora.", "error");
            result = true;
        }
    });
    return result;
}