
var tblAccesos = null;
var tblRoles = null;
var tblPermisos = null;
var codAcceso = null;
var codRol = null;
var accesos = [];
var roles = [];

$(document).ready(function () {
   

    $('#tblAccesos').on('click', 'tr', function (e) {
        accesos = tableClick($(this), "CodAcceso", accesos, tblAccesos);
    });

    $('#tblRoles').on('click', 'tr', function (e) {
        roles = tableClick($(this), "CodRol", roles, tblRoles);
    });

    $('#btn-crear-acceso').on('click', function (e) {
        var obj = {
            CodAcceso: codAcceso,
            Controlador: $('#txtControlador').val(),
            Accion: $('#txtAccion').val(),
            Descripcion: $('#txtDescripcion').val()
        };
        AjaxPost(obj, `${origen}api/Accesos/CrearActualizarAcceso`, () => {
            //var dataAccesos = tblAccesos.ajax.json().data;
            //var item = dataAccesos.filter(x => x.Controlador == obj.Controlador && x.Accion == obj.Accion);
            return true;//item.length == 0;
        }, () => { cleanAcceso(); });

    });   

    $('#btn-crear-rol').on('click', function (e) {
        var obj = {
            CodRol: codRol,
            Descripcion: $('#txtNombreRol').val()
        };
        AjaxPost(obj, `${origen}api/Accesos/CrearActualizarRol`, () => {
            var dataRoles = tblRoles.ajax.json().data;
            var item = dataRoles.filter(x => x.Descripcion == obj.Descripcion);
            return item.length == 0;
        }, () => { cleanRol(); });
    });

    function cleanAcceso() {
        $('#txtControlador').val("");
        $('#txtAccion').val("");
        $('#txtDescripcion').val("");
        codAcceso = null;
        $('#btn-crear-acceso').html('Crear');
        tblAccesos.ajax.reload();
    }

    function cleanRol() {
        $('#txtNombreRol').val("");
        codRol = null;
        $('#btn-crear-rol').html('Crear');
        tblRoles.ajax.reload();
    }

    function AjaxPost(vm, url, duplicadoCallback,callback) {
        if (validate(vm)) {
            if (duplicadoCallback()) {
                $.ajax({
                    url: url,
                    data: JSON.stringify(vm),
                    contentType: "application/json",
                    type: 'POST',
                    success: function (result) {
                        callback(result);
                    },
                    error: function (xhr) {
                        swal('Error', xhr.responseJSON, 'error');
                    }
                });
            } else {
                swal('Ya existe este registro', 'Debes cambiar los valores', 'warning');
            }
        } else {
            //Error
            swal('Rellenar campos', 'Debes completar todos los campos', 'error');
        }
    }


    function validate(object) {
        var keys = Object.keys(object);
        var valido = true;
        for (x = 0; x < keys.length; x++) {
            if (object[keys[x]] == "") {
                valido = false;
                break;
            }
        }
        return valido;
    }
    

    function tableClick(that, key, array, table) {
        var dataValue = table.row(that).data()[key];

        if (that.hasClass('datatable-row-click')) {
            that.removeClass('datatable-row-click');
            array = array.filter(function (value) {
                return value != dataValue;
            });
        }
        else {
            that.addClass('datatable-row-click');
            array.push(dataValue);
        }
        return array;
    }

    tblAccesos = $("#tblAccesos").DataTable({
        paging: true,
        ordering: true,
        searching: true,
        Processing: true,
        serverSide: true,
        paginate: true,
        select: true,
        ajax: {
            url: origen + "api/Accesos/PostDataTable",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: function (d) {
                return JSON.stringify({ "data": d });
            }
        },
        columns: [

            { data: "Descripcion", name: 'Descripcion', sTitle: 'Descripcion' },
            { data: 'Controlador', name: 'Controlador', sTitle: 'Controlador' },
            { data: "Accion", name: 'Accion', sTitle: 'Acción' },
            {
                data: "FechaIngreso", name: 'Fecha Ingreso', sTitle: 'Fecha Ingreso',
                "render": function (data) {
                    return moment(data).format('YYYY-MM-DD')
                }
            },
            {
                sTitle: "Opciones",
                //data: 'Hash',
                bSearchable: false,
                bSortable: false,
                class: 'center',
                "mRender": function (data, type, row) {
                    var button = '<span class="btn btn-primary" onclick="editAcceso(' + row.CodAcceso + ')" title="Editar" data="' + data + '" >' +
                        ' <i class="fa fa-pencil-square-o" ></i ></span> <span class="btn btn-danger btnEliminar-acceso" onclick="deleteAcceso(' + row.CodAcceso + ')" title="Eliminar" data="' + data + '" >' +
                        ' <i class="fa fa-trash" ></i ></span>';
                    return button;
                }
            }
        ],
        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
        Length: 5,
        lengthChange: false,
        oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
    });

    tblRoles = $("#tblRoles").DataTable({
        paging: true,
        ordering: true,
        searching: true,
        Processing: true,
        serverSide: true,
        paginate: true,
        ajax: {
            url: origen + "api/Accesos/PostDataTableRoles",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: function (d) {
                return JSON.stringify({ "data": d });
            }
        },
        columns: [

            { data: "Descripcion", name: 'Descripcion', sTitle: 'Nombre' },
            {
                data: "FechaIngreso", name: 'Fecha Ingreso', sTitle: 'Fecha Ingreso',
                "render": function (data) {
                    return moment(data).format('YYYY-MM-DD')
                }
            },
            {
                sTitle: "Opciones",
                //data: 'Hash',
                bSearchable: false,
                bSortable: false,
                class: 'center',
                "mRender": function (data, type, row) {
                    var button = '<span class="btn btn-primary btnEditar" onclick="editRol(' + row.CodRol + ')" title="Editar" data="' + data + '" >' +
                        ' <i class="fa fa-pencil-square-o" ></i ></span> <span class="btn btn-danger btnEliminar" onclick="deleteRol(' + row.CodRol + ')" title="Eliminar" data="' + data + '" >' +
                        ' <i class="fa fa-trash" ></i ></span>';
                    return button;
                }
            }
        ],
        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
        Length: 5,
        lengthChange: false,
        oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
    });

    tblPermisos = $("#tblpermisos").DataTable({
        paging: true,
        ordering: true,
        searching: true,
        Processing: true,
        serverSide: true,
        paginate: true,
        ajax: {
            url: origen + "api/Accesos/PostDataTablePermisos",
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data: function (d) {
                return JSON.stringify({ "data": d });
            }
        },
        columns: [
            { data: "RolNombre", name: 'Rol', sTitle: 'Rol' },
            { data: "Controlador", name: 'Controlador', sTitle: 'Controlador' },
            { data: "Accion", name: 'Accion', sTitle: 'Acción' },
            {
                data: "FechaIngreso", name: 'Fecha Ingreso', sTitle: 'Fecha Ingreso',
                "render": function (data) {
                    return moment(data).format('YYYY-MM-DD')
                }
            },
            {
                sTitle: "Opciones",
                //data: 'Hash',
                bSearchable: false,
                bSortable: false,
                class: 'center',
                "mRender": function (data, type, row) {
                    var button = '<span class="btn btn-danger btnEliminar" onclick="deletePermiso('+ row.CodPermiso +')" title="Eliminar" data="' + data + '" >' +
                        ' <i class="fa fa-trash" ></i ></span>';
                    return button;
                }
            }
        ],
        lengthMenu: [[5, 10, 25, 50], [5, 10, 25, 50]],
        Length: 5,
        lengthChange: false,
        oLanguage: { 'sUrl': "../Scripts/dataTable.es.js" }
    });

    $('#btnAsign').on('click', function () {
        if ((roles.length * accesos.length) > 0) {

            var obj = sacarPermisosDuplicados();

            if (obj.length == 0) {
                swal('Advertencia', 'Estos permisos ya han sido creados', 'error');
            } else {
                $.ajax({
                    url: `${origen}api/Accesos/AsignarPermisos`,
                    data: JSON.stringify(obj),
                    cache: false,
                    contentType: "application/json",
                    processData: false,
                    type: 'POST',
                    success: function (Result) {
                        swal('Operación satisfactoria', 'Éxito', 'success');
                        roles = [];
                        accesos = [];
                        $('#tblRoles tr').removeClass('datatable-row-click');
                        $('#tblAccesos tr').removeClass('datatable-row-click');
                        tblPermisos.ajax.reload();
                    }
                });
            }
        } else {
            swal('Seleccionar los registros', 'Debes seleccionar al menos un Rol y un Acceso', 'error');
        }
    });

    function sacarPermisosDuplicados() {
        var permisos = tblPermisos.ajax.json().data;
        var array = [];

        for (x = 0; x < roles.length; x++)
        {
            for (y = 0; y < accesos.length; y++)
            {
                var ace = accesos[y];
                var rol = roles[x];
                var item = permisos.filter(x => parseInt(x.CodAcceso) === parseInt(ace) && parseInt(x.CodRol) === parseInt(rol));
                if (item.length == 0) {
                    array.push({ CodAcceso: accesos[y], CodRol: roles[x] });
                }
            }
        }
        return array;
    }
});

