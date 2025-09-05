
$(document).ready(function () {
    $("#Cedula").mask('999-9999999-9');
    GetDatosEstado();
});

function GetDatosEstado() {
    $.ajax({
        url: `${origen}/api/Entrevista/Estados`,
        contentType: "application/json",
        type: 'GET',
        success: function (result) {
            var _op = "";
            var _select = "";
            if (result == 404 || result == null) {
                swal('Error', 'Ha ocurrido un error', 'error');
            } else {
                result.splice(0, 0, {
                    "CodEstado": 0,
                    "Descripcion": "--Selecionar un estado--"
                });
                result.forEach(function (value, i) {
                    _op += `<option value="${value.CodEstado}"> ${value.Descripcion}</option> `;
                });
                _select += `<select class="form-control chosen-select" id="CodigoEstado" name="CodigoEstado">
                            ${_op}
                    </select>`;
                $('#_displaySelectBox').html(_select);
            }
        },
        error: function (xhr) {
            swal('Error', xhr.responseJSON, 'error');
        }
    });
}

var $tblCandidatos = $("#tblCandidatos").dataTable({
    paging: true,
    ordering: false,
    searching: false,
    Processing: true,
    serverSide: true,
    paginate: true,
    ajax: {
        url: ConsultaEntrevistaUrl,
        type: 'POST',
        data: function (d) {
            d.Cedula = $("#Cedula").val(),
                d.Estado = $("#CodigoEstado").val()
        }
    },
    columns: [{ data: "Cedula", name: 'Cedula', sTitle: 'Cédula' },
    { data: "Nombres", name: 'Nombres', sTitle: 'Nombre' },
    { data: "Apellidos", name: 'Apellidos', sTitle: 'Apellido' },
    { data: "Cargo", name: 'Cargo', sTitle: 'Cargo' },
    { data: "Estado", name: 'Estado', sTitle: 'Estado' },
        { data: "FechaCreacion", name: 'FechaCreacion', sTitle: 'Fecha creación' },
    //{ data: "DescripcionEstadoPrevalidacion", name: 'DescripcionEstadoPrevalidacion', sTitle: 'Estado Prevalidación' }, 
    {
        sTitle: "Opción",
        data: 'CodCandidato',
        bSearchable: false,
        bSortable: false,
        class: 'center',
        "width": "25%",
        "mRender": function (data, e, row) {
            var button = '<a class="btn btn-primary btnVerDetalle" title="Presione para ver el detalle de este candidato." hash="' + row['CodigoCandidato'] + '" data="' + data + '"  href=#>' +
                ' <i class="fa fa-pencil-square-o" ></i > Ver detalle  </a> <a class="btn btn-success btnVerRespuestas" title="Presione para ver las respuestas de este candidato." hash="' + row['CodigoCandidato'] + '" data="' + data + '"  href=#>' +
                ' <i class="fa fa-pencil-square-o" ></i > Ver respuestas  </a>';
            return button;
        }
    }
    ],
    lengthMenu: [[10, 10, 25, 50], [5, 10, 25, 50]],
    Length: 10,
    lengthChange: false,
    oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
});

