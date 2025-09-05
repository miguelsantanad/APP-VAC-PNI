var esCargoDocente = false;
var DIV_JUSTIFICACION = $('#divJustificacion');
var $ContentComisionEvaluadoraElegida = $("#contentComisionEvaluadoraElegida");

$(document).ready(function () {
    // -- Elementos --
    var BOTON_BUSCAR_CEDULA = $('#btnBuscarCedula');
    var BOTON_BUSCAR_CEUDLA_PADRON = $("#btnBuscarCedulaPadron");    
    var BOTON_TERMINAR_VERIFICACION = $('#btnVerificar');
    var CAMPO_CEDULA = $('#txtCedula');
    var CAMPO_CEDULA_OCULTA = $('#hidCedula');
    var CAMPO_CEDULA_MIEMBRO_COMITE = $('#Cedula');

    var DIV_ACCIONES = $('#Acciones');
    var TABLA_CARGOS_SELECCIONADOS = $('#tblCargosSeleccionados');
    var CAMPO_CARGO_POSTULADO = $('#txtCargoPostulado')
    var CAMPO_REGIONAL_RESIDE = $('#txtRegionalReside');
    var CAMPO_DISTRITO_RESIDE = $('#txtDistritoReside');
    var CAMPO_DISTRITOS_MUNICIPALES = $("#txtDistritosMunicipales");
    var CAMPO_SECCIONES_MUNICIPALES = $("#txtSeccionesMunicipales");
    var CAMPO_BARRIOS = $("#txtBarrios");
    var CAMPO_APELLIDOS = $('#txtApellidos');
    var CAMPO_NOMBRE = $('#txtNombre');
    var CAMPO_ESTADO_CIVIL = $('#txtEstadoCivil');
    var CAMPO_NACIONALIDAD = $('#txtNacionalidad');
    var CAMPO_DIRECCION = $('#txtDireccion');
    var CAMPO_TELEFONO = $('#txtTelResidencial');
    var CAMPO_CELULAR = $('#txtCelular');
    var CAMPO_CORREO = $('#txtCorreo');
    var CAMPO_OCULTO_CODCANDIDATO = $('#txtCodCandidato');
    var CAMPO_TELEFONO_EXPERIENCIA = $('#txtTelefonoExperiencia');
    var RADIO_ESTADOS = $('input[name="estadoRegistro"]');
    var CAMPO_JUSTIFICACION = $('#txtJustificacion');
    var CAMPO_EDAD = $("#txtEdad");
    var CAMPO_CARGO_ACTUAL = $("#txtCargoActual");
    var CAMPO_ANIO_SERVICIO = $("#txtAnioServicio");
    var CAMPO_CARGO_ACTUAL2 = $("#txtCargoActual2");
    var CAMPO_ANIO_SERVICIO2 = $("#txtAnioServicio2");
    var headers = []
    var CHECKLIST_RESULTADO = [];

    // -- Fin elementos --

    CAMPO_CEDULA.mask('999-9999999-9');
    CAMPO_CEDULA_MIEMBRO_COMITE.mask('999-9999999-9');
    CAMPO_TELEFONO.mask('(999)-999-9999');
    CAMPO_CELULAR.mask('(999)-999-9999');
    CAMPO_TELEFONO_EXPERIENCIA.mask('(999)-999-9999');

    $('#txtTelResidencialE').mask('(999)-999-9999');
    $('#txtCelularE').mask('(999)-999-9999');
    $('#txtCantHijosE').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            // Allow: Ctrl/cmd+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    var llenarTablaDocumentos = function (data,codigoHash) {
        var TABLA_DOCUMENTOS = $("#tblDocumentos tbody");
        //var link = '<a href="' + urlVerDocumento + '" target="_blank" > Ver Documentos </a>';
        var showPdf = (event) => {
            console.log(event.currentTarget.getAttribute("url"))
            // const pdfIframe = document.getElementById('pdfIframe');

            // pdfIframe.setAttribute("src", event.currentTarget.getAttribute("url"));
            const pdfIframe = $('#pdfIframe');
            pdfIframe.attr('src', event.currentTarget.getAttribute("url"));
            // $("#pdfIframe").attr("src", event.currentTarget.getAttribute("url"));
            $('#pdfModal').modal('show');
            $("#documentModal").modal('show');
        }

        headers[0] = { no_cumple: false, acorde: false, class: null, valor: 0, code: "CurriculumVitae", name: 'a) Currículum Vitae en una hoja', value: "CurriculumVitae", points: 0, rp: 1 };
        headers[1] = { no_cumple: false, acorde: false, class: null, valor: 0, code: "FotoCopiaCedula", name: 'b) Fotocopia de la cédula de identidad y electoral', value: "FotoCopiaCedula", points: 0, rp: 1 }
        headers[2] = { no_cumple: false, acorde: false, class: null, valor: null, code: "CopiaTituloGradoPostgrado", name: 'c) Copia de título de estudios de grado y/o postgrado', value: "CopiaTituloGradoPostgrado", points: 0, rp: 0 };
        headers[3] = { no_cumple: false, acorde: false, class: "tituloCHK", valor: 2, code: "CopiaTituloLicenciatura", name: '1- Licenciatura o su equivalencia con habilitación docente', value: "CopiaTituloGradoPostgrado", points: 0, rp: 1 };
        headers[4] = { no_cumple: false, acorde: false, class: "tituloCHK", valor: 3, code: "CopiaTituloEspecialidadEducacion", name: '2- Especialidad en Educación y/o áreas afines a su perfil profesional', value: "CopiaTituloGradoPostgrado", points: 0, rp: 1 };
        headers[5] = { no_cumple: false, acorde: false, class: "tituloCHK", valor: 4, code: "CopiaTituloMaestria", name: '3- Maestría y/o Doctorado en Educación y/o áreas afines a su perfil profesional', value: "CopiaTituloGradoPostgrado", points: 0, rp: 1 };
        headers[6] = { no_cumple: false, acorde: false, class: null, valor: null, code: "CopiaTituloDiplomado", name: 'Diplomados en Ciencias de la Educación y/o áreas afines a su perfil profesional <bold>¿Cuántos diplomados?</bold>', value: "CopiaTituloGradoPostgrado", points: 0, rp: 2 };
        headers[7] = { no_cumple: false, acorde: false, class: null, valor: null, code: "CopiaCertificaciones", name: 'Certificados relacionados con Ciencias de la Educación y/o con el área que imparte <bold>¿Cuántos certificados</bold>', value: "CopiaTituloGradoPostgrado", points: 0, rp: 3 };
        headers[8] = { no_cumple: false, acorde: false, class: null, valor: 0, code: "CopiaCertificacionMinisterioEducacion", name: 'd) Copia de certificación de título emitida por el Ministerio de Educación Superior, Ciencia y Tecnología. (De haber obtenido el título en el extranjero, se solicitará legalización previa de los documentos que acrediten la validez del título de acuerdo con los convenios o tratados vigentes suscriptos y ratificados por el país, o haber revalidado el título de acuerdo con los procedimientos de la Ley 139-01 de Educación Superior, Ciencia y Tecnología)', value: "CopiaCertificacionMinisterioEducacion", points: 0, rp: 1 };
        headers[9] = { no_cumple: false, acorde: false, class: null, valor: 0, code: "CertificadoHabilitacionDocente", name: 'e) Certificado de habilitación docente (en caso de que aplique)', value: "CertificadoHabilitacionDocente", points: 0, rp: 1 };
        headers[10] = { no_cumple: false, acorde: false, class: null, valor: null, code: "CertificacionTiempoFuncion", name: 'f) Certificación de tiempo en función y desempeño como monitor en aula, y carga horaria emitida por Director y/o el Coordinador Docente del Centro Educativo donde labora. ¿Tiempo en función?', value: "CertificacionTiempoFuncion", points: 0, rp: 3 };
        headers[11] = { no_cumple: false, acorde: false, class: null, valor: null, code: "EvidenciaDesempenio", name: `g) Evidencias de desempeño en el cargo objeto del Concurso-Evaluación, desde el tiempo  que imparte docencia, tales como:`, value: "EvidenciasDesempenoCargoObjeto", points: 0, rp: 0 };
        headers[12] = { no_cumple: false, acorde: false, class: null, valor: 4, code: "PlanificacionDocenciaCentroEducativo", name: '1- Planificación de la Docencia, firmada y sellada por el Equipo de Gestión del Centro Educativo', value: "EvidenciasDesempenoCargoObjeto", points: 0, rp: 1 };
        headers[13] = { no_cumple: false, acorde: false, class: null, valor: 4, code: "EvidenciaDesempenioVideoFotografiaCo", name: '2- Videos y/o fotografías de los logros estudiantiles donde demuestren la  movilización de competencias y su aprendizaje, cargadas como un link en un  formato de texto o en PDF', value: "EvidenciasDesempenoCargoObjeto", points: 0, rp: 1 };
        headers[14] = { no_cumple: false, acorde: false, class: null, valor: 0, code: "CartaLaboralEmitidaMinerd", name: 'h- Carta laboral emitida por la Dirección General de Recursos Humanos del MINERD', value: "CartaLaboralEmitidaMinerd", points: 0, rp: 1 };
        headers[15] = { no_cumple: false, acorde: false, class: null, valor: 0, code: "CertificacionNoAntecedentesPenales", name: 'i- Certificación de no Antecedentes Penales con una antigüedad no mayor a 30 días a partir  de la fecha de la convocatoria', value: "CertificacionNoAntecedentesPenales", points: 0, rp: 1 };
        CHECKLIST_RESULTADO = headers;
        var PUNTAJECHECKLIST = 0;

        if (data) {
            console.log(data)
            data.forEach(item => {
                const index = headers.findIndex(i => i.code === item.Documento);
                headers[index].points = item.Puntuacion;
                headers[index]["no_cumple"] = item.NoAcorde;
                headers[index]["acorde"] = item.Acorde;
                PUNTAJECHECKLIST += headers[index].points;
            });
            $("#txtPuntuacion").val(PUNTAJECHECKLIST);
        }

        // Listen for change event on checkboxes in group 1
        headers.forEach((header, index) => {
            let id = "mdlBTN" + index;
            let nameChk = "mdlBTN" + index;
            headers[index]["id"] = id;

            let chkGen = function (value, label, name, cls, indice, id, checked) {
                return`
                    <label class="checkbox-inline">
                        <input type="checkbox" name="${name}" id="${id}" value="${value}" class="${cls}-checkbox" index="${indice}" ${checked ? 'checked': ''}>${label}
                    </label>
                `
            };

            let html = `
            <tr index="${index}">
                <td class="tblDocumentos-th"><p>${header.name}</p></td>
                <td class="text-center">
                    ${(() => {
                        if (header.rp > 0) {
                            return `
                                    <div class="btn-group" role="group" aria-label="...">
                                      <a role="button" class="btn btn-default" href="${ruta}Formulario/VerDocumento?CodigoCandidato=${data.CodCandidatoHash === undefined ? codigoHash : data.CodCandidatoHash }&documento=${header.value}" target="_blank">
                                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                      </a>
                                    </div>
                                   `
                        } else {
                            return ""
                        }
                    })()}
                </td>
                <td class="text-center">
                    ${(() => {
                        let result = '';
                        for (var i = 1; i < header.rp + 1; i++) {

                            let checked = header.hasOwnProperty('acorde') && header.acorde ? (header.rp > 1 ? i === header.points : header.acorde) : header.hasOwnProperty('acorde') && header.acorde;
                            result += chkGen(header.valor ?? i, header.rp > 1 ? i : 'Acorde', nameChk + i, header.class ?? nameChk, index, id, checked)
                        }
                        return result;

                    })()}
                </td>
                <td class="text-center">
                    ${(() => {
                        if (header.rp > 0) {
                            return `
                                    <label class="checkbox-inline">
                                        <input type="checkbox" name="${nameChk}" value="0" class="${header.class ?? nameChk}-checkbox" index="${index}" nocumple="1" ${header.hasOwnProperty('no_cumple') && header.no_cumple ? 'checked' : ''}> No Acorde
                                    </label>
                                `
                        } else {
                            return ""
                        }
                    })()}
                </td>
            </tr>`;

            TABLA_DOCUMENTOS.append(html);
            $("#mdlBTN" + index).click(showPdf);
            var cls = `.${header.class ?? nameChk}-checkbox`;
            $(cls).off();
            $(cls).change(function () {
                if ($(this).prop('checked')) {
                    // Uncheck all other checkboxes in the same group
                    $(cls).not(this).prop('checked', false);
                    const header = headers[$(this).attr("index")];
                    var points = 0;

                    if (header.class === "tituloCHK") {
                        headers.filter(item => item.class === 'tituloCHK').forEach(item => {
                            points += item.points;
                            if ($(this).attr("id") !== item.id) {
                                const index = headers.findIndex(itm => itm.id === item.id);
                                headers[index].points = 0;
                                headers[index]["no_cumple"] = false;
                                headers[index]["acorde"] = false;
                                console.log(headers[index])
                            }
                        });
                    } else {
                        points = header.points;
                    }


                    if ($(this).attr("nocumple")) {
                        PUNTAJECHECKLIST = PUNTAJECHECKLIST - points;
                        headers[$(this).attr("index")].points = 0;
                        headers[$(this).attr("index")]["no_cumple"] = true;
                        headers[$(this).attr("index")]["acorde"] = false;
                    } else {
                        PUNTAJECHECKLIST = parseInt(this.value) + (PUNTAJECHECKLIST - points);
                        headers[$(this).attr("index")].points = parseInt(this.value);
                        headers[$(this).attr("index")]["no_cumple"] = false;
                        headers[$(this).attr("index")]["acorde"] = true;
                    }

                    $("#txtPuntuacion").val(PUNTAJECHECKLIST)
                } else {
                    $(cls).not(this).prop('checked', false);
                    const header = headers[$(this).attr("index")];
                    var points = 0;

                    if (header.class === "tituloCHK") {
                        headers.filter(item => item.class === 'tituloCHK').forEach(item => {
                            points += item.points;
                            if ($(this).attr("id") !== item.id) {
                                const index = headers.findIndex(itm => itm.id === item.id);
                                headers[index].points = 0;
                                headers[index]["no_cumple"] = false;
                                headers[index]["acorde"] = false;
                                console.log(headers[index])
                            }
                        });
                    } else {
                        points = header.points;
                    }

                    PUNTAJECHECKLIST = PUNTAJECHECKLIST - points;
                    headers[$(this).attr("index")].points = 0;
                    headers[$(this).attr("index")]["no_cumple"] = true;
                    headers[$(this).attr("index")]["acorde"] = false;

                    $("#txtPuntuacion").val(PUNTAJECHECKLIST)
                }
            });
        });
    }

    var buscadorCedula = function () {
        if (CAMPO_CEDULA.val() !== "--" && CAMPO_CEDULA.val() !== "" && CAMPO_CEDULA.val() !== null) {
            $('#GifContainer').removeClass('hidden');
            $.post(ruta + "Formulario/ObtenerInformacionCandidato", { cedula: CAMPO_CEDULA.val() })
                .done(llenarFormularioCompleto);
        } else {
            swal("Atención", "Estimado usuario el campo cédula no puede estar vacio para realizar búscqueda.", "warning");
        }
    };

    var buscadorCedulaPadron = () => {
        if (CAMPO_CEDULA_MIEMBRO_COMITE.val().trim() == "" || CAMPO_CEDULA_MIEMBRO_COMITE.val().trim() == null) {
            swal("Atención", "Estimado usuario el campo cédula no puede estar vacio para realizar búscqueda.", "warning");
            return;
        }

        //Validar primero que exista comision evaluadora para el día de hoy
        $.post(ruta + "ComiteEvaluacion/GetMiembroPadron", { cedula: CAMPO_CEDULA_MIEMBRO_COMITE.val() })
        .done((data) => {
            if (data.Nombre === null || data.Nombre === "" || data.Nombre === undefined) {
                $("#Nombre").attr("readonly", false);
                $("#Cedula").attr("readonly", false);
                swal("Atención", "Estimado usuario no se encontraron registro con la cédula especificada.", "warning");
            } else {
                $("#Nombre").attr("readonly", true);
                $("#Cedula").attr("readonly", true);
                $("#btnDesbloquearCampo").removeClass("hidden");
            }
            $("#Nombre").val(data.Nombre);
        }).error(function (Result) {
            var Mensaje = Result.responseJSON['message'];
            swal("Atención", Mensaje, "warning");
        });
    };

    var rowTablaCargosSeleccionados = function (cargoSeleccionado) {
        var html = '';

        html += '<tr>' +
            '<td>' + cargoSeleccionado.Regional + '</td>' +
            '<td>' + cargoSeleccionado.Distrito + '</td>' +
            '<td>' + cargoSeleccionado.Centro + '</td>' +
            '<td>' + cargoSeleccionado.Postulacion.Descripcion + '</td>' +
            '</tr>';

        return html;
    };

    var llenarTablaCargosSeleccionados = function (candidatoPostulaciones) {
        for (var i = 0; i < candidatoPostulaciones.length; i++)
            TABLA_CARGOS_SELECCIONADOS.append(rowTablaCargosSeleccionados(candidatoPostulaciones[i]));
    };

    var manejadorEstados = function () {
        var self = $(this);
        var value = self.val();

        DIV_JUSTIFICACION.addClass('hidden');
        CAMPO_JUSTIFICACION.val('');
        if (value > 0) {
            DIV_JUSTIFICACION.removeClass('hidden');

            if (value == 1 || value == 2) {
                $("#lblTituloJustificacion").html('');
                $("#lblTituloJustificacion").html('<strong>Nota</strong>');
            } else {
                $("#lblTituloJustificacion").html('');
                $("#lblTituloJustificacion").html('<strong>Justificación</strong>');
            }
        }
    };

    var llenarFormularioCompleto = function (response) {
        $('#GifContainer').addClass('hidden');
        limpiarFormulario();

        if (!response) {
            alert('No existe registro con esta cédula');
            return;
        }

        if (response.CandidatoPostulaciones) {
            llenarTablaCargosSeleccionados(response.CandidatoPostulaciones);
        }

        var calificacion = response.Calificacion

        esCargoDocente = response.CargoPostulado.CodCargoPostulado === CargosType.Docente;
                
        if (calificacion) {
            $('#divContenteAlert').prop('class', '');
            $('#stAlert').text('Usted se encuentra editando un perfil');
            $('#divContenteAlert').addClass("alert alert-info text-center");
        } else {
            $('#divContenteAlert').prop('class', '');
            $('#stAlert').text('Usted se encuentra validando un perfil');
            $('#divContenteAlert').addClass("alert alert-success text-center");
        }
          
        CAMPO_CEDULA_OCULTA.val(CAMPO_CEDULA.val());
        GLOBAL_RESPONSE = response;
        DIV_ACCIONES.removeClass('hidden');

        CAMPO_OCULTO_CODCANDIDATO.val(response.CodCandidato);
                    
        CAMPO_CARGO_POSTULADO.val(response.CargoPostulado.Nombre);
        CAMPO_REGIONAL_RESIDE.val(response.Provincia);
        CAMPO_DISTRITO_RESIDE.val(response.Municipio);
        CAMPO_DISTRITOS_MUNICIPALES.val(response.DistritosMunicipales);
        CAMPO_SECCIONES_MUNICIPALES.val(response.SeccionesMunicipales);
        CAMPO_BARRIOS.val(response.Barrios);
        CAMPO_APELLIDOS.val(response.Apellidos);
        CAMPO_NOMBRE.val(response.Nombres);
        CAMPO_ESTADO_CIVIL.val(response.EstadoCivil);
        CAMPO_NACIONALIDAD.val(response.Nacionalidad);
        CAMPO_DIRECCION.val(response.Direccion);
        CAMPO_TELEFONO.val(response.TelResidencial);
        CAMPO_CELULAR.val(response.Celular);
        CAMPO_CORREO.val(response.Email);
        CAMPO_EDAD.val(response.Edad);
        CAMPO_CARGO_ACTUAL.val(response.CargoActual);
        CAMPO_ANIO_SERVICIO.val(response.AnioLaborando);
        CAMPO_CARGO_ACTUAL2.val(response.CargoActual);
        CAMPO_ANIO_SERVICIO2.val(response.AnioLaborando);
        CAMPO_JUSTIFICACION.val(response.Justificacion);
        $('#txtApellidosE').val(response.Apellidos);
        $('#txtNombreE').val(response.Nombres);
        $('#txtCantHijosE').val(response.CantHijos);
        $('#txtDireccionE').val(response.Direccion);
        $('#txtTelResidencialE').val(response.TelResidencial);
        $('#txtCelularE').val(response.Celular);
        $('#txtCorreoE').val(response.Email);
        $('input[name="estadoRegistro"][value="' + response.CodEstado + '"]').prop('checked', true);

        llenarTablaDocumentos(response.CheckListDocumentosViewModels, response.CodCandidatoHash);
    };

    var terminarVerificacion = function () {
        var valueEstado = parseInt($("input[name=estadoRegistro]:checked").val());
        if (ConfirmaRevisionEstenCompleta() === false && valueEstado !== 4 ) {            
            alert("Estimado usuario, el estado de este candidato debe ser marcado como incompleto, Porque falta por marcar ciertas informaciones en la sección 2, area revisión.");
            return;
        }
        
        if (validarFormulario()) {
            $('#GifContainer').removeClass('hidden');

            var formData = new FormData();

            // formData.append("FormularioCompletado", $('#chk1').is(':checked'));
            formData.append("ActaNacimientoCertificada", false); // REMOVED
            formData.append("CedulaAmbosLados", false); // REMOVED
            formData.append("CertMedico", false); // REMOVED
            formData.append("CertAntecedenteNP", false); // REMOVED
            formData.append("CV", false); // REMOVED
            formData.append("CopiaDeTituloDeGrado", false); // REMOVED
            formData.append("CertificadoLegalizadoMescyt", false); // REMOVED
            formData.append("CertificacionPorDirectorDondeLabora", false); // REMOVED
            formData.append("CodFormacionAcademica", 0); // REMOVED
            formData.append("CodCriterioFormacion", 0); // REMOVED
            formData.append("FormacionesAcademicas", 0); // REMOVED
            if (!esCargoDocente) {
                formData.append("CodOtrosEstudios", 0); // REMOVED
                formData.append("CodCriterioEstudios", 0); // REMOVED
            }
            formData.append("CodTiempoExperiencia", 0); // REMOVED
            formData.append("CodTiempoExperienciaInterina", 0); // REMOVED
            formData.append("CodCriterioExperiencia", 0); // REMOVED
            formData.append("CodCriterioExperienciaInterina", 0) // REMOVED
            formData.append("CodCriterioResidencia", 0); // REMOVED
            formData.append("FueSancionado", 2); // REMOVED
            formData.append("DocSancionado", 0); // REMOVED
            formData.append("DocSancionadoString", null); // REMOVED
            formData.append("CodComisionEvaluadora", 0); // REMOVED
            formData.append("MiembroComisionEvaluadora", 0); // REMOVED
            formData.append("PuntoExperienciaInterina", 0); // REMOVED

            formData.append("Justificacion", $("#txtJustificacion").val());
            formData.append("CorreoEletronico", $("#txtCorreo").val());
            formData.append("CodCandidato", CAMPO_OCULTO_CODCANDIDATO.val());
            formData.append("CodEstado", parseInt($('input[name="estadoRegistro"]:checked').val()));
            formData.append("PuntuacionPerfil", parseInt($("#txtPuntuacion").val()));
            
            let result = []
            CHECKLIST_RESULTADO.forEach(item => {
                result.push({
                    "Documento": item.code,
                    "Puntuacion": item.points,
                    "CodCandidato": CAMPO_OCULTO_CODCANDIDATO.val(),
                    "NoAcorde": item.no_cumple,
                    "Acorde": item.acorde
                });
            });
            console.log(result)
            formData.append("CheckListDocumentos", JSON.stringify(result));

            var xhr = new XMLHttpRequest();
            xhr.open("POST", ruta + "Formulario/TerminarVerificacion");
            xhr.onreadystatechange = function (aEvt) {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        $('#GifContainer').addClass('hidden')
                        alert('Todo ha salido satisfactoriamente');
                        window.location = ruta + 'Formulario/ConsultaCandidatos';
                    }
                    else {
                        $('#GifContainer').addClass('hidden')
                        alert('Algo ha salido mal');
                    }
                }
            };
            xhr.send(formData);
        }
        else {
            alert('Por favor, revise todos los campos del formulario');
        }
    };

    var validarFormulario = function () {
        var success = true;
        var xssRegex = new RegExp('<(.|\n)*?>');

        $('.errEstado').addClass('hidden');
        $('.errSancionado').addClass('hidden');
        $('.errJustificacionVacio').addClass('hidden');
        $('.errJustificacion').addClass('hidden');
        $('.errDocSancionado').addClass('hidden');

        if (!$('input[name="estadoRegistro"]:checked').val()) {
            $('.errEstado').removeClass('hidden');
            success = false;
        }

        if (!DIV_JUSTIFICACION.hasClass('hidden'))
        {
            var valueEstadoRegistro = $('input[name="estadoRegistro"]:checked').val();
            var val = CAMPO_JUSTIFICACION.val();
            if (val === '' && valueEstadoRegistro === "3" | valueEstadoRegistro === "4" ) {
                $('.errJustificacionVacio').removeClass('hidden');
                success = false;
            }
            else if (xssRegex.test(val)) {
                $('.errJustificacion').removeClass('hidden');
                success = false;
            }
        }
        return success;
    };

    var limpiarFormulario = function () {
        CAMPO_CEDULA_OCULTA.val('');
        PUNTUACIONFINAL = [0, 0, 0, 0, 0];
        $('.errEstado').addClass('hidden');
        $('.errJustificacionVacio').addClass('hidden');
        $('.errJustificacion').addClass('hidden');
        $('.errDocSancionado').addClass('hidden');
        $('#txtPuntuacion').val(0);
        $('#txtDireccion').val('');
        $('#txtJustificacion').val('');

        $(':input', '#Acciones').each(function (index, obj) {
            var self = $(obj);
            if (self.attr('type') === 'text') {
                self.val('');
            }
        });

        $('input[name="estadoRegistro"]').prop('checked', false);
    };

    // -- Fin Funciones--
    BOTON_BUSCAR_CEDULA.on('click', buscadorCedula);
    BOTON_TERMINAR_VERIFICACION.on('click', terminarVerificacion);
    RADIO_ESTADOS.on('change', manejadorEstados);
    BOTON_BUSCAR_CEUDLA_PADRON.on("click", buscadorCedulaPadron);
});

