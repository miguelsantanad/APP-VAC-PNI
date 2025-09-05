
function setDataTable() {
    var columns = [
        { data: 'NombreUsuario', name: 'NombreUsuario', sTitle: 'Usuario' },
        { data: 'Rol', name: 'Rol', sTitle: 'Rol' },
        {
            data: 'Fecha', name: 'Fecha', sTitle: 'Fecha Ingreso',
            mRender: function (data) {
                return moment(data).format("DD/MM/YYYY hh:mm A");
            }
        },
        {
            data: 'Activo', name: 'Activo', sTitle: 'Activo', 
            mRender: function (data) {
                return (data) ? "Activo" : "Inactivo";
            }
        },
        {
            sTitle: "Acciones", bSearchable: false, bSortable: false, className: 'dt-width-action',
            data: function (data) {
                return data;
            },
            mRender: function (data) {
                return '<button type="button" class="btn btn-sm btn-outline btn-primary" onclick="setModalInputs(\'' + data.UsuarioId + '\',\'' + data.NombreUsuario + '\', ' + data.CodRol + ', ' + data.Activo + ')"  data-toggle="modal" data-target="#modalUsuarios"><i class="fa fa-pencil-square-o"/> Editar</button>';
            }
        }
    ];

    $.ajaxSetup({
        cache: false
    });

    var url = ruta + 'api/Usuarios/DataTable';

    var configuration = getDataTableConfiguration(url, columns, cantidadCandidatosPorPagina,
        function (data) {
            return $.extend({}, data, {
                NombreUsuario: $("input[name='nombreusuario']").val()
            });
        }, [
            {
                orderable: false,
                targets: "no-sort"
            },
            {
                className: "dt-center",
                targets: "_all"
            }
        ]);

    var table = $('#user-table').DataTable(configuration);
    Loading.Cerrar();

    $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
        console.error(message);
    };

    return table;
}

function setModalInputs(usuarioId, usuario, rol, activo) {
    document.querySelector("input[name='usuarioId']").value = usuarioId;
    document.querySelector("input[name='usuario']").value = usuario;
    document.querySelector("input[name='activo']").checked = activo;
    $("select[name='roles']").val(rol);
}

function clearModalInputs() {
    document.querySelector("input[name='usuarioId']").value = null;
    document.querySelector("input[name='usuario']").value = null;
    document.querySelector("input[name='cedula']").value = null;
    document.querySelector("input[name='activo']").checked = false;
    $("select[name='roles']").val(null);
}

function guardarUsuario(callback = null) {
    Loading.Abrir();


    var vm = {
        UsuarioId: document.querySelector("input[name='usuarioId']").value,
        NombreUsuario: document.querySelector('input[name="usuario"]').value,
        Rol: $('select[name="roles"] option:selected').text(),
        Activo: document.querySelector("input[name='activo']").checked
    };

    console.log(vm);

    var url = ruta + 'api/Usuarios/';

    $.post(url, vm)
        .done(function () {
            Loading.Cerrar();
            swal({
                title: "Guardado Exitosamente.",
                text: "El usuario ha sido guardado con exito sido guardadas con exito.",
                icon: "success",
                className: "text-center",
                button: "Ok"
            }).then(function (clicked) {
                if (clicked) {
                    if (callback) {
                        callback();
                    }
                }
            });
        })
        .fail(function (jqXHR) {
            swal({
                title: "Error",
                text: "Ha ocurrido un error. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                icon: "error",
                className: "text-center",
                button: "Ok"
            });
            Loading.Cerrar();
            console.error(jqXHR.responseText);
        });
}

function buscarUsuarioPorCedula(cedula) {
    Loading.Abrir();

    $.get(ruta + 'api/Usuarios/' + cedula)
        .done(function (data) {
            document.querySelector("input[name='usuario']").value = data.NombreUsuario;
            Loading.Cerrar();
        })
        .fail(function (jqXHR) {
            swal({
                title: "Error",
                text: "Ha ocurrido un error. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                icon: "error",
                className: "text-center",
                button: "Ok"
            });
            Loading.Cerrar();
            console.error(jqXHR.responseText);
        });
}

$(document).ready(function () {
    Loading.Abrir();
    $("input[name='cedula']").inputmask();
    var dataTable = setDataTable();

    fillDropdown($("select[name='roles']"), ruta + 'api/Dropdown/Roles');

    document.querySelector("input[name='cedula']").addEventListener('keypress',
        function (event) {
            if (event.keyCode === 13) {
                buscarUsuarioPorCedula(event.target.value);
            }
        });

    document.getElementById('btnBuscarPorCedula').addEventListener('click',
        function () {
            buscarUsuarioPorCedula(document.querySelector("input[name='cedula']").value);
        });

    document.querySelector("input[name='nombreusuario']").addEventListener('keypress',
        function (event) {
            if (event.keyCode === 13) {
                dataTable.draw();
            }
        });
    document.getElementById('btnBuscarPorNombreUsuario').addEventListener('click',
        function () {
            dataTable.draw();
        });

    document.getElementById('btnCerrarUsuario').addEventListener('click',
        function () {
            clearModalInputs();
        }
    );

    document.getElementById('btnCerrarModalUsuario').addEventListener('click',
        function () {
            clearModalInputs();
        }
    );

    document.getElementById('btnResetFiltros').addEventListener('click',
        function () {
            $("input[name='nombreusuario']").val('');
            dataTable.draw();
        });

    document.getElementById('btnGuardarUsuario').addEventListener('click',
        function () {
            guardarUsuario(function () {
                dataTable.draw();
            });
            dataTable.draw();
        });
});