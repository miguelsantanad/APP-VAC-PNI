$(document).ready(function () {
    $("#txtCedula").mask('999-9999999-9');
});

$("#tipoDestinatarioGeneral").on("change", function () {
    if ($("#tipoDestinatarioGeneral").val() == "05") {
        $("#txtCedula").removeAttr('disabled');
    } else {
        $("#txtCedula").prop("disabled", true);
    }
});

function enviarCorreoGeneral() {
    var fileInput = document.getElementById("txtAdjuntarFile");
    var archivo = fileInput.files[0];

    var formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("asunto", 'Algo grande');
    formData.append("correos", 'victoralfonso@gamil.com');
    formData.append("mensaje", 'Victor Alfonso Amadis algo envie');

    fetch(ruta + "Correos/EnviarCorreoMasivoGeneral", {
        method: "POST",
        body: formData
    })
        .then(function (response) {
            if (response.ok) {
                console.log("Archivo enviado exitosamente.");
            } else {
                console.log("Error al enviar el archivo. Código de estado: " + response.status);
            }
        })
        .catch(function (error) {
            console.log("Error en la solicitud: " + error.message);
        });
}