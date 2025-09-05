namespace APP_VAC_PNI.Models
{
    public class Resultado
    {
        public string type { get; set; }
        public bool result { get; set; }
        public string mensaje { get; set; }
        public DatosDirector datosDirector { get; set; }
    }
}