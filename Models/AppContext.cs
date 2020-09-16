using Microsoft.EntityFrameworkCore;

namespace Projet_auto_ecole.Models
{

    public class AutoecoleAppContext:DbContext
    {
        public AutoecoleAppContext(DbContextOptions<AutoecoleAppContext> options) : base(options){

        }
        public DbSet<Eleve> Eleve {get;set;}
        public DbSet<Moniteur> Moniteur {get;set;}
        public DbSet<Examen> Examen {get;set;}
        public DbSet<Seance> Seance {get;set;}
        public DbSet<Paiement> Paiement {get;set;}
        public DbSet<Prix> Prix {get;set;}
        public DbSet<Voiture> Voiture {get;set;}


    }
}