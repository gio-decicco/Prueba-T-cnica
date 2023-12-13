using Clientes.Application.Dtos.Requests;
using Clientes.Application.Dtos.Responses;
using Clientes.Domain.Services;
using Microsoft.AspNetCore.Mvc;

namespace Clientes.API.Controllers
{
    [Route("api/clientes")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly IClienteService _service;
        public ClienteController(IClienteService service) {
            _service = service;
        }

        [HttpPost]
        [Produces(typeof(ClienteResponse))]
        public async Task<ActionResult> AgregarCliente(ClienteRequest cliente)
        {
            ClienteResponse result = await _service.GuardarCliente(cliente);
            return Ok(result);
        }

        [Route("{id}")]
        [HttpPut]
        [Produces(typeof(ClienteResponse))]
        public async Task<ActionResult> ModificarCliente(int id, [FromBody] ClienteRequest cliente)
        {
            ClienteResponse result = await _service.ModificarCliente(id, cliente);
            return Ok(result);
        }

        [Route("{id}")]
        [HttpDelete]
        [Produces(typeof(int))]
        public async Task<ActionResult> EliminarCliente(int id)
        {
            int result = await _service.EliminarCliente(id);
            return Ok(result);
        }

        [HttpGet]
        [Produces(typeof(List<ConsultaClienteResponse>))]
        public async Task<ActionResult> GetClientesByFiltro(
            [FromQuery] long? dni,
            [FromQuery] string? nombre,
            [FromQuery] string? apellido,
            [FromQuery] DateOnly? fechaNacimiento)
        {
            List<ConsultaClienteResponse> result = 
                await _service.GetClientesByFiltros(
                    dni, 
                    nombre, 
                    apellido, 
                    fechaNacimiento);
            return Ok(result);
        }
    }
}
