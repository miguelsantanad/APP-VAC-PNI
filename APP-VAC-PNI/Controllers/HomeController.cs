using APP_VAC_PNI.Models;
using MINERD.Common.UTL;
using System.Web.Mvc;
using System.Web.UI;

namespace APP_VAC_PNI.Controllers
{
    // Se aplica la caché de salida para este controlador.
    [OutputCache(NoStore = true, Duration = 0, Location = OutputCacheLocation.None)]
    public class HomeController : Controller
    {
        // Se crea una instancia de la clase ManejadorFormulario para manejar operaciones relacionadas con formularios.
        private ManejadorFormulario manejador = new ManejadorFormulario();

        // Acción para la página principal. Responde a solicitudes HTTP GET.
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

        // Acción para obtener la lista de docentes asociados al usuario. Responde a solicitudes HTTP GET.
        [HttpGet]
        public ActionResult getObtenerDocentesPorUsuario()
        {
            // Se obtienen los datos del usuario almacenados en una cookie.
            var usuario = CookieHandler.getCookieData<DatosDirector>();

            // Verifica si el usuario es un Director o un Tutor.
            if (usuario != null && (usuario.rol == "Director" || usuario.rol == "Tutor"))
            {
                // Obtiene la lista de docentes asociados al usuario.
                var listDocente = manejador.ObtenerDocentesPorUsuario(usuario.cedula);
                if (listDocente != null)
                {
                    // Devuelve un objeto JSON con éxito y la lista de docentes.
                    return Json(new { success = true, data = listDocente }, JsonRequestBehavior.AllowGet);
                }
                // Devuelve un objeto JSON indicando que no se encontraron docentes.
                return Json(new { success = false }, JsonRequestBehavior.AllowGet);
            }

            // Si no es un Director o un Tutor, redirige a la acción LogOff del controlador Login.
            return RedirectToAction("LogOff", "Login");
        }
    }
}
