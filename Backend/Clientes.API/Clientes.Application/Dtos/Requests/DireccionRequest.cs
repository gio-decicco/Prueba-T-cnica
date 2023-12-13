namespace Clientes.Application.Dtos.Requests 
{ 
    public class DireccionRequest
    {
        public string Calle { get; set; }
        public int NroCalle { get; set; }
        public string Ciudad { get; set; }
        public string Provincia { get; set; }
        public string Pais { get; set; }
    }
}
