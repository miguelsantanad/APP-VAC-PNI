var PuntuacionCompetencia1 = [0, 0];
var PuntuacionCompetencia2 = [0, 0];
var PuntuacionCompetencia3 = [0, 0];

$("#CedulaCandidato").mask("999-9999999-9");

//Competencia 1
$(document).on("click", ".RptPreg1Competencia1", function () {

    var result = ValidaFormulario('RptPreg1Competencia1');


    $(".RptPreg1Competencia1").each(function () {
        if ($(this).is(":checked")) {
            $(this).click();
        }
    });

    var CheckBoxName = $(this).attr('Id');

    PuntuacionCompetencia1[0] = 0;

    if ($('#' + CheckBoxName + '').is(':checked')) {
        if (CheckBoxName === "RptPreg1Competencia1A")
            PuntuacionCompetencia1[0] = 1;
        if (CheckBoxName === "RptPreg1Competencia1B")
            PuntuacionCompetencia1[0] = 3;
        if (CheckBoxName === "RptPreg1Competencia1C")
            PuntuacionCompetencia1[0] = 5;
        
    }
    sumarPuntuacionCompetencia1();
});
         
$(document).on("click", ".RptPreg2Competencia1", function () {

    var result = ValidaFormulario('RptPreg2Competencia1');

    $(".RptPreg2Competencia1").each(function () {
        if ($(this).is(":checked")) {
            $(this).click();
        }
    });

    var CheckBoxName = $(this).attr('Id');

    PuntuacionCompetencia1[1] = 0;

    if ($('#' + CheckBoxName + '').is(':checked')) {
        if (CheckBoxName === "RptPreg2Competencia1A")
            PuntuacionCompetencia1[1] = 1;
        if (CheckBoxName === "RptPreg2Competencia1B")
            PuntuacionCompetencia1[1] = 3;
        if (CheckBoxName === "RptPreg2Competencia1C")
            PuntuacionCompetencia1[1] = 5;
    }
    sumarPuntuacionCompetencia1();

});

//Competencia 2
$(document).on("click", ".RptPreg1Competencia2", function () {

    var result = ValidaFormulario('RptPreg1Competencia2');

    $(".RptPreg1Competencia2").each(function () {
        if ($(this).is(":checked")) {
            $(this).click();
        }
    });

    var CheckBoxName = $(this).attr('Id');

    PuntuacionCompetencia2[0] = 0;

    if ($('#' + CheckBoxName + '').is(':checked')) {
        if (CheckBoxName === "RptPreg1Competencia2A")
            PuntuacionCompetencia2[0] = 1;
        if (CheckBoxName === "RptPreg1Competencia2B")
            PuntuacionCompetencia2[0] = 3;
        if (CheckBoxName === "RptPreg1Competencia2C")
            PuntuacionCompetencia2[0] = 5;
    }
    sumarPuntuacionCompetencia2();

});

$(document).on("click",".RptPreg2Competencia2",function () {

    var result = ValidaFormulario('RptPreg2Competencia2');

    $(".RptPreg2Competencia2").each(function () {
        if ($(this).is(":checked")) {
            $(this).click();
        }
    });

    var CheckBoxName = $(this).attr('Id');

    PuntuacionCompetencia2[1] = 0;

    if ($('#' + CheckBoxName + '').is(':checked')) {
        if (CheckBoxName === "RptPreg2Competencia2A")
            PuntuacionCompetencia2[1] = 1;
        if (CheckBoxName === "RptPreg2Competencia2B")
            PuntuacionCompetencia2[1] = 3;
        if (CheckBoxName === "RptPreg2Competencia2C")
            PuntuacionCompetencia2[1] = 5;
    }
    sumarPuntuacionCompetencia2();

});

//competencia 3
$(document).on("click",".RptPreg1Competencia3",function () {

    var result = ValidaFormulario('RptPreg1Competencia3');

    $(".RptPreg1Competencia3").each(function () {
        if ($(this).is(":checked")) {
            $(this).click();
        }
    });

    var CheckBoxName = $(this).attr('Id');

    PuntuacionCompetencia3[0] = 0;

    if ($('#' + CheckBoxName + '').is(':checked')) {
        if (CheckBoxName === "RptPreg1Competencia3A")
            PuntuacionCompetencia3[0] = 1;
        if (CheckBoxName === "RptPreg1Competencia3B")
            PuntuacionCompetencia3[0] = 3;
        if (CheckBoxName === "RptPreg1Competencia3C")
            PuntuacionCompetencia3[0] = 5;
    }
    sumarPuntuacionCompetencia3();

});

