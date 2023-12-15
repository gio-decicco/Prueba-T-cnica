using System.Text.Json.Serialization;

namespace Clientes.Application.Dtos.Requests
{
    public class ClienteRequest
    {
        public int? Id { get; set; } = null!;
        public long Dni { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateOnly FechaNacimiento { get; set; }
        public DireccionRequest Direccion { get; set; }
        public List<ContactoRequest> Contactos { get; set; }
    }
}
