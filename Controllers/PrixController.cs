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
    public class PrixController : ControllerBase
    {
        private readonly AutoecoleAppContext _context;

        public PrixController(AutoecoleAppContext context)
        {
            _context = context;
        }

        // GET: api/Prix
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Prix>>> GetPrix()
        {
            return await _context.Prix.ToListAsync();
        }

        // GET: api/Prix/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Prix>> GetPrix(int id)
        {
            var prix = await _context.Prix.FindAsync(id);

            if (prix == null)
            {
                return NotFound();
            }

            return prix;
        }

        // PUT: api/Prix/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrix(int id, Prix prix)
        {
            if (id != prix.Id_Prix)
            {
                return BadRequest();
            }

            _context.Entry(prix).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrixExists(id))
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

        // POST: api/Prix
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Prix>> PostPrix(Prix prix)
        {
            if(prix.Etat=="actuelle"){
                var prixList =await _context.Prix.Where(p=> p.Etat=="actuelle").ToListAsync();
                if(prixList!=null){
                    foreach (var item in prixList)
                    {
                        item.Etat="non actuelle";
                        _context.Entry(item).State = EntityState.Modified;
                    }
                }
                
            }
            _context.Prix.Add(prix);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrix", new { id = prix.Id_Prix }, prix);
        }

        // DELETE: api/Prix/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Prix>> DeletePrix(int id)
        {
            var prix = await _context.Prix.FindAsync(id);
            if (prix == null)
            {
                return NotFound();
            }

            _context.Prix.Remove(prix);
            await _context.SaveChangesAsync();

            return prix;
        }

        private bool PrixExists(int id)
        {
            return _context.Prix.Any(e => e.Id_Prix == id);
        }
    }
}
