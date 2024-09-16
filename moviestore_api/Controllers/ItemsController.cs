using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly MovieStoreDbContext _context;

        public ItemsController(MovieStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Items/{cartId}
        [AllowAnonymous]
        [HttpGet("{cartId}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByCartId(int cartId)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            var items = await _context.Items
                .Where(i => i.CartId == cartId)
                .Include(i => i.Product)
                .ToListAsync();

            if (items == null || !items.Any())
            {
                return NotFound();
            }

            return Ok(items);
        }

        // PUT: api/Items/{id}
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItemQuantity(int id, [FromBody] Item updatedItem)
        {
            if (id != updatedItem.ItemID)
            {
                return BadRequest("Item ID mismatch.");
            }

            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem == null)
            {
                return NotFound("Item not found.");
            }

            if (updatedItem.Quantity < 0)
            {
                return BadRequest("Quantity must be non-negative.");
            }

            existingItem.Quantity = updatedItem.Quantity;

            _context.Entry(existingItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound("Item not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // DELETE: api/Items/{id}
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            if (_context.Items == null)
            {
                return NotFound();
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return (_context.Items?.Any(e => e.ItemID == id)).GetValueOrDefault();
        }
    }
}
