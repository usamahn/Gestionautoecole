using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Moniteur{
        [Key]
        public string Cin_Moniteur{get;set;}
        public string Nom{get;set;}
        public string Prenom{get;set;}
        public string Date_naissance{get;set;}
        public string Adresse{get;set;}
        public string Tel{get;set;}
        public string Type {get;set;}

    }
 

}
