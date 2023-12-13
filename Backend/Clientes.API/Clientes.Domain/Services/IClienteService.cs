

using Clientes.Application.Dtos.Requests;
using Clientes.Application.Dtos.Responses;

namespace Clientes.Domain.Services
{
    public interface IClienteService
    {
        Task<ClienteResponse> GuardarCliente(ClienteRequest request);
        Task<ClienteResponse> ModificarCliente(int id, ClienteRequest request);
        Task<int> EliminarCliente(int id);
        Task<List<ConsultaClienteResponse>> GetClientesByFiltros(long? dni, string? nombre, string? apellido, DateOnly? fechaNacimiento);
    }
}
