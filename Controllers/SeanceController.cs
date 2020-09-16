using System;
using System.Collections.Generic;
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
    public class SeanceController : ControllerBase
    {
        private readonly AutoecoleAppContext _context;

        public SeanceController(AutoecoleAppContext context)
        {
            _context = context;
        }

        // GET: api/Seance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Seance>>> GetSeance()
        {
            return await _context.Seance.ToListAsync();
        }

        // GET: api/Seance/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Seance>> GetSeance(int id)
        {
            var seance = await _context.Seance.FindAsync(id);

            if (seance == null)
            {
                return NotFound();
            }

            return seance;
        }

        // PUT: api/Seance/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSeance(int id, Seance seance)
        {
            if (id != seance.Id_Seance)
            {
                return BadRequest();
            }

            _context.Entry(seance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeanceExists(id))
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

        // POST: api/Seance
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Seance>> PostSeance(Seance seance)
        {
            var seances = await _context.Seance.Where(s=>s.Date==seance.Date&&s.Heure_debut<seance.Heure_fin&&seance.Heure_debut<s.Heure_fin).ToListAsync();
            var seances_nonDisponible=seances.Where(s=>s.Cin_Moniteur==seance.Cin_Moniteur||s.Immatriculation_Voiture==seance.Immatriculation_Voiture).ToList();
            if (seances.Count!=0){
                
            
            if(seances_nonDisponible.Count !=0){
                return StatusCode(215,"moniteur non dispo");
            }}
            _context.Seance.Add(seance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSeance", new { id = seance.Id_Seance }, seance);
        
        }

        // DELETE: api/Seance/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Seance>> DeleteSeance(int id)
        {
            var seance = await _context.Seance.FindAsync(id);
            if (seance == null)
            {
                return NotFound();
            }

            _context.Seance.Remove(seance);
            await _context.SaveChangesAsync();

            return seance;
        }

        private bool SeanceExists(int id)
        {
            return _context.Seance.Any(e => e.Id_Seance == id);
        }
    }
}