$(document).ajaxError(function (jqXHR) {
    $("#GifContainer").addClass("hidden");
    //swal("Atención", "¡Algo ha salido mal!", "error");
    console.error(jqXHR.responseJSON.message);
});

$("input[name=estadoRegistro]").click(function ()
{
    var value = parseInt($("input[name=estadoRegistro]:checked").val());
    if (ConfirmaRevisionEstenCompleta() === false && value != 4 && value != 2) {
        alert("Estimado usuario, no puede cambiar el estado incompleto, hasta completar el listado de datos sumistrado en la sección 2, en revisión");
        $('input[name="estadoRegistro"][value="4"]').prop('checked', true);
        return false;    
    }
});

$("input[name=revision]").click(function () {
    ValidaRevision();
});

function ConfirmaRevisionEstenCompleta(){
    var cantidadExistente = $("input[name=revision]").length;
    var cantidadSeleccionado = $("input[name=revision]:checked").length;
    var cantidadFaltante = (cantidadExistente - cantidadSeleccionado);
    if (cantidadFaltante === 1 && $("#chkCertificacionPorDirectorCentroEducLabora").is(':checked') === false)
    {
        return true;
    }
     
    if (cantidadSeleccionado < cantidadExistente)
        return false;

    return true;
}

$("#btnTapRegresarListado").click(function () {
    window.location = ruta + 'Formulario/ConsultaCandidatos';
});

$(document).ready(function () {
    var cedulaValue = $("#txtCedula").val();
    if (cedulaValue !== "" && cedulaValue !== null && cedulaValue !== "--") {
        $("#drpAcciones").val("1");
        $('#VerificarDocumentos').removeClass('hidden');
        $("#comisionEvaluadora").removeClass('hidden');
        $("#btnBuscarCedula").click();
    } else {
        window.location = ruta + 'Formulario/ConsultaCandidatos';
    }
});