$(document).on("click", ".btnVerDetalle", function () {
    var valores = [];
    var nu = 0;
    $(this).parents("tr").find("td").each(function () {
        if (nu < 6) {
            valores.push($(this).html())
        }
        nu++;
    });
    var CodCandidato = $(this).attr("data");
    $.ajax({
        url: `${origen}/api/Entrevista/EstadoEntrevistaObservacion//${CodCandidato}`,
        contentType: "application/json",
        type: 'GET',
        success: function (result) {
            var html = "";
            var desc = "";
            var cont = 1;
            if (result.ConsultaEstadoEntre.length > 0) {
                $('#_cedula').text(valores[0]);
                $('#_nombreCompleto').text(valores[1] +" "+ valores[2]);
                $('#_cargo').text(valores[3]);
                $('#_estado').text(valores[4]);
                $('#_fechaCreacion').text(valores[5].substring(0, 9));
                valores.pop();
                result.ConsultaEstadoEntre.forEach(function (value, i) {
                    if (desc != value.Descripcion) {
                        desc = value.Descripcion
                        html += `<div>
                                    <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>COMPETENCIA</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><strong>${value.Descripcion}</strong></div>
                                    </div>`;
                    }
                    html += `<div>
                                    <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>Observacion ${cont}</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><p>${value.Observacion}</p></div>
                                    </div>`;
                    if (cont == 2) {
                        cont = 0;
                    }
                    cont++;
                });
                $('#displayEntrevista').html(html);
                $('#_displayCheckbox').html("");
                if (result.Estado.length > 0) {
                    var _htmlP0 = "";
                    var _htmlP1 = "";
                    var _html1 = "";
                    result.Estado.forEach(function (value, i) {
                        if (i <= 2) {
                            _htmlP0 += ` <div class="col-md-4">
                                      <label class="_customLabel" for="cbox2">${value.Descripcion}</label>
                                    </div>`
                        }
                        if (i >= 3) {
                            _htmlP1 += ` <div class="col-md-4">
                                     <label class="_customLabel" for="cbox2">${value.Descripcion}</label>
                                    </div>`
                        }
                    })
                    _html1 += `<div class="container-fluid _cfd">
                              <div class="row">
                                ${_htmlP0}
                                </div>
                                <div class="row">
                                ${_htmlP1}
                              </div>
                        </div>`
                    $('#_displayCheckbox').html(_html1);
                   
                }
                $('#myModal').modal('show');
            } else if (result == 404) {
                
            } else {
               
            }
        },
        error: function (xhr) {
            
        }
    });
});

$(document).on("click", ".btnVerRespuestas", function () {
    var valores = [];
    var nu = 0;
    $(this).parents("tr").find("td").each(function () {
        if (nu < 6) {
            valores.push($(this).html())
        }
        nu++;
    });
    var CodCandidato = $(this).attr("data");
    $.ajax({
        url: `${origen}/api/Entrevista/RespuestaEntrevista//${CodCandidato}`,
        contentType: "application/json",
        type: 'GET',
        success: function (result) {
            var html = "";
            if (result.length > 0) {
                $('#_cedulaR').text(valores[0]);
                $('#_nombreCompletoR').text(valores[1] + " " + valores[2]);
                $('#_cargoR').text(valores[3]);
                $('#_estadoR').text(valores[4]);
                $('#_fechaCreacionR').text(valores[5].substring(0, 9));
                valores.pop();
                var competencia = null;
                result.forEach(function (value, i) {
                    if (i < 11) {
                        var obj = result[i];
                        var obj2 = result[i + 1];
                        if (competencia != obj.CompetenciaDescripcion) {
                            html += `<div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>COMPETENCIA</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><strong>${obj.CompetenciaDescripcion}</strong></div>
                                    </div>`;
                            html += obtenerHtml(obj, obj2);
                        }
                        competencia = obj.CompetenciaDescripcion;
                    }
                });
                $('#displayRespuestaEntrevista').html(html);
                $('#myModalRespuesta').modal('show');
            } 
        },
        error: function (xhr) {

        }
    });
});

$(document).on("click", "#btnBuscarCandidato", function () {
    $tblCandidatos.api().ajax.reload(null, false);
});

$(document).on("click", "#btnLimpiarCampos", function () {
    LimpiarTodosCampos();
});

function LimpiarTodosCampos() {
    $("#Cedula").val("");
    $("#CodigoEstado").val("0");
    $tblCandidatos.api().ajax.reload(null, false);
}

function obtenerHtml(obj, obj2) {
   return  `   <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>Rubrica 1</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><p>${obj.Rubrica}</p></div>
                                    </div>
                                    <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>Respuesta Rubrica 1</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><p>${obj.Letra}) ${obj.Respuesta}</p></div>
                                    </div>
                                    <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>Rubrica 2</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><p>${obj2?.Rubrica}</p></div>
                                    </div>
                                    <div class="row _mt">
                                        <div class="col-sm-12 col-md-3 _mtsp _bc text-center"><strong>Respuesta Rubrica 2</strong></div>
                                        <div class="col-sm-12 col-md-9 _mtsp "><p>${obj2.Letra}) ${obj2.Respuesta}</p></div>
                                    </div>`;
}