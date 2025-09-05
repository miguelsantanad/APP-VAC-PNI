var CargosType = {
    Directivo: 1,
    Docente: 2
}

function GetMessageResult(Mensajes) {
    var mnsj = "";
   
    for (var i = 0, l = Mensajes.length; i < l; i++) {
        mnsj += "\n" + Mensajes[i] + "\n";
    }
  return mnsj;
}

function GetCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    var resutlArray = null;
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            var jsonResult = c.substring(name.length, c.length);
            resutlArray = JSON.parse(jsonResult);
        }
    }
    return resutlArray;
}

function SetDropDown(ArrayItems, $DropDwonList, ValueId) {
    $DropDwonList.empty();
    $DropDwonList.append(CreateElementOption());
    $(ArrayItems).each(function () {
        var option = CreateElementOption();                        
        option.val(this.CodRolesMiembrosComite);
        option.text(this.Descripcion);
        $DropDwonList.append(option);
    });

    if (!isNaN(ValueId) && ValueId !== null && ValueId !== "") {
        if (ValueId !== undefined)
            $DropDwonList.val(ValueId);
    }

   // $DropDwonList.trigger("chosen:updated");
}






function GetFechaActual()
{
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + d.getFullYear();       
        
    return output.trim();
}

function DisplayMessage(Result, SuccesFunction, FailFunction)
{
    var mensaje = GetMessageResult(Result.message);

    if (Result.success) {

        if (SuccesFunction !== null && SuccesFunction !== undefined)
            SuccesFunction();

        $('#GifContainer').addClass('hidden');

        swal("Completado", mensaje, "success");

    } else {
        if (FailFunction !== null && FailFunction !== undefined)
            FailFunction();

        $('#GifContainer').addClass('hidden');

        swal("Error", mensaje, "error");

    }
}

function GetPartialViewResultConParametros(Url, Content, Modal, Parametros) {

    $.ajax({
        data: Parametros,
        type: "POST",
        dataType: "html",
        url: Url,
        beforeSend: function (xhr) {
        }
    }).done(function (data, textStatus, jqXHR) {

        //Agregando debugger;
        //debugger;
        
        $('#GifContainer').addClass('hidden');
        Content.html('');
        Content.html(data);

        if (Modal !== null && Modal !== undefined)
            Modal.modal('show');

        $('form').removeData('validator');
        $('form').removeData('unobtrusiveValidation');
        ($.validator).unobtrusive.parse('form');
        
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#GifContainer').addClass('hidden');
        swal("Error", errorThrown.message, "error");

    });//Fin del ajax
}

var getDate = function (input) {
    return new Date(input.date.valueOf());
}

function validarFormatoFecha(campo) {
    var RegExPattern = "/^\d{1,2}\/\d{1,2}\/\d{2,4}$/";
    if ((campo.match(RegExPattern)) && (campo != '')) {
        return true;
    } else {
        return false;
    }
}

function validarFechaMenorActual(date)
{
    var x = new Date();
    var fecha = date.split("-");
    x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);

    var today = new Date();
    if (x >= today)
        return false;
    else
        return true;
}

function validarFechaComisionEvaluadora(date)
{
    var x = new Date();
    var fecha = date.split("-");
    x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
    var hoy = new Date();

    if (x > hoy)
        return false;
    else
        return true;
}

function FechaEsValida(fecha)
{
    var fechaf = fecha.split("-");
    var day = fechaf[0];
    var month = fechaf[1];
    var year = fechaf[2];
    var date = new Date(year, month, '0');
    if ((day - 0) > (date.getDate() - 0)) {
        return false;
    }
    return true;
}



$(document).ready(function () {

    $(".Fecha").datepicker({
        inline: true,
        dateFormat: 'dd-mm-yy',
        language: 'es'        
    });

    
});

function CreateElementOption() {
    var OptionDefaults = $(document.createElement('option'));
    OptionDefaults.text("- Seleccione -");
    OptionDefaults.val("");
    return OptionDefaults;
}

function ActualizaDropDownConParametro(Url, $DropDwonList, Parametros) {

    $DropDwonList.empty();
    $DropDwonList.append(CreateElementOption());

    $.ajax(
        {
            url: Url,
            contentType: "application/json",
            type: "POST",
            data: Parametros,
            dataType: "json",
            success: function (data) {

                var datos = data;

                $(datos).each(function () {
                    var option = CreateElementOption()
                    option.text(this.Text);
                    option.val(this.Value);
                    $DropDwonList.append(option);
                });
               // $DropDwonList.trigger("chosen:updated");
                $('#GifContainer').addClass('hidden');
            }, error: function () {

            }
        });
}




