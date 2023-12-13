using Clientes.API.Modelos;

namespace Clientes.API.Dtos.Requests
{
    public class ClienteRequest
    {
        public long Dni { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateOnly FechaNacimiento { get; set; }
        public DireccionRequest Direccion { get; set; }
        public List<ContactoRequest> Contactos { get; set; }
    }
}
