using Clientes.API.Dtos.Requests;
using Clientes.API.Dtos.Responses;

namespace Clientes.API.Aplicacion.Services
{
    public interface IClienteService
    {
        Task<ClienteResponse> guardarCliente(ClienteRequest request);
    }
}
