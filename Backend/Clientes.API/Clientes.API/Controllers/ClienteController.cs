using Clientes.API.Aplicacion.Services;
using Clientes.API.Datos;
using Clientes.API.Dtos.Requests;
using Clientes.API.Dtos.Responses;
using Clientes.API.Modelos;
using Microsoft.AspNetCore.Mvc;

namespace Clientes.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : Controller
    {
        private readonly IClienteService _service;
        public ClienteController(IClienteService service) {
            _service = service;
        }

        [Route("/")]
        [HttpPost]
        [Produces(typeof(ClienteResponse))]
        public async Task<ActionResult> AgregarCliente(ClienteRequest cliente)
        {
            ClienteResponse result = await _service.guardarCliente(cliente);
            return Ok(result);
        } 
    }
}
