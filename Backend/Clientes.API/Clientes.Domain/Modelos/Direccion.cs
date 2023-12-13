using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Clientes.Domain.Modelos
{
    public class Direccion
    {
        [Key]
        [ForeignKey("Cliente")]
        public int Id { get; set; }
        public string Calle {  get; set; }
        public int NroCalle {  get; set; }
        public string Ciudad { get; set; }
        public string Provincia {  get; set; }
        public string Pais {  get; set; }
        public Cliente Cliente {  get; set; }
    }
}
