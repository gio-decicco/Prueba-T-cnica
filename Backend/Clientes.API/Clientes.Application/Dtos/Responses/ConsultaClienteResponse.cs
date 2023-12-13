using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clientes.Application.Dtos.Responses
{
    public class ConsultaClienteResponse
    {
        public int Id { get; set; }
        public long Dni { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public DateOnly FechaNacimiento { get; set; }
        public DireccionResponse Direccion { get; set; }
        public ICollection<ContactoResponse> Contactos { get; set; }
    }
}
