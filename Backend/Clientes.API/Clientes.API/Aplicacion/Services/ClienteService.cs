using Clientes.API.Dtos.Requests;
using Clientes.API.Dtos.Responses;
using Clientes.API.Infraestructura.Repositorios;
using Clientes.API.Infraestructura.Validadores;
using Clientes.API.IUtils;
using Clientes.API.Modelos;
using FluentValidation;
using System.Diagnostics.Eventing.Reader;

namespace Clientes.API.Aplicacion.Services
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
        public async Task<ClienteResponse> guardarCliente(ClienteRequest request)
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
    }
}