function editAcceso(cod) {
    var data = tblAccesos.ajax.json().data;
    var item = data.filter(x => x.CodAcceso == cod)[0];
    codAcceso = cod;
    $('#btn-crear-acceso').html('Actualizar');
    $('#txtControlador').val(item.Controlador);
    $('#txtAccion').val(item.Accion);
    $('#txtDescripcion').val(item.Descripcion);
}

function editRol(cod) {
    var data = tblRoles.ajax.json().data;
    var item = data.filter(x => x.CodRol == cod)[0];
    codRol = cod;
    $('#btn-crear-rol').html('Actualizar');
    $('#txtNombreRol').val(item.Descripcion);
}

function remove (url, callback) {
    swal('Esta segur@ ?', 'Eliminar registro', 'warning').then((OK) => {
        if (OK) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function () {
                    callback();
                },
                error: function (xhr) {
                    swal('Error', xhr.responseJSON, 'error');
                }
            });
        }
    });
}

function deleteRol(cod) {
    remove(`${origen}api/Accesos/EliminarRol/${cod}`, () => {
        tblRoles.ajax.reload();
    });
}

function deleteAcceso(cod) {
    remove(`${origen}api/Accesos/EliminarAcceso/${cod}`, () => {
        tblAccesos.ajax.reload();
    });
}

function deletePermiso(cod) {
    remove(`${origen}api/Accesos/EliminarPermiso/${cod}`, () => {
        tblPermisos.ajax.reload();
    });
}