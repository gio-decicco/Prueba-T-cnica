using Clientes.Application.Dtos.Responses;
using Clientes.Domain.Modelos;

namespace Clientes.Domain.IRepositories
{
    public interface IClienteRepository
    {
        Task<Cliente> GuardarCliente(Cliente cliente);
        Task<Cliente> ModificarCliente(Cliente cliente);
        Task<int> EliminarCliente(int id);
        Task<List<Cliente>> GetClientesByFiltros(long? dni, string? nombre, string? apellido, DateOnly? fechaNacimiento);
    }
}
