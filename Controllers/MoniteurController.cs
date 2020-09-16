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
    public class MoniteurController : ControllerBase
    {
        private readonly AutoecoleAppContext _context;
        CultureInfo cultureInfo = new CultureInfo("en-NZ");

        public MoniteurController(AutoecoleAppContext context)
        {
            _context = context;
        }

        // GET: api/Moniteur
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Moniteur>>> GetMoniteurbyType([FromQuery] string? type)
        {
            if(!(type is null)){
                return await _context.Moniteur.Where(m=>m.Type==type).ToListAsync();
            }
            return await _context.Moniteur.ToListAsync();
        }

        [HttpGet("HoursbyMonitorCurrentMonth")]
        public async Task<ActionResult<IEnumerable<MonitorInsights>>> GetHoursbyMonitorCurrentMonth()
        {
            var seances = await _context.Seance.ToListAsync();
            seances=seances.Where(p=>DateTime.Parse(p.Date,cultureInfo).Month==DateTime.Now.Month).ToList();
            var monitorsCin = seances.Select(s=>s.Cin_Moniteur).Distinct();
            var monitors=_context.Moniteur.Where(m=>  monitorsCin.Contains(m.Cin_Moniteur));
            List<MonitorInsights> monitorsInsightList = new List<MonitorInsights>();
            foreach (var m in monitors)
            {
                var seancesMonitor = seances.Where(s=>s.Cin_Moniteur==m.Cin_Moniteur).ToList();
                int nbreHeures= 0;
                foreach (var s in seancesMonitor)
                {
                    nbreHeures+=s.GetNombreHeures();
                }
                monitorsInsightList.Add(new MonitorInsights{Nom=m.Prenom + " "+m.Nom, NombreHeures =nbreHeures });
            }
            return monitorsInsightList;
        }

        // GET: api/Moniteur/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Moniteur>> GetMoniteur(string id)
        {
            var moniteur = await _context.Moniteur.FindAsync(id);

            if (moniteur == null)
            {
                return NotFound();
            }

            return moniteur;
        }

        // PUT: api/Moniteur/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMoniteur(string id, Moniteur moniteur)
        {
            if (id != moniteur.Cin_Moniteur)
            {
                return BadRequest();
            }

            _context.Entry(moniteur).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MoniteurExists(id))
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

        // POST: api/Moniteur
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Moniteur>> PostMoniteur(Moniteur moniteur)
        {
            _context.Moniteur.Add(moniteur);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMoniteur", new { id = moniteur.Cin_Moniteur }, moniteur);
        }

        // DELETE: api/Moniteur/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Moniteur>> DeleteMoniteur(string id)
        {
            var moniteur = await _context.Moniteur.FindAsync(id);
            if (moniteur == null)
            {
                return NotFound();
            }

            _context.Moniteur.Remove(moniteur);
            await _context.SaveChangesAsync();

            return moniteur;
        }

        private bool MoniteurExists(string id)
        {
            return _context.Moniteur.Any(e => e.Cin_Moniteur == id);
        }
    }

    public class MonitorInsights{
        public string Nom{get;set;}
        public int NombreHeures {get;set;}
        
    }
}
