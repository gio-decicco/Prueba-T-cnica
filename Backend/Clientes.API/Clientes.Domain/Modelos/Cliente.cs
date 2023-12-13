using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clientes.Domain.Modelos
{
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public long Dni {  get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateOnly FechaNacimiento {  get; set; }
        public DateOnly FechaCreacion {  get; set; }
        public Direccion Direccion { get; set; }
        public ICollection<Contacto> Contactos { get; set; }
    }
}
