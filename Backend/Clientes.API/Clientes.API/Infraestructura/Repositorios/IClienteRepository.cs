using Clientes.API.Modelos;

namespace Clientes.API.Infraestructura.Repositorios
{
    public interface IClienteRepository
    {
        Task<Cliente> GuardarCliente(Cliente cliente);
        Task<Cliente> ModificarCliente(Cliente cliente);
        Task<ICollection<Cliente>> ObtenerClientes();
        Task<Cliente> ObtenerClientePorId(int id);
    }
}
