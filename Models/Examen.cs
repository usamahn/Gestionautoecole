using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Examen{
        [Key]
        public int Id_Examen{get;set;}
        public string Cin_Eleve{get;set;}
        public string Date{get;set;}
        public string Etat {get;set;}
        public string Type {get;set;}

    }
 

}