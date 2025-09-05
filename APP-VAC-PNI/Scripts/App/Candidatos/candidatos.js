
function setDataTable() {
    var columns = [
        { data: 'Regional', name: 'Regional', sTitle: 'Regional' },
        { data: 'Distrito', name: 'Distrito', sTitle: 'Distrito' },
        { data: 'Cedula', name: 'Cedula', sTitle: 'Cédula' },
        { data: 'Nombre', name: 'Nombres', sTitle: 'Candidato' },
        { data: 'CargoPostulado', name: 'CargoPostulado', sTitle: 'Cargo Postulado' },
        {
            data: 'Fecha',
            name: 'Fecha',
            sTitle: 'Fecha Ingreso',
            mRender: function (data) {
                return moment(data).format("DD/MM/YYYY hh:mm A");
            }
        },
        { data: 'Estado', name: 'Estado', sTitle: 'Estado' },
        {
            sTitle: "Acciones", data: 'Cedula', bSearchable: false, bSortable: false, className: 'dt-width-action',
            mRender: function (data) {
                var route = ruta + 'Candidatos/' + data;
                return '<a class="btn btn-sm btn-primary" data="' + data + '"  href="' + route + '"><i class="fa fa-pencil-square-o"/> Ver</a>';
            }
        }
    ];

    $.ajaxSetup({
        cache: false
    });

    var url = ruta + 'api/Candidatos/';

    var configuration = getDataTableConfiguration(url, columns, cantidadCandidatosPorPagina,
        function (data) {
            return $.extend({},
                data,
                {
                    Regional: $("select[name='regional']").val(),
                    Distrito: $("select[name='distrito']").val(),
                    Cedula: $("input[name='cedula']").val(),
                    Estado: $("select[name='estados']").val()
                });
        });

    var table = $('#candidatos-table').DataTable(configuration);

    $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
        console.log(message);
    };

    return table;
}

$(document).ready(function () {

    $("input[name='cedula']").inputmask();

    if (sessionFilters.Cedula) {
        document.querySelector("input[name='cedula']").value = sessionFilters.Cedula;
    }

    fillDropdown($("select[name='regional']"), ruta + 'api/Dropdown/Regionales/',
        function () {
            selectSession(document.querySelector("select[name='regional']"), 'Regional');
        });
    fillDropdown($("select[name='estados']"), ruta + 'api/Dropdown/Estados/',
        function () {
            selectSession(document.querySelector("select[name='estados']"), 'Estado');
        });

    var dataTable = setDataTable();

    document.querySelector("select[name='regional']").addEventListener('change',
        function (event) {
            var $select = $("select[name='distrito']");

            if (event.target.value !== '') {
                $select.val('0');

                fillDropdown($select,
                    ruta + 'api/Dropdown/Distritos/' + event.target.value.match(/\d+/g),
                    function () {
                        selectSession(document.querySelector("select[name='distrito']"), 'Distrito');
                    }
                );

                $select.removeAttr('disabled');

            } else {
                $select.empty();
                $select.attr('disabled', 'disabled');
            }

            dataTable.draw();
        });

    document.querySelector("select[name='distrito']").addEventListener('change',
        function () {
            dataTable.draw();
        });
    document.querySelector("select[name='estados']").addEventListener('change',
        function () {
            dataTable.draw();
        });

    document.getElementById('btnBuscarPorCedula').addEventListener('click',
        function () {
            dataTable.draw();
        });
    document.querySelector("input[name='cedula']").addEventListener('keypress',
        function (event) {
            if (event.keyCode === 13) {
                dataTable.draw();
            }
        });

    document.getElementById('btnResetFiltros').addEventListener('click',
        function () {
            $("input[name='cedula']").val('');
            document.querySelector("select[name='distrito']").selectedIndex = 0;
            document.querySelector("select[name='regional']").selectedIndex = 0;
            document.querySelector("select[name='estados']").selectedIndex = 0;
            dataTable.draw();
        });

    function selectSession(select, key) {
        var value = sessionFilters[key];

        if (value) {
            select.value = value;
            select.dispatchEvent(new Event('change'));
        }
    }
});