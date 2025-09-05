
$(document).ready(function () {
    $('#mitabla').DataTable({
        "scrollX": true,
        "language": {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
            "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Entradas",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        "paging": true,
        "searching": true,
        "paginate": true,
        "pageLength": 10,
        "autoWidth": false,
        "lengthChange": false,
        "ordering": true,
        "filter": true,
        "serverSide": true,
        "Processing": true,
        "columns": [
            {
                "data": "ReclamoCod", "title": "Codigo Reclamo", "name": "CodReclamo", "render": function (data) {
                    while (data.toString().length < 6) {
                        data = "0" + data;
                    }
                    return data;
                }
            },
            {
                "data": "FechaIngreso", "title": "Fecha reclamo (AAAA-MM-DD)", "name": "FechaIngreso", "render": function (data) {
                    return moment(data).format('YYYY-MM-DD');
                }
            },
            { "data": "CedulaCandidato", "title": "Cédula", "name": "Cedula" },
            { "data": "Candidato", "title": "Candidato", "name": "Nombres" },
            { "data": "CargoPostula", "title": "Cargo postulación", "name": "DescripcionCargo" },
            { "data": "RegionalPostularse", "title": "Regional postula", "name": "Regional" },
            { "data": "DiasFaltantes", "title": "Días faltantes", "name": "FechaLimite" },
            { "data": "UsuarioModificacion", "title": "Analista", "name": "Usuario" },
            { "data": "Fase", "title": "Fase", "name": "DescripcionFase" },
            { "data": "Estado", "title": "Estado", "name": "Estatus" },
            {
                "mRender": function (data, type, row) {
                    return '<button onclick="goToRecomendacion(' + row.ReclamoCod + ')" class="btn btn-primary">Ver</a>';
                }, 'sortable': false, "title": 'Acciones'
            }

            //{ "data": "TelResidencial", "title": "Telefono" },
            //{ "data": "Celular", "title": "Celular" },
            //{ "data": "DistritoReside", "title": "Distrito reside" },
            //{ "data": "RegionalReside", "title": "Regional reside" },
            //{
            //    "data": "FechaLimite", "title": "Fecha limite respuesta", "render": function (data) {
            //        moment.locale('es');
            //        return moment(data).locale('es').format('LLLL');
            //    }
            //},
        ],
        "columnDefs": [
            { "className": "dt-center", "targets": "_all" },
            { "width": "15%", "targets": 2 }
        ],
        "ajax": {
            "url": `${origen}/api/Reclamaciones/PostDataTableReclamaciones`,
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "data": function (d) {
                var obj = { "Data": d };
                return JSON.stringify(obj);
            },
            "error": function (jqXHR, statusCode, error) {
                console.error(error);
                $('#mitabla').DataTable().clear().draw();
            }
        }
    });
});



var goToRecomendacion = function (codReclamo) {
    window.location.href = `${origen}/Reclamacion/${codReclamo}`;
}



