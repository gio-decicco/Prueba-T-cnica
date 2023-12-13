namespace Clientes.Domain.IUtils
{
    public interface IMapperUtil
    {
        TDestination Map<TOrigin, TDestination>(TOrigin value);
    }
}
