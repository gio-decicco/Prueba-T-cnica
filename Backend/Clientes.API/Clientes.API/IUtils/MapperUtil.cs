using AutoMapper;

namespace Clientes.API.IUtils
{
    public class MapperUtil : IMapperUtil
    {
        private readonly IMapper _mapper;

        public MapperUtil(IMapper mapper)
        {
            _mapper = mapper;
        }

        public TDestination Map<TOrigin, TDestination>(TOrigin value)
        {
            return _mapper.Map<TDestination>(value);
        }
    }
}
