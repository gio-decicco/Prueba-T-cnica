using Clientes.Application.Dtos.Requests;
using Clientes.Application.Dtos.Responses;
using Clientes.Domain.IRepositories;
using Clientes.Domain.IUtils;
using Clientes.Domain.Modelos;
using FluentValidation;
using Microsoft.AspNetCore.Http;

namespace Clientes.Domain.Services
{
    public class ClienteService : IClienteService
    {
        private readonly IClienteRepository _clienteRepository;
        private readonly IValidator<ClienteRequest> _validator;
        private readonly IMapperUtil _mapperUtil;
        public ClienteService(IClienteRepository clienteRepository, IValidator<ClienteRequest> validator, IMapperUtil mapperUtil) 
        {
            _clienteRepository = clienteRepository;
            _mapperUtil = mapperUtil;
            _validator = validator;
        }

        public Task<int> EliminarCliente(int id)
        {
            if(id == 0)
            {
                throw new Exception("Id tiene que ser distinto de 0");
            }
            return _clienteRepository.EliminarCliente(id);
        }

        public async Task<List<ConsultaClienteResponse>> GetClientesByFiltros(long? dni, string? nombre, string? apellido, DateOnly? fechaNacimiento)
        {
            var result = await _clienteRepository.GetClientesByFiltros(dni, nombre, apellido, fechaNacimiento);
            
            var response = _mapperUtil.Map<List<Cliente>, List<ConsultaClienteResponse>>(result);

            return response;
        }

        public async Task<ClienteResponse> GuardarCliente(ClienteRequest request)
        {
            var requestValido = _validator.Validate(request);
            if(!requestValido.IsValid)
            {
                throw new BadHttpRequestException("Fallo de validacion");
            }

            Cliente cliente = _mapperUtil.Map<ClienteRequest, Cliente>(request);

            cliente.FechaCreacion = new DateOnly();

            var respuestaRepo = await _clienteRepository.GuardarCliente(cliente);
            
            var response = _mapperUtil.Map<Cliente, ClienteResponse>(respuestaRepo);

            return response;
        }

        public async Task<ClienteResponse> ModificarCliente(int id, ClienteRequest request)
        {
            var requestValido = _validator.Validate(request);
            if (!requestValido.IsValid)
            {
                throw new BadHttpRequestException("Fallo de validacion");
            }

            Cliente cliente = _mapperUtil.Map<ClienteRequest, Cliente>(request);
            cliente.Id = id;

            var respuestaRepo = await _clienteRepository.ModificarCliente(cliente);

            var response = _mapperUtil.Map<Cliente, ClienteResponse>(respuestaRepo);

            return response;
        }
    }
}