$(document).on("click",".RptPreg2Competencia3",function () {

    var result = ValidaFormulario('RptPreg2Competencia3');

    $(".RptPreg2Competencia3").each(function () {
        if ($(this).is(":checked")) {
            $(this).click();
        }
    });

    var CheckBoxName = $(this).attr('Id');

    PuntuacionCompetencia3[1] = 0;

    if ($('#' + CheckBoxName + '').is(':checked')) {
        if (CheckBoxName === "RptPreg2Competencia3A")
            PuntuacionCompetencia3[1] = 1;
        if (CheckBoxName === "RptPreg2Competencia3B")
            PuntuacionCompetencia3[1] = 3;
        if (CheckBoxName === "RptPreg2Competencia3C")
            PuntuacionCompetencia3[1] = 5;
    }
    sumarPuntuacionCompetencia3();

});



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


function OnSuccessGuardarEntrevista(Result) {    
    if (Result.Success) {
        toastr.success(Result.Message);
        $("#ContentPartialEntrevista").html('');
        $("#CedulaCandidato").val("");       
    } else {
        toastr.warning(Result.Message);
    }    
}

function OnCompleteGuardarEntrevista(Result)
{
    debugger;

}



function OnFailGuardarEntrevista(result) {
    toastr.error(result.responseText, "Error");         
}

function OnCompleteCagarPartial()
{
    $("form").removeData("validator");
    $("form").removeData("unobtrusiveValidation");
    //$.validator.unobtrusive.parse("form");

    var value = $("#CodigoEntrevistaHash").val();
    if (value !== null && value !== "" && value !== undefined)
    {
         InicializaPregunta1Competencia1();
         InicializaPregunga2Competencia1();
        
         InicializaPregunga1Competencia2();
         InicializaPregunga2Competencia2();
        
         InicializaPregunga1Competencia3();
         InicializaPregunga2Competencia3();
    }
}


function InicializaPregunta1Competencia1()
{
    $(".RptPreg1Competencia1").each(function () {
        if ($(this).is(":checked")) {

            var CheckBoxName = $(this).attr('Id');

            PuntuacionCompetencia1[0] = 0;

            if ($('#' + CheckBoxName + '').is(':checked')) {
                if (CheckBoxName === "RptPreg1Competencia1A")
                    PuntuacionCompetencia1[0] = 1;
                if (CheckBoxName === "RptPreg1Competencia1B")
                    PuntuacionCompetencia1[0] = 3;
                if (CheckBoxName === "RptPreg1Competencia1C")
                    PuntuacionCompetencia1[0] = 5;
            }
        }
    });
     
    sumarPuntuacionCompetencia1();
}

function InicializaPregunga2Competencia1()
{
    $(".RptPreg2Competencia1").each(function () {
        if ($(this).is(":checked")) {

            var CheckBoxName = $(this).attr('Id');

            PuntuacionCompetencia1[1] = 0;

            if ($('#' + CheckBoxName + '').is(':checked')) {
                if (CheckBoxName === "RptPreg2Competencia1A")
                    PuntuacionCompetencia1[1] = 1;
                if (CheckBoxName === "RptPreg2Competencia1B")
                    PuntuacionCompetencia1[1] = 3;
                if (CheckBoxName === "RptPreg2Competencia1C")
                    PuntuacionCompetencia1[1] = 5;
            }
            
        }
    });
    
    sumarPuntuacionCompetencia1();    
}

function InicializaPregunga1Competencia2() {
    $(".RptPreg1Competencia2").each(function () {
        if ($(this).is(":checked")) {

            var CheckBoxName = $(this).attr('Id');

            PuntuacionCompetencia2[1] = 0;

            if ($('#' + CheckBoxName + '').is(':checked')) {
                if (CheckBoxName === "RptPreg1Competencia2A")
                    PuntuacionCompetencia2[0] = 1;
                if (CheckBoxName === "RptPreg1Competencia2B")
                    PuntuacionCompetencia2[0] = 3;
                if (CheckBoxName === "RptPreg1Competencia2C")
                    PuntuacionCompetencia2[0] = 5;
            }

        }
    });

    sumarPuntuacionCompetencia2();
}

function InicializaPregunga2Competencia2() {
    $(".RptPreg2Competencia2").each(function () {
        if ($(this).is(":checked")) {

            var CheckBoxName = $(this).attr('Id');

            PuntuacionCompetencia2[1] = 0;

            if ($('#' + CheckBoxName + '').is(':checked')) {
                if (CheckBoxName === "RptPreg2Competencia2A")
                    PuntuacionCompetencia2[1] = 1;
                if (CheckBoxName === "RptPreg2Competencia2B")
                    PuntuacionCompetencia2[1] = 3;
                if (CheckBoxName === "RptPreg2Competencia2C")
                    PuntuacionCompetencia2[1] = 5;
            }

        }
    });

    sumarPuntuacionCompetencia2();
}


