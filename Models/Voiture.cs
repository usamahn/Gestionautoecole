using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Voiture{
        [Key]
        public string Immatriculation{get;set;}
        public string Marque{get;set;}
         
        


    }
 

}