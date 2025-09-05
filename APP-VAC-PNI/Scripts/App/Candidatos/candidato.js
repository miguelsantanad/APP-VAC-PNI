
function fillInfoCandidatos(cedula) {

    $.get(ruta + 'api/Candidatos/' + cedula)
        .done(function (data) {

            document.getElementById('infoPersonas-nombre').innerText = data.Nombre;
            document.getElementById('infoPersonas-fecha').innerText = moment(data.FechaIngreso).format('DD/MM/YYYY hh:mm A');
            document.getElementById('infoPersonas-regional').innerText = data.Regional;
            document.getElementById('infoPersonas-distrito').innerText = data.Distrito;
            document.getElementById('infoPersonas-cargopostulado').innerText = data.CargoPostulado;
            document.getElementById('infoPersonas-cargo').innerText = data.Cargo;
            document.getElementById('infoPersonas-cedula').innerText = cedula;
            document.getElementById('infoPersonas-celular').appendChild(createAnchor('phone', data.Telefono.replace(/\D+/g, ''), data.Celular));
            document.getElementById('infoPersonas-telefono').appendChild(createAnchor('phone', data.Telefono.replace(/\D+/g, ''), data.Telefono));
            document.getElementById('infoPersonas-email').appendChild(createAnchor('email', data.Email, data.Email));
            Loading.finalizar();
        })
        .fail(function (jqXHR) {
            console.error(jqXHR.responseText);
            Loading.finalizar();
        });
}

function loadPDFViewer(cedula) {
    var urlDocumento = ruta + 'api/Candidatos/' + cedula + '/DocumentosRequeridos';
    var viewer = ruta + 'Scripts/PDFJS-Viewer/viewer.html?file=';
    document.getElementById('pdf-viewer').src = viewer + urlDocumento;
    Loading.finalizar();
}

function fillTiposDocumentos(cedula) {
    var url = ruta + 'api/TiposDocumentos';

    if (cedula)
        url += '/' + cedula;

    $.get(url)
        .done(function (data) {
            var root = document.getElementById('CheckBoxContainer');

            data.forEach(function (value, index) {
                var container = document.createElement('div');
                container.classList.add('form-check');

                var checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                var checkName = 'checkbox' + index;
                checkbox.id = checkName;
                checkbox.setAttribute('data-id', value.Id);
                checkbox.setAttribute('data-obligatorio', value.EsObligatorio);
                checkbox.classList.add('form-check-input');
                if (value.Validado)
                    checkbox.setAttribute('checked', 'checked');

                var label = document.createElement('label');
                label.htmlFor = checkName;
                label.classList.add('form-check-label');
                label.appendChild(checkbox);
                label.innerHTML += ' ' + value.Descripcion;

                container.appendChild(label);

                root.appendChild(container);

                Loading.finalizar();
            });
        })
        .fail(function (jqXHR) {
            console.log(jqXHR.responseText);
            Loading.finalizar();
        });
}

function fillObservaciones(cedula) {
    var url = ruta + 'api/Observaciones/' + cedula;

    $.get(url)
        .done(function (data) {
            var container = document.querySelector('ul.media-list.observaciones');
            var panel = document.getElementById('observacionesList');

            if (data != null && data.length > 0) {
                panel.classList.remove('hidden');
                data.forEach(function (value) {
                    var item = document.createElement('li');
                    item.classList.add('media');

                    var div1 = defaultImg();

                    var div2 = createCommentItem(value);

                    item.appendChild(div1);
                    item.appendChild(div2);

                    container.appendChild(item);
                });
            } else {
                panel.classList.add('hidden');
            }

            Loading.finalizar();
        })
        .fail(function (jqXHR) {
            console.error(jqXHR.responseText);
            Loading.finalizar();
        });
}

function fillInteracciones(cedula) {
    var url = ruta + 'api/Interacciones/' + cedula;

    Loading.iniciar();

    $.get(url)
        .done(function (data) {
            var container = document.querySelector('ul.media-list.interacciones');
            container.innerHTML = null;
            var panel = document.getElementById('interaccionesList');

            if (data != null && data.length > 0) {
                panel.classList.remove('hidden');
                data.forEach(function (value) {
                    var item = document.createElement('li');
                    item.classList.add('media');

                    var div1 = defaultImg();

                    var div2 = createCommentItem(value);

                    item.appendChild(div1);
                    item.appendChild(div2);

                    container.appendChild(item);
                });
            } else {
                panel.classList.add('hidden');
            }


            Loading.finalizar();
        })
        .fail(function (jqXHR) {
            console.error(jqXHR.responseText);
            Loading.finalizar();
        });
}

