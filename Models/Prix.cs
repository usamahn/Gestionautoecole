using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Prix{
        [Key]
        public int Id_Prix{get;set;}
        public string Type{get;set;}
        public float Montant{get;set;}
        public string Etat {get;set;}
        public string Date_debut{get;set;}
        public string Date_fin{get;set;}

    }
 

}