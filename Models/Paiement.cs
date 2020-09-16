using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Paiement{
        [Key]
        public int Id_Paiement{get;set;}
        public string Cin_Eleve{get;set;}
        public float Montant{get;set;}
        public string Date{get;set;}



    }
 
}