function createCommentItem(item) {
    var div = document.createElement('div');
    div.classList.add('media-body');

    var span = document.createElement('span');
    span.classList.add('text-muted');
    span.classList.add('pull-right');

    var small = document.createElement('small');
    small.classList.add('text-muted');
    small.innerText = moment(item.Fecha).format('DD/MM/YYYY hh:mm A');

    span.appendChild(small);

    var strong = document.createElement('strong');
    strong.classList.add('text-info');
    strong.innerText = item.Usuario;

    var comment = document.createElement('p');
    comment.innerText = item.Observacion;

    div.appendChild(span);
    div.appendChild(strong);
    div.appendChild(comment);

    return div;
}

function defaultImg() {
    var div = document.createElement('div');
    div.classList.add('pull-left');

    var img = document.createElement('img');
    img.src = ruta + '/img/user-default.png';
    img.alt = 'Default';
    img.classList.add('img-circle');

    div.appendChild(img);

    return div;
}

function savePreValidacion(cedula) {
    var checks = Array.from(document.querySelectorAll("input[type='checkbox']"));

    var vm = {
        Prevalidacion: checks.map(function (value) {
            return {
                CodTipoDocumento: value.dataset.id,
                Validado: value.checked,
                EsObligatorio: value.dataset.obligatorio
            };
        }),
        Observaciones: document.querySelector("textarea[name='observaciones']").value
    }

    var url = ruta + 'api/Candidatos/' + cedula;

    Loading.iniciar();

    $.post(url, vm)
        .done(function () {
            swal({
                title: "Guardado Exitosamente.",
                text: "Las observaciones y las opciones marcadas han sido guardadas con exito.",
                icon: "success",
                className: "text-center",
                button: "Ok"
            });
            Loading.finalizar();
            window.location.href = ruta + 'Candidatos/';
        })
        .fail(function (jqXHR) {
            Loading.finalizar();
            swal({
                title: "Error",
                text: "Ha ocurrido un error. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                icon: "error",
                className: "text-center",
                button: "Ok"
            });
            console.error(jqXHR.responseText);
        });
}

function saveInteraccion(cedula) {
    var url = ruta + 'api/Interacciones/' + cedula;

    var vm = {
        Observacion: document.querySelector("textarea[name='interacciones']").value
    }
    if (vm.Observacion !== "" && vm.Observacion !== '') {

        Loading.iniciar();

        $.post(url, vm)
            .done(function () {
                Loading.finalizar();
                swal({
                    title: "Guardado Exitosamente.",
                    text: "La interaccion ha sido guardada con exito.",
                    icon: "success",
                    className: "text-center",
                    button: "Ok"
                });
                document.querySelector("textarea[name='interacciones']").value = null;
                document.getElementById('btnCerrarInteraccion').click();
            })
            .fail(function (jqXHR) {
                Loading.finalizar();
                swal({
                    title: "Error",
                    text: "Ha ocurrido un error. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                    icon: "error",
                    className: "text-center",
                    button: "Ok"
                });
                console.error(jqXHR.responseJSON);
            });
    }
}

function updateStatus(cedula, estado) {
    var vm = {
        Estado: estado
    }

    var url = ruta + 'api/Candidatos/' + cedula;

    Loading.iniciar();

    $.ajax({
        url: url,
        type: 'PUT',
        data: JSON.stringify(vm),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function () {
            Loading.finalizar();
            swal({
                title: "Guardado Exitosamente.",
                text: "Se ha actualizado el estado con Exito.",
                icon: "success",
                className: "text-center",
                button: "Ok"
            }).then(function (value) {
                if (value) {
                    window.location.href = ruta + 'Candidatos/';
                }
            });
        },
        error: function () {
            Loading.finalizar();
            swal({
                title: "Error",
                text: "Ha ocurrido un error. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                icon: "error",
                className: "text-center",
                button: "Ok"
            });
        }
    });
}

$(document).ready(function () {
    var cedula = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);

    Loading.iniciar();

    fillTiposDocumentos(cedula);
    fillInfoCandidatos(cedula);
    loadPDFViewer(cedula);
    fillObservaciones(cedula);
    fillInteracciones(cedula);

    document.getElementById('btnGuardar').addEventListener('click',
        function () {
            savePreValidacion(cedula);
        });
    document.getElementById('btnGuardarInteraccion').addEventListener('click',
        function () {
            saveInteraccion(cedula);
            fillInteracciones(cedula);
        });
    document.getElementById('btnNoAplica').addEventListener('click',
        function () {
            updateStatus(cedula, 'No Aplica');
        });
});
