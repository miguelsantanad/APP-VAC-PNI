$(document).ready(function () {

    $("#txtUsername").mask('999-9999999-9');
    var BOTON_ENTRAR = $('#btnIniciarSesion');
    var manejadorEnter = function (event) {
        if (event.which === 13) {
            BOTON_ENTRAR.click();
        }
    };

});