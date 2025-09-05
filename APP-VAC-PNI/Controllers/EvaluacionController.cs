using APP_VAC_PNI.Models;
using MINERD.Common.UTL;
using System.Web.Mvc;
using System.Web.UI;

namespace APP_VAC_PNI.Controllers
{
    // Se aplica la caché de salida para este controlador.
    [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None)]
    public class EvaluacionController : Controller
    {
        // Se crea una instancia de la clase ManejadorFormulario para manejar operaciones relacionadas con formularios.
        private ManejadorFormulario manejador = new ManejadorFormulario();

        // Acción para la página principal de evaluaciones. Solo responde a solicitudes HTTP GET.
        [HttpGet]
        public ActionResult Index()
        {
            // Se obtienen los datos del usuario almacenados en una cookie.
            var usuario = CookieHandler.getCookieData<DatosDirector>();

            // Verifica si el usuario es un Director o un Tutor.
            if (usuario != null && (usuario.rol == "Director" || usuario.rol == "Tutor"))
            {
                // Si es un Director o un Tutor, se muestra la vista correspondiente.
                return View();
            }

            // Si no es un Director o un Tutor, redirige a la acción LogOff del controlador Login.
            return RedirectToAction("LogOff", "Login");
        }

        // Acción para obtener las evaluaciones de un docente. Responde a solicitudes HTTP GET.
        [HttpGet]
        public ActionResult getEvaluaciones(string cedula)
        {
            // Se obtienen los datos del usuario almacenados en una cookie.
            var usuario = CookieHandler.getCookieData<DatosDirector>();

            // Verifica si el usuario es un Director o un Tutor.
            if (usuario != null && (usuario.rol == "Director" || usuario.rol == "Tutor"))
            {
                // Valida si el docente está activo y asociado al usuario actual.
                var isActivo = manejador.ValidarDocentePorUsuario(cedula, usuario.cedula);
                if (!isActivo)
                {
                    // Obtiene los datos del docente y las evaluaciones en formato XML.
                    var docente = manejador.ObtenerPersonaPadron(cedula);
                    if (docente != null)
                    {
                        var datos = manejador.getEvaluacionesXML();
                        // Devuelve un objeto JSON con éxito, datos y la información del docente.
                        var obj = new { success = "true", datos = datos, docente = docente };
                        return Json(obj, JsonRequestBehavior.AllowGet);
                    }
                    // Devuelve un objeto JSON indicando que no se encontró el docente.
                    return Json(new { success = "false" }, JsonRequestBehavior.AllowGet);
                }
                // Devuelve un objeto JSON indicando que el docente ya existe.
                return Json(new { success = "existe" }, JsonRequestBehavior.AllowGet);
            }

            // Si no es un Director o un Tutor, redirige a la acción LogOff del controlador Login.
            return RedirectToAction("LogOff", "Login");
        }

        // Acción para guardar las respuestas seleccionadas en la evaluación. Responde a solicitudes HTTP POST.
        [HttpPost]
        public ActionResult postSaveQuestions(RespuestaSeleccionada respuesta)
        {
            // Se obtienen los datos del usuario almacenados en una cookie.
            var usuario = CookieHandler.getCookieData<DatosDirector>();

            // Verifica si el usuario es un Director o un Tutor.
            if (usuario != null && (usuario.rol == "Director" || usuario.rol == "Tutor"))
            {
                // Asigna información adicional a la respuesta antes de guardarla en la base de datos.
                respuesta.TipoUsuario = usuario.rol;
                respuesta.UsuarioEvaluador = usuario.cedula;
                respuesta.Estado = "Evaluado";

                // Guarda las respuestas en la base de datos y devuelve el resultado.
                var datos = manejador.dbSaveQuestions(respuesta);
                return Json(datos, JsonRequestBehavior.AllowGet);
            }

            // Si no es un Director o un Tutor, redirige a la acción LogOff del controlador Login.
            return RedirectToAction("LogOff", "Login");
        }
    }
}
