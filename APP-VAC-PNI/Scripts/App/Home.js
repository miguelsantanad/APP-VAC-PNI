
//function setDataTable() {
//    var columns = [
//        { data: 'Id', name: 'Id', sTitle: 'Id' },
//        { data: 'CedulaDocente', name: 'CedulaDocente', sTitle: 'Docente' },
//        { data: 'NombreDocente', name: 'NombreDocente', sTitle: 'Nombre' },
//        { data: 'Estado', name: 'Estado', sTitle: 'Estado' },
//        {
//            data: 'FechaCreacion',
//            name: 'FechaCreacion',
//            sTitle: 'Fecha de evaluación',
//            mRender: function (data) {
//                return moment(data).format("DD/MM/YYYY hh:mm A");
//            }
//        }
//       /* { data: 'Estado', name: 'Estado', sTitle: 'Estado' },*/
//        //{
//        //    sTitle: "Acciones", data: 'Cedula', bSearchable: false, bSortable: false, className: 'dt-width-action',
//        //    mRender: function (data) {
//        //        var route = ruta + 'Candidatos/' + data;
//        //        return '<a class="btn btn-sm btn-primary" data="' + data + '"  href="' + route + '"><i class="fa fa-pencil-square-o"/> Ver</a>';
//        //    }
//        //}
//    ];

//    $.ajaxSetup({
//        cache: false
//    });

//    var url = ruta + 'Home/getObtenerDocentesPorUsuario';

//    var configuration = getDataTableConfiguration(url, columns,
//        function (data) {
//            return $.extend({},
//                data,
//                {
//                    Regional: $("select[name='regional']").val(),
//                    Distrito: $("select[name='distrito']").val(),
//                    Cedula: $("input[name='cedula']").val(),
//                    Estado: $("select[name='estados']").val()
//                });
//        });

//    var table = $('#candidatos-table').DataTable(configuration);

//    $.fn.dataTable.ext.errMode = function (settings, helpPage, message) {
//        console.log(message);
//    };

//    return table;
//}

//$(document).ready(function () {

//    //if (sessionFilters.Cedula) {
//    //    document.querySelector("input[name='cedula']").value = sessionFilters.Cedula;
//    //}

//    //fillDropdown($("select[name='regional']"), ruta + 'api/Dropdown/Regionales/',
//    //    function () {
//    //        selectSession(document.querySelector("select[name='regional']"), 'Regional');
//    //    });
//    //fillDropdown($("select[name='estados']"), ruta + 'api/Dropdown/Estados/',
//    //    function () {
//    //        selectSession(document.querySelector("select[name='estados']"), 'Estado');
//    //    });

//   setDataTable();

//    //document.querySelector("select[name='regional']").addEventListener('change',
//    //    function (event) {
//    //        var $select = $("select[name='distrito']");

//    //        if (event.target.value !== '') {
//    //            $select.val('0');

//    //            fillDropdown($select,
//    //                ruta + 'api/Dropdown/Distritos/' + event.target.value.match(/\d+/g),
//    //                function () {
//    //                    selectSession(document.querySelector("select[name='distrito']"), 'Distrito');
//    //                }
//    //            );

//    //            $select.removeAttr('disabled');

//    //        } else {
//    //            $select.empty();
//    //            $select.attr('disabled', 'disabled');
//    //        }

//    //        dataTable.draw();
//    //    });

//    //document.querySelector("select[name='distrito']").addEventListener('change',
//    //    function () {
//    //        dataTable.draw();
//    //    });
//    //document.querySelector("select[name='estados']").addEventListener('change',
//    //    function () {
//    //        dataTable.draw();
//    //    });

//    //document.getElementById('btnBuscarPorCedula').addEventListener('click',
//    //    function () {
//    //        dataTable.draw();
//    //    });
//    //document.querySelector("input[name='cedula']").addEventListener('keypress',
//    //    function (event) {
//    //        if (event.keyCode === 13) {
//    //            dataTable.draw();
//    //        }
//    //    });

//    //document.getElementById('btnResetFiltros').addEventListener('click',
//    //    function () {
//    //        $("input[name='cedula']").val('');
//    //        document.querySelector("select[name='distrito']").selectedIndex = 0;
//    //        document.querySelector("select[name='regional']").selectedIndex = 0;
//    //        document.querySelector("select[name='estados']").selectedIndex = 0;
//    //        dataTable.draw();
//    //    });