function InicializaPregunga1Competencia3() {
    $(".RptPreg1Competencia3").each(function () {
        if ($(this).is(":checked")) {

            var CheckBoxName = $(this).attr('Id');

            PuntuacionCompetencia3[1] = 0;

            if ($('#' + CheckBoxName + '').is(':checked')) {
                if (CheckBoxName === "RptPreg1Competencia3A")
                    PuntuacionCompetencia3[0] = 1;
                if (CheckBoxName === "RptPreg1Competencia3B")
                    PuntuacionCompetencia3[0] = 3;
                if (CheckBoxName === "RptPreg1Competencia3C")
                    PuntuacionCompetencia3[0] = 5;
            }

        }
    });

    sumarPuntuacionCompetencia3();
}

function InicializaPregunga2Competencia3() {
    $(".RptPreg2Competencia3").each(function () {
        if ($(this).is(":checked")) {

            var CheckBoxName = $(this).attr('Id');

            PuntuacionCompetencia3[1] = 0;

            if ($('#' + CheckBoxName + '').is(':checked')) {
                if (CheckBoxName === "RptPreg2Competencia3A")
                    PuntuacionCompetencia3[1] = 1;
                if (CheckBoxName === "RptPreg2Competencia3B")
                    PuntuacionCompetencia3[1] = 3;
                if (CheckBoxName === "RptPreg2Competencia3C")
                    PuntuacionCompetencia3[1] = 5;
            }

        }
    });

    sumarPuntuacionCompetencia3();
}

function ValidaFormulario(ClassName)
{
    var AnyChecked = false;
    $('.' + ClassName + '').each(function ()
    {
        if ($(this).is(":checked")) {
            AnyChecked = true;
        }
    });

    if (!AnyChecked) {
        $('.' + ClassName + 'Error').show();
    } else { $('.' + ClassName + 'Error').hide(); }
        
    return AnyChecked;
}


$(document).on("click", "#btnGuardarCompetencia", function () {

    var success = true;

    if (!ValidaFormulario('RptPreg1Competencia1'))
        success = false;
    if (!ValidaFormulario('RptPreg2Competencia1'))
        success = false;
    if (!ValidaFormulario('RptPreg1Competencia2'))
        success = false;
    if (!ValidaFormulario('RptPreg2Competencia2'))
        success = false;
    if (!ValidaFormulario('RptPreg1Competencia3'))
        success = false;
    if (!ValidaFormulario('RptPreg2Competencia3'))
        success = false;

    if (success)
    {        
        var data = new FormData();
        jQuery.each($('input[type=file]')[0].files, function (i, file) {
            data.append('file-' + i, file);
        });

        var other_data = $("#FrmGuardarEntrevista").serializeArray();
        $.each(other_data, function (key, input) {
            data.append(input.name, input.value);
        });

        jQuery.ajax({
            url: CrearUrl,
            data:data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (Result) {
                if (Result.Success) {
                    toastr.success(Result.Message);
                    $("#ContentPartialEntrevista").html('');
                    $("#CedulaCandidato").val("");
                } else {
                    toastr.warning(Result.Message);
                } 
            }
        });

    }

    return false;

  //  return success;
});


var sumarPuntuacionCompetencia1 = function () {
    $('#PuntuacionCompetencia1').val(
        PuntuacionCompetencia1.reduce(function (sum, el) {
            return sum + el;
        }, 0)
    );
    sumaPromedioGeneral();
};

var sumarPuntuacionCompetencia2 = function () {
    $('#PuntuacionCompetencia2').val(
        PuntuacionCompetencia2.reduce(function (sum, el) {
            return sum + el;
        }, 0)
    );
    sumaPromedioGeneral();
};

var sumarPuntuacionCompetencia3 = function () {
    $('#PuntuacionCompetencia3').val(
        PuntuacionCompetencia3.reduce(function (sum, el) {
            return sum + el;
        }, 0)
    );
    sumaPromedioGeneral();
};


function sumaPromedioGeneral() {

    $("#Promedio").val("");

    var puntuacionCompetencia1 = parseInt($('#PuntuacionCompetencia1').val());
    var puntuacionCompetencia2 = parseInt($('#PuntuacionCompetencia2').val());
    var puntuacionCompetencia3 = parseInt($('#PuntuacionCompetencia3').val());

    if (parseInt($('#PuntuacionCompetencia1').val()) > 0 && parseInt($('#PuntuacionCompetencia2').val()) > 0) {
        if (parseInt($('#PuntuacionCompetencia3').val()) > 0) {
            var total = (puntuacionCompetencia1 + puntuacionCompetencia2 + puntuacionCompetencia3);

            var promedio = (total / 3);

            var promedioRedondeado = Math.round(promedio * 100) / 100;

           // var promedioRedondeado2 = Math.round(promedio * Math.pow(10, 0)) / Math.pow(10, 0); 
        
            $("#Promedio").val(promedioRedondeado);
        }
    }
}