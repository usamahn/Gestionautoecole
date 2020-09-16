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
    public class EleveController : ControllerBase
    {
        private readonly AutoecoleAppContext _context;
        CultureInfo cultureInfo = new CultureInfo("en-NZ");
        public EleveController(AutoecoleAppContext context)
        {
            _context = context;
        }

        // GET: api/Eleve
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Eleve>>> GetEleve()
        {
            return await _context.Eleve.ToListAsync();
        }

        // GET: api/Eleve/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Eleve>> GetEleve(string id)
        {
            var eleve = await _context.Eleve.FindAsync(id);

            if (eleve == null)
            {
                return NotFound();
            }

            return eleve;
        }

        // PUT: api/Eleve/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEleve(string id, Eleve eleve)
        {
            if (id != eleve.Cin_Eleve)
            {
                return BadRequest();
            }

            _context.Entry(eleve).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EleveExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Eleve
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Eleve>> PostEleve(Eleve eleve)
        {
            _context.Eleve.Add(eleve);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEleve", new { id = eleve.Cin_Eleve }, eleve);
        }

        // DELETE: api/Eleve/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Eleve>> DeleteEleve(string id)
        {
            var eleve = await _context.Eleve.FindAsync(id);
            if (eleve == null)
            {
                return NotFound();
            }

            _context.Eleve.Remove(eleve);
            await _context.SaveChangesAsync();

            return eleve;
        }

        [HttpGet("MontantPaye/{Cin_Eleve}")]
        public async Task<ActionResult<float>> GetMontantPaye(string Cin_Eleve)
        {
            var paiements= await _context.Paiement.Where(p=>p.Cin_Eleve==Cin_Eleve).ToListAsync();
            float montantPaye = 0;
            foreach (var p in paiements)
            {
                montantPaye+=p.Montant;
            }
            return montantPaye;
        }

        [HttpGet("MontantRestant/{Cin_Eleve}")]
        public async Task<ActionResult<float>> GetMontantRestant(string Cin_Eleve)
        {
            var montantTotal = await GetMontantTotal(Cin_Eleve);
            var montantPaye = await GetMontantPaye(Cin_Eleve);
            return montantTotal.Value- montantPaye.Value;
            
            
        }



        [HttpGet("GetMontantTotal/{Cin_Eleve}")]
        public async Task<ActionResult<float>> GetMontantTotal(string Cin_Eleve)
        {
            var seances= await _context.Seance.Where(s=>s.Cin_Eleve==Cin_Eleve).ToListAsync();
            var examens= await _context.Examen.Where(e=>e.Cin_Eleve==Cin_Eleve).ToListAsync();
            float montantTotal = 0;
            foreach (var s in seances)
            {
                if (s.Type=="conduit"){
                    var prix = await _context.Prix.ToListAsync();
                    
                    prix = prix.Where(p=> DateTime.Parse(s.Date,cultureInfo)>DateTime.Parse(p.Date_debut,cultureInfo) && DateTime.Parse(s.Date,cultureInfo)<DateTime.Parse(p.Date_fin,cultureInfo) && p.Type=="conduit").ToList();
                    montantTotal+=s.GetNombreHeures() * prix[0].Montant;
                }else if(s.Type=="code"){
                    var prix = await _context.Prix.ToListAsync();
                    prix = prix.Where(p=> DateTime.Parse(s.Date)>DateTime.Parse(p.Date_debut) && DateTime.Parse(s.Date)<DateTime.Parse(p.Date_fin) && p.Type=="code").ToList();
                    montantTotal+=s.GetNombreHeures() * prix[0].Montant;
                }
                
            }
            if(examens !=null){
                foreach (var e in examens){
                    if (e.Type=="conduit"){
                    var prix = await _context.Prix.ToListAsync();
                    prix=prix.Where(p=> DateTime.Parse(e.Date)>DateTime.Parse(p.Date_debut) && DateTime.Parse(e.Date)<DateTime.Parse(p.Date_fin) && p.Type=="exam_conduit").ToList();
                    montantTotal+= prix[0].Montant;
                    }else if(e.Type=="code"){
                        var prix = await _context.Prix.ToListAsync();
                        prix=prix.Where(p=> DateTime.Parse(e.Date)>DateTime.Parse(p.Date_debut) && DateTime.Parse(e.Date)<DateTime.Parse(p.Date_fin) && p.Type=="exam_code").ToList();
                        montantTotal+= prix[0].Montant;
                    }
                }
            }
            return montantTotal;
        }




        

        private bool EleveExists(string id)
        {
            return _context.Eleve.Any(e => e.Cin_Eleve == id);
        }
    }
}
