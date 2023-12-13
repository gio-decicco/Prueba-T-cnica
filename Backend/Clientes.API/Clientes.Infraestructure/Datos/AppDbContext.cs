using Clientes.Domain.Modelos;
using Microsoft.EntityFrameworkCore;

namespace Clientes.Infraestructure.Datos
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Contacto> Contactos { get; set; }
        public DbSet<Direccion> Direcciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cliente>()
                .HasMany(c => c.Contactos)
                .WithOne(c => c.Cliente)
                .HasForeignKey(c => c.ClienteId)
                .IsRequired();
            modelBuilder.Entity<Contacto>()
                .HasOne(c => c.Cliente)
                .WithMany(c => c.Contactos)
                .HasForeignKey(c => c.ClienteId)
                .IsRequired();
            base.OnModelCreating(modelBuilder);
        }
    }
}
