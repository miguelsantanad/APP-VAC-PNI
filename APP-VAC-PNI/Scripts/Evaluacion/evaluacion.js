$(document).ready(function () {
    $("#cedulaCandidato").mask('999-9999999-9');
});

function obtenerDatos() {

    if ($("#cedulaCandidato").val() == '' || $("#cedulaCandidato").val().length !== 13) {
        swal('Advertencia', 'Debe agregar una cédula de un docente a evaluar', 'warning');
        return;
    }

    fetch(`${origen}/Evaluacion/getEvaluaciones?cedula=${$('#cedulaCandidato').val()}`)
        .then(response => response.json())
        .then(data => {
            if (data.success == "true") {
                generalHtmlPreguntas(data);
                $("#cedulaCandidato").attr('disabled', 'disabled');
            } else if (data.success == "existe") {
                swal('Advertencia', 'El docente ya fue evaluado.', 'warning');
                $("#cedulaCandidato").val('');
                $('#_Centro').text('');
                $('#_Regional').text('');
                $('#_Distrito').text('');
            } else {
                swal('Advertencia', 'El número de cedula no existe dentro de los docentes a ser evaluados.', 'warning');
            }
    }).catch(error => console.error('Error:', error));
}

function ReiniciarEvaluacion() {
    let html = $('#grupoPreguntas').html().trim();
    if (html != "") {
        swal({
            title: "¿Está seguro?",
            text: "Que desea reiniciar la evaluación de este docente.!",
            type: "warning",
            icon: "warning",
            buttons: [true, "Aceptar!"],
            showCancelButton: true,
            confirmButtonColor: "btn-danger",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false
        }).then((isConfirm) => {
            if (isConfirm) {
                $('#grupoPreguntas').html('');
                $("#cedulaCandidato").val('');
                $('#_NombreCompleto').text('');
                $('#_Centro').text('');
                $('#_Regional').text('');
                $('#_Distrito').text('');
                $("#cedulaCandidato").removeAttr('disabled');
            }
        });
    }
}

function postSaveQuestions(respuesta) {
    fetch(`${origen}/Evaluacion/postSaveQuestions`, {
        method: "POST",
        body: JSON.stringify(respuesta),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json())
      .catch((error) => console.error("Error:", error))
        .then((response) => validarSuccess(response) );
}

function validarSuccess(datos) {
    if (datos) {
        swal('Exito', 'La evalacion fue realizada con exito.', 'success');
        $('#grupoPreguntas').html('');
        $("#cedulaCandidato").val('');
        $('#_NombreCompleto').text('');
        $('#_Centro').text('');
        $('#_Regional').text('');
        $('#_Distrito').text('');
        $("#cedulaCandidato").removeAttr('disabled');
    } else {
        swal('Error', 'Hubo un error. por favor intenta más tarde.', 'error');
    }
}

function generalHtmlPreguntas(data) {

    let grupoPreguntas = "";
    let preguntas = "";
    let arrayIndex = 1;
    $('#_NombreCompleto').text(`${data.docente.Nombres} ${data.docente.Apellidos}`);
    $('#_Centro').text(data.docente.Nombres);
    $('#_Regional').text(data.docente.Regional);
    $('#_Distrito').text(data.docente.Distrito);
    data.datos.map((t) => {
      t.Preguntas.map((p) => {
          let preguntaCorta = p.substring(0, 2)
          preguntas += `<div class="form-group">
                <label class="mb-4 text-justify" style="font-size:1.2em;"><b>${p}</b></label>
                <br />
                <div id="rb-${arrayIndex}" class="rb">
                    <div class="rb-tab" data-value="1" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">1</span>
                        </div>
                    </div><div class="rb-tab" data-value="2" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">2</span>
                        </div>
                    </div><div class="rb-tab" data-value="3" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">3</span>
                        </div>
                    </div><div class="rb-tab" data-value="4" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">4</span>
                        </div>
                    </div><div class="rb-tab" data-value="5" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">5</span>
                        </div>
                    </div><div class="rb-tab" data-value="6" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">6</span>
                        </div>
                    </div>
                    <div class="rb-tab" data-value="7" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">7</span>
                        </div>
                    </div>
                    <div class="rb-tab" data-value="8" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">8</span>
                        </div>
                    </div>
                    <div class="rb-tab" data-value="9" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">9</span>
                        </div>
                    </div>
                    <div class="rb-tab" data-value="10" data-text="${preguntaCorta}">
                        <div class="rb-spot">
                            <span class="rb-txt">10</span>
                        </div>
                    </div>
                </div>
            </div>`;
          arrayIndex++;
      })

        grupoPreguntas += `<div class="form-group">
            <label class="mb-5" style="background-color:#337ab7;font-size:1.2em; color: white; padding: 5px; "><b>${t.Titulo}</b></label>
            <br />
            <br />
             ${preguntas}
            <hr class="new5" />
        </div>`
        preguntas = '';
    });

    let htmlPregunta = `<div class="container-fluid _cfd">
                                 <form>
                                     ${grupoPreguntas}
                                     <div class="button-box">
                                     <button class="buttonEnviar btn-info trigger">Enviar Evaluación!</button>
                                     </div>
                                </form>
                        </div>`;

    $('#grupoPreguntas').html(htmlPregunta);

    let questions = [];
  

    $(".rb-tab").click(function () {
        $(this).parent().find(".rb-tab").removeClass("rb-tab-active");
        $(this).addClass("rb-tab-active");
    });

    $(".trigger").click(function (e) {
        e.preventDefault();
         questions = [];
        for (i = 1; i <= $(".rb").length; i++) {
            var rb = "rb" + i;
            let rbValue = parseInt($("#rb-" + i).find(".rb-tab-active").attr("data-value"));
            let rbText = $("#rb-" + i).find(".rb-tab-active").attr("data-text");
            if (isNaN(rbValue)) {
                swal('Advertencia', 'Todas las preguntas son obligatorias, por favor de completar toda la evaluación.', 'warning');
                return;
            }
            questions.push({ IdRespuerta: i, ValorRespuesta: rbValue, Pregunta: rbText });
        };

        const datos = {
            Id: 0,
            CedulaDocente: $('#cedulaCandidato').val(),
            NombreDocente: $('#_NombreCompleto').text(),
            PreguntaDetalles: questions
        };
        
        swal({
            title: "¿Está seguro?",
            text: "Una vez la evaluación sea enviada no podrá ser editada.!",
            type: "warning",
            icon: "warning",
            buttons: [true, "Aceptar!"],
            showCancelButton: true,
            confirmButtonColor: "btn-danger",
            confirmButtonText: "Aceptar",
            closeOnConfirm: false
        }).then((isConfirm) => {
            if (isConfirm) {
                postSaveQuestions(datos);
            }
        });
    });
}