using System.Collections.Generic;

namespace APP_VAC_PNI.Models
{
    public class RespuestaSeleccionada
    {
        public string Id { get; set; }
        public string CedulaDocente { get; set; }
        public string NombreDocente { get; set; }
        public string Estado { get; set; }
        public string UsuarioEvaluador { get; set; }
        public string TipoUsuario { get; set; }
        public List<PreguntaDetalle> PreguntaDetalles { get; set; }
    }
}