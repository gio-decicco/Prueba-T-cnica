using AutoMapper;
using Clientes.API.Aplicacion.Services;
using Clientes.API.Datos;
using Clientes.API.Dtos.Requests;
using Clientes.API.Infraestructura.Repositorios;
using Clientes.API.Infraestructura.Validadores;
using Clientes.API.IUtils;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("AppDbConnectionString");
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

var mappingConfig = new MapperConfiguration(mc => { mc.AddProfile(new MappingsProfile()); });
builder.Services.AddSingleton(mappingConfig.CreateMapper());

builder.Services.AddSingleton<IMapperUtil, MapperUtil>();

builder.Services.AddTransient<IClienteService, ClienteService>();
builder.Services.AddTransient<IClienteRepository, ClienteRepository>();

builder.Services.AddTransient<IValidator<ClienteRequest>, ClienteValidator>();
builder.Services.AddTransient<IValidator<ContactoRequest>, ContactoValidator>();
builder.Services.AddTransient<IValidator<DireccionRequest>, DireccionValidator>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
