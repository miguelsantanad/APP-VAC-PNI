$(document).ready(function () {

    $('#btnCrearEntrevista').click(function () {
        var _rpuest = $('._rpuesta').length;
        var _radio = $("input:radio._divR:checked").length;
        if (_rpuest == _radio) {
            swal({
                title: "¿Está seguro?",
                text: "Una vez la entrevista sea enviada no podrá ser editada.!",
                type: "warning",
                icon: "warning",
                buttons: [true, "Aceptar!"],
                showCancelButton: true,
                confirmButtonColor: "btn-danger",
                confirmButtonText: "Aceptar",
                closeOnConfirm: false
            }).then((isConfirm) => {
                if (isConfirm) {
                    crearEntrevista();
                }
            });

        } else {
            swal('Advertencia', 'Todavía hay preguntas que debe contestar.', 'warning');
        }
    });

    function crearEntrevista() {
        var rdBtns = $("input[type='radio']:checked");
        var competenciaResultado = [];
        $(rdBtns).each(function () {

            if ($(this).attr("name") != "_rpublic") {

                var codtextorespuesta = $(this).attr("data-codtextorespuesta");
                var codpregunta = $(this).attr("data-codpregunta");
                var codcompetencia = $(this).attr("data-codcompetencia");
                var observacion = $(`#obsRubrica${codpregunta}`).val();

                var entity = {
                    CodigoRespuesta: codtextorespuesta,
                    CodigoPregunta: codpregunta,
                    CodigoCompetencia: codcompetencia,
                    Observacion: observacion
                };

                competenciaResultado.push(entity);
            }
        });

        var cedula = $("#cedulaCandidato").val();
        if (cedula.length == 13) {

            var publicarEntrevista = $('input:radio[name=_rpublic]:checked').val();
            if (publicarEntrevista != undefined) {
                var entityBase = { resultados: competenciaResultado, cedula: cedula, codestado: publicarEntrevista };
                $.ajax({
                    url: `${origen}/api/Entrevista/CrearEntrevista`,
                    data: JSON.stringify(entityBase),
                    contentType: "application/json",
                    type: 'POST',
                    success: function (result) {
                        if (result == 200) {
                            insertarCheckSelecionados(publicarEntrevista);
                            //swal('Información', 'Entrevista creada exitosamente.', 'success');
                            //$("#rowButton").hide();
                            //$("#displayEntrevista").html('');
                            //$("#_displayCheckbox").html('');
                            //$("#_displayRadiosBox").html('');
                            //$("#_RadiosCalificacion").hide();
                            //$("#_NombreCompleto").text('');
                            //$("#_Postulacion").text('');
                            //$("#cedulaCandidato").val('');
                        } else if (result == 404) {
                            swal('Información', 'Esta persona ya fue entrevistada.', 'info');
                        } else {
                            swal('Error', 'Ha ocurrido un error', 'error');
                        }
                    },
                    error: function (xhr) {
                        swal('Error', xhr.responseJSON, 'error');
                    }
                });
            } else {
                swal('Advertencia', 'Debe seleccionar uno de los estados.', 'warning');
            }
           
        } else {

        }
    }

    function insertarCheckSelecionados(id) {
        var cedula = $("#cedulaCandidato").val();
        var checkSelec = [];
        if (id != 3) {
            $("input:checkbox:checked").each(function () {
                checkSelec.push($(this).val());
            });
        }
      
        var entityBase = { resultados: checkSelec, cedula: cedula };
        $.ajax({
            url: `${origen}/api/Entrevista/EstadoCandidatoEntrevista`,
            data: JSON.stringify(entityBase),
            contentType: "application/json",
            type: 'POST',
            success: function (result) {
                if (result == 200) {
                    swal({
                        title: "Información",
                        text: "Entrevista creada exitosamente.",
                        type: "success",
                        icon: "success",
                        buttons: [true, "Aceptar!"],
                        showCancelButton: false,
                        confirmButtonColor: "btn-danger",
                        confirmButtonText: "Aceptar",
                        closeOnConfirm: false
                    }).then((isConfirm) => {
                          window.location.reload();
                    });
                } else if (result == 404) {
                    swal('Información', 'Esta persona ya fue entrevistada.', 'info');
                } else {
                    swal('Error', 'Ha ocurrido un error', 'error');
                }
            },
            error: function (xhr) {
                swal('Error', xhr.responseJSON, 'error');
            }
        });
    }

    $('#btnBorrarEntrevista').click(function () {
        var cedula = $("#cedulaCandidato").val();
        if (cedula != "") {
            swal({
                title: "¿Está seguro que desea cancelar la entrevista?",
                type: "warning",
                icon: "warning",
                buttons: [true, "Aceptar"],
                showCancelButton: true,
                confirmButtonColor: "btn-danger",
                confirmButtonText: "Aceptar",
                closeOnConfirm: false
            }).then((isConfirm) => {
                if (isConfirm) {
                    $("#btnBuscarCedula").removeAttr('disabled');
                    $("#rowButton").hide();
                    $("#displayEntrevista").html('');
                    $("#_displayCheckbox").html('');
                    $("#_displayRadiosBox").html('');
                    $("#_RadiosCalificacion").hide();
                    $("#_NombreCompleto").text('');
                    $("#_Postulacion").text('');
                    $("#cedulaCandidato");
                    $('#cedulaCandidato').removeAttr('readonly');
                    $("#cedulaCandidato").val('');
                }
            });

        }
    });


    //$("btnCrearEntrevista").click(function () {

    //    var rdBtns = $("input[type='radio']:checked");
    //    var competenciaResultado = [];
    //    $(rdBtns).each(function () {

    //        if ($(this).attr("name") != "_r") {

    //            var codtextorespuesta = $(this).attr("data-codtextorespuesta");
    //            var codpregunta = $(this).attr("data-codpregunta");
    //            var codcompetencia = $(this).attr("data-codcompetencia");
    //            var observacion = $(`#obsRubrica${codpregunta}`).val();

    //            var entity = {
    //                CodigoRespuesta: codtextorespuesta,
    //                CodigoPregunta: codpregunta,
    //                CodigoCompetencia: codcompetencia,
    //                Observacion: observacion
    //            };

    //            competenciaResultado.push(entity);
    //        }
    //    });

    //    var cedula = $("#cedulaCandidato").val();
    //    if (cedula.length == 13) {
    //        var publicarEntrevista = $("#_rdIzquierda").is(":checked");
    //        var entityBase = { resultados: competenciaResultado, cedula: cedula, publicar: publicarEntrevista};
    //            $.ajax({
    //                url: `${origen}/api/Entrevista/CrearEntrevista`,
    //                data: JSON.stringify(entityBase),
    //                contentType: "application/json",
    //                type: 'POST',
    //                success: function (result) {
    //                    if (result == 200) {
    //                        swal('Información', 'Entrevista creada exitosamente.', 'success');
    //                        $("#rowButton").hide();
    //                        $("#displayEntrevista").html('');
    //                        $("#_RadiosCalificacion").hide();
    //                        $("#_NombreCompleto").text('');
    //                        $("#_Postulacion").text('');
    //                    } else if (result == 404) {
    //                        swal('Error', 'Esta persona ya fue entrevistada.', 'error');
    //                    } else {
    //                        swal('Error', 'Ha ocurrido un error', 'error');
    //                    }
    //                },
    //                error: function (xhr) {
    //                    swal('Error', xhr.responseJSON, 'error');
    //                }
    //            });
    //    } else {

    //    }
    //}); 

    function GetDatosEstadoCandidatos() {
        $.ajax({
            url: `${origen}/api/Entrevista/EstadoCandidatos`,
            contentType: "application/json",
            type: 'GET',
            success: function (result) {
                var _html = "";
                var _htmlP0 = "";
                var _htmlP1 = "";
                if (result == 404 || result == null) {
                    swal('Error', 'Ha ocurrido un error', 'error');
                } else {
                    result.forEach(function (value, i) {
                        if (i <= 2) {
                            _htmlP0 += ` <div class="col-md-4">
                                     <input type="checkbox" id="cbox2" value="${value.CodEstadoCandidato}"> <label class="_customLabel" for="cbox2">${value.Descripcion}</label>
                                    </div>`
                        }

                        if (i >= 3) {
                            _htmlP1 += ` <div class="col-md-4">
                                     <input type="checkbox" id="cbox2" value="${value.CodEstadoCandidato}"> <label class="_customLabel" for="cbox2">${value.Descripcion}</label>
                                    </div>`
                        }
                    });
                    _html += `<div class="container-fluid _cfd">
                              <div class="row">
                                ${_htmlP0}
                                </div>
                                <div class="row">
                                ${_htmlP1}
                              </div>
                        </div>`
                    $('#_displayCheckbox').html(_html);
                    GetDatosEstado();
                }
            },
            error: function (xhr) {
                swal('Error', xhr.responseJSON, 'error');
            }
        });

    }

    function GetDatosEstado() {

        $.ajax({
            url: `${origen}/api/Entrevista/Estados`,
            contentType: "application/json",
            type: 'GET',
            success: function (result) {
                var _html = "";
                var _htmlP0 = "";
                if (result == 404 || result == null) {
                    swal('Error', 'Ha ocurrido un error', 'error');
                } else {
                    result.forEach(function (value, i) {
                        _htmlP0 += `<div class="col-md-3">
                                   <input type="radio" value="${value.CodEstado}" onclick="ShowHidedisplayRadiosBox(this)" style="width: 16px; height: 16px;" name="_rpublic" />
                                   <label style="font-size:revert;"><strong>${value.Descripcion}</strong> </label>
                                </div>`;
                    });
                    _html += ` <div class="row flex _cfde">
                                   ${_htmlP0}
                               </div>`
                    $('#_displayRadiosBox').html(_html);
                }
            },
            error: function (xhr) {
                swal('Error', xhr.responseJSON, 'error');
            }
        });
    }
    function hideHtmlDomElements() {
        $("#displayEntrevista").html('');
        $("#_displayCheckbox").html('');
        $("#_displayRadiosBox").html('');
        $("#rowButton").hide();
        $("#_RadiosCalificacion").hide();
        $("#_NombreCompleto").text('');
        $("#_Postulacion").text('');
        $("#cedulaCandidato").removeAttr('readonly');
    }

    $("#cedulaCandidato").mask("999-9999999-9");
    $("#btnBuscarCedula").click(function () {
        var cedula = $("#cedulaCandidato").val();
        if (cedula.length == 13) {
            fetch(`https://v2023.minerd.gob.do/cc/entrevista.php?ced=${cedula}`)
                .then(response => response.json())
                .then(response => {
                    if (true) {
                        $.ajax({
                            url: `${origen}/api/Entrevista/GetDatosEntrevista/${143137}`,
                            type: 'GET',
                            success: function (data) {
                                if (data.EstadoPostulanteCode == "302") {
                                    swal('información', 'Esta persona ya fue entrevistada.', 'info');
                                    hideHtmlDomElements();
                                } else if (data.EstadoPostulanteCode == "404") {
                                    swal('información', 'Esta persona aún no ha sido convocada.', 'info');
                                    hideHtmlDomElements();
                                } else {
                                    $("#cedulaCandidato").attr("readonly", "readonly");
                                    $("#_NombreCompleto").text(data.NombreCompleto);
                                    $("#_Postulacion").text(data.Postulacion);
                                    data = data.Competencias;
                                    var html = "";
                                    for (x = 0; x < data.length; x++) {
                                        var competencia = data[x];
                                        var descripcionCompetencia = competencia.Descripcion;
                                        var definicion = competencia.Definicion;
                                        var codCompetencia = competencia.CodigoCompetencia;
                                        var htmlPreguntas = "";

                                        for (c = 0; c < competencia.Preguntas.length; c++) {
                                            var Pregunta = competencia.Preguntas[c];
                                            var CodPregunta = Pregunta.CodigoPregunta;
                                            var descripcionPregunta = Pregunta.Descripcion;

                                            var htmlRespuestas = "";
                                            var respuestas = Pregunta.Respuestas;

                                            for (d = 0; d < respuestas.length; d++) {
                                                var respuesta = respuestas[d];
                                                var codTextoRespuesta = respuesta.CodTextoRespuesta;
                                                var textoRespuesta = respuesta.Texto;
                                                var valoracion = respuesta.Valoracion;

                                                htmlRespuestas += `<div class="col-md-4 text-center">
                                                        <div class="_clg _bcm">
                                                            <label>${valoracion}</label>
                                                            <div class="_divRdio">
                                                                <input type="radio" class="_divR" data-codtextorespuesta="${codTextoRespuesta}" data-codpregunta=${CodPregunta} data-codcompetencia="${codCompetencia}" name="_rdR${codCompetencia}_${c + 1}" />
                                                            </div>
                                                        </div>
                                                        <div class="card _bcm">
                                                            <div class="card-body">
                                                                <p class="text-justify">
                                                                    ${textoRespuesta}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>`;
                                            }

                                            htmlPreguntas += `<div class="row _mt">
                                                    <div class="col-sm-12 col-md-1 _txt-vert _div-vert"><strong>RÚBRICA ${c + 1}</strong></div>
                                                        <div class="col-sm-12 col-md-11 _dbc">
                                                            <p class="text-justify">
                                                            ${descripcionPregunta}
                                                            </p>
                                                            <div class="row _rpuesta">${htmlRespuestas}</div>
                                                            <div class="row">
                                                                <div class="col-md-12">
                                                                    <div class="form-group">
                                                                        <label for="exampleTextarea1"><strong>Observación</strong></label>
                                                                        <textarea class="form-control" id="obsRubrica${CodPregunta}" rows="2"></textarea>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                  </div>`;
                                        }

                                        html += `<div id="_containerEntrivista" class="container-fluid _cfde">
                                    <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>COMPETENCIA</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><strong>${descripcionCompetencia}</strong></div>
                                    </div>
                                    <div class="row _bc _mt">
                                        <div class="col-md-3 _mtsp text-center"><strong>DEFINICIÓN</strong></div>
                                        <div class="col-md-9 _dbc">
                                            <p>
                                                ${definicion}
                                            </p>
                                        </div>
                                    </div>
                                   ${htmlPreguntas}
                                   </div>`;
                                    }
                                    $("#displayEntrevista").html(html);
                                    GetDatosEstadoCandidatos();
                                    $("#rowButton").show();
                                    $("#_RadiosCalificacion").show();
                                    $("#_displayCheckbox").hide();

                                }
                            },
                            error: function (xhr) {
                                swal('Error', xhr.responseJSON, 'error');
                                //toastr.warning(xhr.responseJSON);
                            }
                        });
                    } else {
                      swal('información', 'Esta persona aún no ha sido convocada.', 'info');
                    }
                });
        } else {
          swal("Aviso", "La cedula debe contener al menos 13 digitos con los guiones incluidos", "warning");
        }
    });
});



