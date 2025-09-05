const btnIniciarSesion = document.querySelector('#btnIniciarSesion');

btnIniciarSesion.addEventListener('click',
    function () {
        clickToLogin();
    });

    $('input[name="Clave"]').on('keydown', function (e) {
        const key = e.which || e.keyCode;
        if (key === 13) {
            clickToLogin();
        }
    });

var clickToLogin = function () {
    if (camposValidos()) {

        IniciarSesion();

    } else {
        swal({
            title: "Error.",
            text: "Usuario y/o contraseña invalidos.",
            icon: "error",
            button: "Ok"
        });
    }
}

var camposValidos = function () {
    return document.querySelector('input[name="Usuario"]').value != "" && document.querySelector('input[name="Clave"]').value != "";
}

const IniciarSesion = function () {
    const vm = {
        Usuario: document.querySelector('input[name="Usuario"]').value,
        Clave: document.querySelector('input[name="Clave"]').value
    };

    Loading.iniciar();

    $.post(`${origen}api/Login/IniciarSesion`, vm)
        .done(function (result) {
            Loading.finalizar();
            window.location.href = `${origen}Home/Index`;
        })
        .fail(function (xhr, status, error) {
            swal({
                title: "Error.",
                text: "Usuario y/o contraseña invalidos.",
                icon: "error",
                button: "Ok"
            });
            Loading.finalizar();
        });
}