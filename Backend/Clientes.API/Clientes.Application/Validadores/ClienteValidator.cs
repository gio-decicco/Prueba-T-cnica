using Clientes.Application.Dtos.Requests;
using FluentValidation;

namespace Clientes.Application.Validadores
{
    public class ClienteValidator : AbstractValidator<ClienteRequest>
    {
        public ClienteValidator()
        {
            RuleFor(x => x.Dni)
                .NotNull()
                .NotEmpty()
                .GreaterThan(9999999)
                .LessThan(100000000);
            RuleFor(x => x.Nombre)
                .NotEmpty()
                .NotNull();
            RuleFor(x => x.Apellido)
                .NotEmpty()
                .NotNull();
            RuleFor(x => x.Nombre)
                .NotEmpty()
                .NotNull();
            RuleFor(x => x.FechaNacimiento)
                .NotNull()
                .NotEmpty();
            RuleFor(x => x.Direccion)
                .SetValidator(new DireccionValidator());
            RuleFor(x => x.Contactos)
                .NotNull()
                .NotEmpty()
                .ForEach(item =>
                {
                    item
                        .NotNull()
                        .NotEmpty()
                        .SetValidator(new ContactoValidator());
                });
        }
    }
}
