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
    public class VoitureController : ControllerBase
    {
        private readonly AutoecoleAppContext _context;

        public VoitureController(AutoecoleAppContext context)
        {
            _context = context;
        }

        // GET: api/Voiture
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voiture>>> GetVoiture()
        {
            return await _context.Voiture.ToListAsync();
        }

        // GET: api/Voiture/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voiture>> GetVoiture(string id)
        {
            var voiture = await _context.Voiture.FindAsync(id);

            if (voiture == null)
            {
                return NotFound();
            }

            return voiture;
        }

        // PUT: api/Voiture/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoiture(string id, Voiture voiture)
        {
            if (id != voiture.Immatriculation)
            {
                return BadRequest();
            }

            _context.Entry(voiture).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoitureExists(id))
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

        // POST: api/Voiture
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Voiture>> PostVoiture(Voiture voiture)
        {
            _context.Voiture.Add(voiture);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VoitureExists(voiture.Immatriculation))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVoiture", new { id = voiture.Immatriculation }, voiture);
        }

        // DELETE: api/Voiture/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Voiture>> DeleteVoiture(string id)
        {
            var voiture = await _context.Voiture.FindAsync(id);
            if (voiture == null)
            {
                return NotFound();
            }

            _context.Voiture.Remove(voiture);
            await _context.SaveChangesAsync();

            return voiture;
        }

        private bool VoitureExists(string id)
        {
            return _context.Voiture.Any(e => e.Immatriculation == id);
        }
    }
}
