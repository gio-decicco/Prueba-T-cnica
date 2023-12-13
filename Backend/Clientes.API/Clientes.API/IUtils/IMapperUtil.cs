namespace Clientes.API.IUtils
{
    public interface IMapperUtil
    {
        TDestination Map<TOrigin, TDestination>(TOrigin value);
    }
}
