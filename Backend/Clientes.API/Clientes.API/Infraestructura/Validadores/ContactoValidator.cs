using Clientes.API.Dtos.Requests;
using FluentValidation;

namespace Clientes.API.Infraestructura.Validadores
{
    public class ContactoValidator : AbstractValidator<ContactoRequest>
    {
        public ContactoValidator() 
        {
            RuleFor(x => x.Tipo)
                .NotEmpty()
                .NotNull()
                .MinimumLength(3);
            RuleFor(x => x.Descripcion)
                .NotEmpty()
                .NotNull()
                .MinimumLength(5);
        }
    }
}
