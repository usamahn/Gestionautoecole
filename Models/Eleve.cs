

using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Eleve{
        [Key]
        public string Cin_Eleve{get;set;}
        public string Nom{get;set;}
        public string Prenom{get;set;}
        public string Date_naissance{get;set;}
        public string Adresse{get;set;}
        public string Tel{get;set;}

    }
 

}




