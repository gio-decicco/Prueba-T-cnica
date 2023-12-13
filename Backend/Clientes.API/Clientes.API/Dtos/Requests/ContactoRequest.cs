using Clientes.API.Modelos;

namespace Clientes.API.Dtos.Requests
{
    public class ContactoRequest
    {
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
    }
}