//    //function selectSession(select, key) {
//    //    var value = sessionFilters[key];

//    //    if (value) {
//    //        select.value = value;
//    //        select.dispatchEvent(new Event('change'));
//    //    }
//    //}
//});

$(function () {
    //fetch(`${origen}/Home/getObtenerDocentesPorUsuario`)
    //        .then(response => response.json())
    //        .then(data => {
    //            if (data.success) {
    //                htmlTablaHome(data)
    //            } else {
    //                swal('Advertencia', 'El número de cédula digitado no existe o no es una cédula válida.', 'warning');
    //            }
    //        }).catch(error => console.error('Error:', error));


        let urlServidor = `${origen}/Home/getObtenerDocentesPorUsuario`; // Reemplaza con la URL de tu servidor
        let filasPorPagina = 5;

        // Obtener la tabla y el contenedor de paginación
    let tabla = document.getElementById("mi-tabla").getElementsByTagName("tbody")[0];
        let paginacion = document.getElementById("paginacion");

        // Función para mostrar los datos paginados en la tabla
        function mostrarPagina(pagina) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", urlServidor + "?pagina=" + pagina + "&filasPorPagina=" + filasPorPagina, true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let data = JSON.parse(xhr.responseText);
                    tabla.innerHTML = ""; // Vaciar la tabla antes de agregar los nuevos datos
                    let id = 0;

                    data.data.forEach(function (item) {
                        id++;
                        let date = new Date(item.FechaCreacion)
                        let day = `${(date.getDate())}`.padStart(2, '0');
                        let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
                        let year = date.getFullYear();
                        let fila = `<tr>
                                          <td>${id}</td>
                                          <td>${item.CedulaDocente}</td>
                                          <td>${item.NombreDocente}</td>
                                          <td>${item.Estado}</td>
                                          <td>${month}/${day}/${year}</td>
                                       </tr>`;
                        tabla.insertAdjacentHTML("beforeend", fila);
                    });

                    // Actualizar los botones de paginación
                    paginacion.innerHTML = "";
                    for (let i = 1; i <= data.numPaginas; i++) {
                        let li = document.createElement("li");
                        li.className = "page-item";
                        let link = document.createElement("a");
                        link.className = "page-link";
                        link.href = "#";
                        link.textContent = i;
                        li.appendChild(link);
                        paginacion.appendChild(li);
                    }
                } else {
                    console.error("Error al obtener los datos. Código de estado:", xhr.status);
                }
            };
            xhr.onerror = function () {
                console.error("Error de red al obtener los datos.");
            };
            xhr.send();
        }

        // Mostrar la primera página por defecto
        mostrarPagina(1);

        // Manejar el evento clic en los botones de paginación
        paginacion.addEventListener("click", function (event) {
            let pagina = parseInt(event.target.textContent);
            mostrarPagina(pagina);
        });
});


//function htmlTablaHome(data) {

//    $('#tblUsuarios').html('');
//    let id = 0;
//    let tr = '';

//    data.data.map(r => {
//        id++;
//        let date = new Date(r.FechaCreacion)
//        let day = `${(date.getDate())}`.padStart(2, '0');
//        let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
//        let year = date.getFullYear();

//        tr += `<tr>
//                      <td>${id}</td>
//                      <td>${r.CedulaDocente}</td>
//                      <td>${r.NombreDocente}</td>
//                      <td>${r.Estado}</td>
//                      <td>${month}/${day}/${year}</td>
//               </tr>`
//        });

// let html =` <table id="tblUsuarios" class="table table-bordred table-striped dataTable no-footer" role="grid" aria-describedby="tblUsuarios_info" style="width: 1111px;">
//                                                            <thead>
//                                                                <tr role="row">
//                                                                    <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 25px;">Id</th>
//                                                                    <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 85px;">Cedula</th>
//                                                                    <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 330px;">Nombre</th>
//                                                                    <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 50px;">Estado</th>
//                                                                    <th class="sorting_disabled" rowspan="1" colspan="1" style="width: 80px;">Fecha de creación</th>
//                                                            </thead>
//                                                            <tbody>
//                                                                ${tr}
//                                                            </tbody>
//                                                        </table>`

//    $('#htmlHomeTable').html(html);
//}