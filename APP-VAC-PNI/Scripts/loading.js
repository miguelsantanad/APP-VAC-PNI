const Loading = (function () {
    const loading = document.querySelector('#GifContainer');
    const cssClass = 'hidden';

    const iniciar = function () {
        loading.classList.remove(cssClass);
    }

    const finalizar = function () {
        loading.classList.add(cssClass);
    }

    return {
        iniciar: iniciar,
        finalizar: finalizar
    }
})();