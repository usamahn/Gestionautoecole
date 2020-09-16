using System.ComponentModel.DataAnnotations;

namespace Projet_auto_ecole.Models
{

    public class Seance{
        [Key]
        public int Id_Seance{get;set;}
        public string Cin_Eleve{get;set;}
        public string Cin_Moniteur{get;set;}
        public string Immatriculation_Voiture{get;set;}
        public string Date{get;set;}
        public int Heure_debut{get;set;}
        public int Heure_fin{get;set;}
        public string Type {get;set;}


        public int GetNombreHeures(){
            return Heure_fin -Heure_debut;
        }

    }
 

}