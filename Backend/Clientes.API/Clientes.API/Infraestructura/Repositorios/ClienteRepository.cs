using Clientes.API.Datos;
using Clientes.API.Modelos;
using Microsoft.EntityFrameworkCore;

namespace Clientes.API.Infraestructura.Repositorios
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _appDbContext;
        public ClienteRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<Cliente> GuardarCliente(Cliente cliente)
        {
            try
            {
                _appDbContext.Clientes.Add(cliente);
                await _appDbContext.SaveChangesAsync();

                var respuesta = await _appDbContext.Clientes.FirstOrDefaultAsync(x => x.Dni == cliente.Dni);
                return respuesta;
            }
            catch
            {
                throw new Exception("Failed to insert");
            }
        }

        public Task<Cliente> ModificarCliente(Cliente cliente)
        {
            throw new NotImplementedException();
        }

        public Task<Cliente> ObtenerClientePorId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Cliente>> ObtenerClientes()
        {
            throw new NotImplementedException();
        }
    }
}
