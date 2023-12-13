using Clientes.Domain.IRepositories;
using Clientes.Domain.Modelos;
using Clientes.Infraestructure.Datos;
using Microsoft.EntityFrameworkCore;

namespace Clientes.Infraestructure.Repositorios
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly AppDbContext _appDbContext;
        public ClienteRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<int> EliminarCliente(int id)
        {
            try
            {
                var cliente = await _appDbContext.Clientes.FirstOrDefaultAsync(x => x.Id == id);
                var clienteEliminado = _appDbContext.Clientes.Remove(cliente);
                await _appDbContext.SaveChangesAsync();

                return clienteEliminado.Entity.Id;
            }
            catch
            {
                throw new Exception("No se pudo eliminar el cliente");
            }
        }

        public async Task<List<Cliente>> GetClientesByFiltros(long? dni, string? nombre, string? apellido, DateOnly? fechaNacimiento)
        {
            var query = _appDbContext.Clientes.AsQueryable();

            if (dni.HasValue)
            {
                query = query.Where(c => c.Dni == dni);
            }
            if (!string.IsNullOrEmpty(nombre))
            {
                query = query.Where(c => c.Nombre == nombre);
            }
            if (!string.IsNullOrEmpty(apellido))
            {
                query = query.Where(c => c.Apellido == apellido);
            }
            if (fechaNacimiento.HasValue)
            {
                query = query.Where(c => c.FechaNacimiento == fechaNacimiento);
            }
            
            var resultado = query.ToList();

            foreach(var item in resultado)
            {
                item.Direccion = await _appDbContext.Direcciones.FirstOrDefaultAsync(x => x.Cliente == item);
                item.Contactos = await _appDbContext.Contactos.Where(x => x.ClienteId == item.Id).ToListAsync();
            }

            return resultado;
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

        public async Task<Cliente> ModificarCliente(Cliente cliente)
        {
            try
            {
                var clienteModificado = _appDbContext.Clientes.Update(cliente);
                await _appDbContext.SaveChangesAsync();

                return clienteModificado.Entity;
            }
            catch
            {
                throw new Exception("No se pudo modificar el cliente");
            }
        }
    }
}
