var conseguirOrigen = function (directorioVirtual) {
    if (!window.location.origin)
        window.location.origin = window.location.protocol + '//' + window.location.host;

    return window.location.origin + directorioVirtual;
};
