using Clientes.API.Dtos.Requests;
using FluentValidation;

namespace Clientes.API.Infraestructura.Validadores
{
    public class DireccionValidator : AbstractValidator<DireccionRequest>
    {
        public DireccionValidator() 
        {
            RuleFor(x => x.Calle)
                .NotNull()
                .NotEmpty()
                .MinimumLength(1)
                .MaximumLength(100);
            RuleFor(x => x.NroCalle)
                .NotEmpty()
                .NotNull()
                .GreaterThan(0);
            RuleFor(x => x.Pais)
                .NotNull()
                .NotEmpty()
                .MinimumLength(2);
            RuleFor(x => x.Provincia)
                .NotNull()
                .NotEmpty()
                .MinimumLength(2);
        }
    }
}
