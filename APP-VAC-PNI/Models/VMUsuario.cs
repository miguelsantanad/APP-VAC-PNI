using System.ComponentModel.DataAnnotations;

namespace APP_VAC_PNI.Models
{
    public class VMUsuario
    {
        [Required]
        public string User { get; set; }
        [Required]
        public string Pass { get; set; }
        public bool TypeUser { get; set; }
    }
}