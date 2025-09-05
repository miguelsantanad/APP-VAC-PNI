$(document).ready(function () {

    var IniciarSesion = function () {
        var vm = {
            NombreUsuario: $('#txtUsername').val(),
            Clave: $('#txtPassword').val()
        }

        Loading.Abrir();

        $.post(ruta + 'api/Usuarios/IniciarSesion',
            vm,
            function () {
                Loading.Cerrar();
                window.location = ruta + 'Candidatos';
            }
        ).fail(function(response) {
            Loading.Cerrar();
            swal({
                title: "Error",
                text: "Usuario y/o Contraseña invalidos. \nFavor contactar con Mesa de Ayuda si el problema persiste.",
                icon: "error",
                className: "text-center",
                button: "Ok"
            });
            console.error('Error:' + response.responseText);
        });
    }

    $('#btnIniciarSesion').click(function() {
        IniciarSesion();
    });

    $(document).on('keypress', function (e) {
            if (e.keyCode === 13)
                IniciarSesion();
    });
})