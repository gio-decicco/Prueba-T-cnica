using AutoMapper;
using Clientes.API.Dtos.Requests;
using Clientes.API.Dtos.Responses;
using Clientes.API.Modelos;
using System.Globalization;

namespace Clientes.API.IUtils
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {
            //Specific            
            CreateMap<ClienteRequest, Cliente>().ReverseMap();
            CreateMap<DireccionRequest, Direccion>().ReverseMap();
            CreateMap<ContactoRequest, Contacto>().ReverseMap();
            CreateMap<Cliente, ClienteResponse>().ReverseMap();
        }
    }
}
