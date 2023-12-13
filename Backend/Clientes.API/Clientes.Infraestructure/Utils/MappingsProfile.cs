using AutoMapper;
using Clientes.Application.Dtos.Requests;
using Clientes.Application.Dtos.Responses;
using Clientes.Domain.Modelos;

namespace Clientes.Infraestructure.Utils
{
    public class MappingsProfile : Profile
    {
        public MappingsProfile()
        {           
            CreateMap<ClienteRequest, Cliente>().ReverseMap();
            CreateMap<DireccionRequest, Direccion>().ReverseMap();
            CreateMap<ContactoRequest, Contacto>().ReverseMap();
            CreateMap<Cliente, ClienteResponse>().ReverseMap();
            CreateMap<Cliente, ConsultaClienteResponse>().ReverseMap();
            CreateMap<Contacto, ContactoResponse>().ReverseMap();
            CreateMap<Direccion, DireccionResponse>().ReverseMap();
        }
    }
}
