$('#btnCerrarSesion').on('click',
    function() {
        Loading.Abrir();
        $.get(ruta + 'api/Usuarios/CerrarSesion',
            function() {
                Loading.Cerrar();
                window.location = ruta;
            })
            .fail(function() {
                Loading.Cerrar();
                swal({
                    title: "Error",
                    text: "Ha ocurrido un error. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                    icon: "error",
                    className: "text-center",
                    button: "Ok"
                });
                console.error('Error: ' + response.responseText);
            });
    });