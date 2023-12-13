using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clientes.Application.Dtos.Responses
{
    public class DireccionResponse
    {
        public string Calle { get; set; }
        public int NroCalle { get; set; }
        public string Ciudad { get; set; }
        public string Provincia { get; set; }
        public string Pais { get; set; }
    }
}
