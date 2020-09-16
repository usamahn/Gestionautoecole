using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projet_auto_ecole.Models;

namespace Projet_auto_ecole.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class InsightsController : ControllerBase
    {
        private readonly AutoecoleAppContext _context;
        CultureInfo cultureInfo = new CultureInfo("en-NZ");
        public InsightsController(AutoecoleAppContext context)
        {
            _context = context;
        }

        public async Task<float> GetRevenuMois(int mois){
            var paiements =await _context.Paiement.ToListAsync();
            paiements=paiements.Where(p=>DateTime.Parse(p.Date,cultureInfo).Month==mois).ToList();
            float revenu = 0;
             
            foreach (var p in paiements)
            {
                revenu+= p.Montant;
            }
            return revenu;
        }

        [HttpGet("DailyHoursLastSevenDays")]
        public async Task<ActionResult<Dictionary<string,int>>> getDailyHoursLastSevenDays(){
            Dictionary<string,int> result = new Dictionary<string, int>();
            for(int i=6;i>=0;i--){
                //DateTime.Now.Subtract(new TimeSpan(i,0,0,0)).DayOfWeek.ToString()[0];
                var d=DateTime.Now.Subtract(new TimeSpan(i,0,0,0));
                var date = d.ToString("d/M/yyyy");
                var seances=_context.Seance.Where(s=>s.Date==date);
                int nbreHeures=0;
                foreach (var seance in seances)
                {
                    nbreHeures=seance.GetNombreHeures();
                }
                result.Add(d.DayOfWeek.ToString().Substring(0,3),nbreHeures);
            }
            return result;
        }

       
        
        [HttpGet("NombreClients")]
        public async Task<ActionResult<int>> NombreClients()
        {
            int nombreClients= await _context.Eleve.CountAsync();
            return nombreClients;
        }

        [HttpGet("NombreMoniteurs")]
        public async Task<ActionResult<int>> NombreMoniteurs()
        {
            int NombreMoniteurs= await _context.Moniteur.CountAsync();
            return NombreMoniteurs;
        }
        [HttpGet("NombreVoitures")]
        public async Task<ActionResult<int>> NombreVoitures()
        {
            int NombreVoitures= await _context.Voiture.CountAsync();
            return NombreVoitures;
        }

        [HttpGet("NombreMoyenneHeures")]
        public async Task<ActionResult<string>> NombreMoyHeures()
        {
            int nombreClients= await _context.Eleve.CountAsync();
            var seances= await _context.Seance.ToListAsync();
            int nbreHeures=0;
            foreach (var s in seances)
            {
                nbreHeures+=s.GetNombreHeures();
            }
            return nbreHeures.ToString("0.00");
        }



        [HttpGet("RevenuMoisActuelle")]
        public async Task<ActionResult<float>> RevenuMoisActuelle()
        {
            DateTime dt = DateTime.Now;
            
            return await GetRevenuMois(dt.Month) ;
        }

        [HttpGet("NombreMoyenneHeuresParJour")]
        public async Task<ActionResult<string>> getNombreMoyenneHeuresParJour(){
            var seances = await _context.Seance.ToListAsync();
            seances =seances.Where(s=>DateTime.Parse(s.Date,cultureInfo).Month==DateTime.Now.Month).ToList();
            float nbreHeures = 0;
            foreach (var seance in seances)
            {
                nbreHeures+= seance.GetNombreHeures();
            }
            
            return (nbreHeures/DateTime.Now.Day).ToString("0.00");
        }

        [HttpGet("NombreClientsMoisActuel")]
        public async Task<ActionResult<int>> getNombreClientsMoisActuel(){
            var seances = await _context.Seance.ToListAsync();
            seances =seances.Where(s=>DateTime.Parse(s.Date,cultureInfo).Month==DateTime.Now.Month).ToList();
            int nbre= seances.Select(s=>s.Cin_Eleve).Distinct().Count();
            return nbre;
        }

        [HttpGet("RevenuDernier12Mois")]
        public async Task<ActionResult<Dictionary<string,float>>> getRevenuDernier12Mois(){
            Dictionary<string,float> result = new Dictionary<string, float>();
            var paiements = await _context.Paiement.ToListAsync();
            var currentMonth = DateTime.Now;
            int month = currentMonth.Month - 1;
            for(int i=0;i<=11;i++){
                if(month<=0){
                    month=12;
                }
                paiements=paiements.Where(p=>DateTime.Parse(p.Date,cultureInfo).Month==month).ToList();
                float revenu =0;
                foreach (var p in paiements)
                {
                    revenu+=p.Montant;
                }
                var d= new DateTime(currentMonth.Year,month,1);
                
                result.Add(d.ToString("MMM"),revenu);
                month-=1;
            }
            return result;
        }

        [HttpGet("NombreClientsDernier12Mois")]
        public async Task<ActionResult<Dictionary<string,int>>> getNombreClientsDernier12Mois(){
            Dictionary<string,int> result = new Dictionary<string, int>();
            var seances = await _context.Seance.ToListAsync();
            var currentMonth = DateTime.Now;
            int month = currentMonth.Month - 1;
            for(int i=0;i<=11;i++){
                if(month<=0){
                    month=12;
                }
                seances=seances.Where(p=>DateTime.Parse(p.Date,cultureInfo).Month==month).ToList();
                
                int nbreClients=seances.Select(s=>s.Cin_Eleve).Distinct().Count();
                var d= new DateTime(currentMonth.Year,month,1);
                
                result.Add(d.ToString("MMM"),nbreClients);
                month-=1;
            }
            return result;
        }


        [HttpGet("RevenuDernierSemestre")]
        public async Task<ActionResult<List<float>>> RevenuTroisDerniersMois()
        {
            int currentMonth = DateTime.Now.Month;
            List<float> Revenu= new List<float>{await GetRevenuMois(currentMonth-1),await GetRevenuMois(currentMonth-2),await GetRevenuMois(currentMonth-3)};
            return Revenu;
        }


        [HttpGet("TauxReussite")]
        public async Task<ActionResult<string>> TauxReussite()
        {

            var examens =await _context.Examen.Where(e=>e.Etat=="Reussite"||e.Etat=="Echec").ToListAsync();
            float nbreTotal=examens.Count;
            float nbreReussite=examens.Where(e=>e.Etat=="Reussite").Count();
            float tauxReussite= nbreReussite/nbreTotal*100;

            return tauxReussite.ToString("0.00");
        }
    }


}