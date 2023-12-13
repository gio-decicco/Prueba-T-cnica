using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Clientes.API.Modelos
{
    public class Contacto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id {  get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } = null!;
    }
}
