using Clientes.API.Dtos.Requests;

namespace Clientes.API.Dtos.Responses
{
    public class ClienteResponse
    {
        public int Id {  get; set; }
        public long Dni { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
    }
}
