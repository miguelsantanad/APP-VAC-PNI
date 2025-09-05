

$(".Fecha").datepicker({
    inline: true,
    dateFormat: 'dd-mm-yy'
});



function validarFecha(date) {
    var x = new Date();
    var fecha = date.split("-");
    x.setFullYear(fecha[2], fecha[1] - 1, fecha[0]);
    var hoy = new Date();

    if (x > hoy)
        return false;
    else
        return true;
}


function validate_fechaMayorQue(fechaInicial, fechaFinal) {
    valuesStart = fechaInicial.split("-");
    valuesEnd = fechaFinal.split("-");
    // Verificamos que la fecha no sea posterior a la actual
    var dateStart = new Date(valuesStart[2], (valuesStart[1] - 1), valuesStart[0]);
    var dateEnd = new Date(valuesEnd[2], (valuesEnd[1] - 1), valuesEnd[0]);
    if (dateStart > dateEnd) {
        return 0;
    }
    return 1;
}




var Objeto = null;

function setObjet(Obj) {
    Objeto = Obj;
}



$.fn.formSerializeToJson = function () {

    var data = {};
    var controls = this.serializeArray();
    $.each(controls, function () {
        if (data[this.id] !== undefined) {
            if (!data[this.id].push) {
                data[this.name] = [data[this.id]];
            }
            data[this.name].push(this.value || '');
        } else {
            data[this.name] = this.value || '';
        }
    });
    return data;
};

function GetCookie(cookieName){
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

function SetDropDown(ArrayItems, $DropDwonList,ValueId) {
    $DropDwonList.empty();
    $DropDwonList.append(CreateElementOption());
    $(ArrayItems).each(function () {
        var option = CreateElementOption();
        option.val(this.Codigo);
        option.text(this.Nombre);        
        $DropDwonList.append(option);
    });

    if (!isNaN(ValueId) && ValueId !== null && ValueId !== "")
    {
        if (ValueId !== undefined)
          $DropDwonList.val(ValueId);
    }

    //$DropDwonList.trigger("chosen:updated");
}




function GetMessageResult( Mensajes)
{
    var mnsj = "";
    Mensajes.forEach(function (element) {
        mnsj += element;
    });
    return mnsj;
}

function DisplayMessage(Result, SuccesFunction, FailFunction)
{
    var mensaje = GetMessageResult(Result.Mensaje);

    if (Result.Success) {

        if (SuccesFunction !== null && SuccesFunction !== undefined)
            SuccesFunction();
           toastr.success(mensaje, "Completado");        
    }else
    {
        if (FailFunction !== null && FailFunction !== undefined)
            FailFunction();

        if (Result.Warning)
            toastr.warning(mensaje, "Alerta");

        if (Result.Warning === false)
              toastr.error(mensaje, "Error");        
    }
}

$.fn.ClearForm = function () {

    this.find('input').each(function () {    
        $(this).val("");
        if ($(this).attr('Id') === "Codigo")
        {
            $(this).val("0");
        }
       
    });
}


function ejecutarObjeto(Accion)
{
    if (Objeto !== null && Accion === "DataTable")
        Objeto.api().ajax.reload(null, true);

    Objeto = null;
};

function GetPartialViewResult(Url, Content, Modal) {
    $.ajax({
        data: {

        },
        type: "POST",
        dataType: "html",
        url: Url,
        beforeSend: function (xhr) {
        }
    }).done(function (data, textStatus, jqXHR) {
     
        Content.html('');
        Content.html(data);

        if (Modal !== null && Modal !== undefined)
            Modal.modal('show');

        $('form').removeData('validator');
        $('form').removeData('unobtrusiveValidation');
        ($.validator).unobtrusive.parse('form');

    }).fail(function (jqXHR, textStatus, errorThrown) {

        toastr.error(errorThrown.message, "Error");

    });//Fin del ajax
}

function GetPartialViewResultConParametros(Url, Content, Modal,Parametros) {
    $.ajax({
        data: Parametros,
        type: "POST",
        dataType: "html",
        url: Url,
        beforeSend: function (xhr) {
        }
    }).done(function (data, textStatus, jqXHR) {

        Content.html('');
        Content.html(data);

        if (Modal !== null && Modal !== undefined)
            Modal.modal('show');

        $('form').removeData('validator');
        $('form').removeData('unobtrusiveValidation');
        ($.validator).unobtrusive.parse('form');

    }).fail(function (jqXHR, textStatus, errorThrown) {

        toastr.error(errorThrown.message, "Error");

    });//Fin del ajax
}


function ActualizaDropDown(Url, $DropDwonList)
{
    $DropDwonList.empty();
    $DropDwonList.append(CreateElementOption());

    $.ajax(
        {
            url: Url,
            contentType: "application/json",
            type: "POST",
            data: '',
            dataType: "json",
            success: function (data) {
                var datos = data;
                $(datos).each(function () {
                    var option = CreateElementOption()
                    option.text(this.Text);
                    option.val(this.Value);
                    $DropDwonList.append(option);
                });
                //$DropDwonList.trigger("chosen:updated");

            }, error: function () {

            }
        });    
}

function ActualizaDropDownById(Url, $DropDwonList, $DropValueId ) {

    $DropDwonList.empty();
    $DropDwonList.append(CreateElementOption());

    $.ajax(
        {
            url: Url,
            contentType: "application/json",
            type: "POST",
            data:'{DropValueId:' + $DropValueId + '}',
            dataType: "json",
            success: function (data) {
                var datos = data;
                $(datos).each(function () {
                    var option = CreateElementOption()
                    option.text(this.Text);
                    option.val(this.Value);
                    $DropDwonList.append(option);
                });
                //$DropDwonList.trigger("chosen:updated");

            }, error: function () {
            }
        });
}


function ExcuteAction(Url, Parametros) {
    var result = null;
    $.ajax(
        {
            url: Url,
            contentType: "html",
            type: "POST",
            data: Parametros,
            dataType: "json",
            success: function (Result) {
                
            }, error: function () {

            }
        });

    return result;
}

function ActualizaDropDownConParametro(Url, $DropDwonList, Parametros)
{

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
                //$DropDwonList.trigger("chosen:updated");

            }, error: function () {

            }
        });
}

function CreateElementOption()
{
    var OptionDefaults = $(document.createElement('option'));
        OptionDefaults.text("- Seleccione -");
        OptionDefaults.val("");
        return OptionDefaults;
}

