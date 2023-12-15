using Clientes.Application.Dtos.Requests;
using FluentValidation;

namespace Clientes.Application.Validadores
{
    public class ContactoValidator : AbstractValidator<ContactoRequest>
    {
        public ContactoValidator() 
        {
            RuleFor(x => x.Tipo)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0);
            RuleFor(x => x.Descripcion)
                .NotEmpty()
                .NotNull()
                .MinimumLength(5);
        }
    }
}
