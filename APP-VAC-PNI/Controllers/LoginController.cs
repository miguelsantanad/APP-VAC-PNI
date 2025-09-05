using APP_VAC_PNI.Models;
using MINERD.Common.UTL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.Web.Security;

namespace APP_VAC_PNI.Controllers
{
    public class LoginController : Controller
    {
        // Se crea una instancia de la clase ManejadorFormulario para manejar operaciones relacionadas con formularios.
        private ManejadorFormulario manejador = new ManejadorFormulario();

        // Acción para mostrar la página de inicio de sesión. Responde a solicitudes HTTP GET.
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        // Acción para procesar el formulario de inicio de sesión. Responde a solicitudes HTTP POST.
        [HttpPost]
        public async Task<ActionResult> Index(VMUsuario modelo)
        {
            // Verifica si el modelo pasado al servidor es válido.
            if (ModelState.IsValid)
            {
                // Comprueba si el tipo de usuario es verdadero (Director).
                if (modelo.TypeUser)
                {
                    try
                    {
                        // URL de la API de autenticación.
                        const string apiUrl = "http://me105014.see.local/ApiVac/Auth/Login";

                        // Se utiliza HttpClient para realizar una solicitud POST a la API de autenticación.
                        using (HttpClient httpClient = new HttpClient())
                        {
                            var formContent = new FormUrlEncodedContent(new[]
                            {
                                new KeyValuePair<string, string>("username",  modelo.User.Replace("-", "").Trim()),
                                new KeyValuePair<string, string>("password", modelo.Pass.Trim())
                            });

                            HttpResponseMessage response = await httpClient.PostAsync(apiUrl, formContent);

                            // Verifica si la respuesta de la API es exitosa.
                            if (response.IsSuccessStatusCode)
                            {
                                // Lee la respuesta como una cadena JSON y la deserializa en un objeto Resultado.
                                string jsonString = await response.Content.ReadAsStringAsync();
                                Resultado resultado = JsonConvert.DeserializeObject<Resultado>(jsonString);

                                // Verifica si la autenticación fue exitosa.
                                if (resultado.type == "success")
                                {
                                    // Establece información del usuario en una cookie y redirige a la página principal.
                                    resultado.datosDirector.cedula = modelo.User.Trim();
                                    resultado.datosDirector.rol = "Director";
                                    CookieHandler.registerCookie(resultado.datosDirector, "ticketUser", 60);
                                    return RedirectToAction("Index", "Home");
                                }
                                else
                                {
                                    // Muestra un mensaje de error si la autenticación falla.
                                    ViewBag.Validado = false;
                                    ViewBag.Mensaje = resultado.mensaje;
                                    return View();
                                }
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejo de errores generales.
                        return Json(new { success = false, message = "" });
                    }
                }
                else // Si el tipo de usuario es falso (Tutor).
                {
                    try
                    {
                        // Intenta realizar la autenticación del tutor utilizando el manejador.
                        if (manejador.Login_Tutor(modelo.Pass, modelo.User))
                        {
                            // Crea un objeto DatosDirector para el tutor, establece la cookie y redirige a la página principal.
                            var tutor = new DatosDirector
                            {
                                cedula = modelo.User.Trim(),
                                rol = "Tutor"
                            };
                            CookieHandler.registerCookie(tutor, "ticketUser", 60);
                            return RedirectToAction("Index", "Home");
                        }
                        else
                        {
                            // Muestra un mensaje de error si la autenticación del tutor falla.
                            ViewBag.Validado = false;
                            ViewBag.Mensaje = "Usuario o contraseña incorrectos";
                            return View();
                        }
                    }
                    catch (Exception ex)
                    {
                        // Manejo de errores generales.
                        return Json(new { success = false, message = "" });
                    }
                }
            }
            else // Si el modelo no es válido.
            {
                // Muestra un mensaje de error si el modelo no es válido.
                ViewBag.Validado = false;
                ViewBag.Mensaje = "Debe digitar usuario y contraseña";
                return View();
            }

            // Redirige a la página de inicio de sesión si ninguna condición anterior se cumple.
            return RedirectToAction("Index", "Login");
        }

        // Acción para cerrar sesión. Limpia las cookies y redirige a la página de inicio de sesión.
        public ActionResult LogOff()
        {
            TempData["DatosConsulta"] = null;
            FormsAuthentication.SignOut();
            CookieHandler.registerCookie(null, "ticketUser", 60);
            return RedirectToAction("Index", "Login");
        }
    }
}
