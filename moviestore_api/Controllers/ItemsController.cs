using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.DTOs;
using MovieStore_API.Models;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly MovieStoreDbContext _context;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(MovieStoreDbContext context, ILogger<ItemsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Items/{cartId}
        [AllowAnonymous]
        [HttpGet("{cartId}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByCartId(int cartId)
        {
            if (_context.Items == null)
            {
                _logger.LogWarning("Items table is null.");
                return NotFound();
            }
            var items = await _context.Items
                .Where(i => i.CartId == cartId)
                .Include(i => i.Product)
                .ToListAsync();

            if (items == null || !items.Any())
            {
                _logger.LogWarning($"No items found for cartId: {cartId}");
                return NotFound();
            }

            _logger.LogInformation($"Returning items for cartId: {cartId}");
            return Ok(items);
        }

        // PUT: api/Items/{id}
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemDto updatedItemDto)
        {
            if (id != updatedItemDto.ItemID)
            {
                _logger.LogWarning("Invalid item ID for update.");
                return BadRequest();
            }

            var existingItem = await _context.Items.FindAsync(id);
            if (existingItem == null)
            {
                _logger.LogWarning($"Item not found for ID: {id}");
                return NotFound();
            }

            existingItem.Quantity = updatedItemDto.Quantity;

            try
            {
                await _context.SaveChangesAsync();
                _logger.LogInformation($"Item {id} updated successfully.");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    _logger.LogWarning($"Item with ID: {id} does not exist.");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Concurrency issue while updating item with ID: {id}");
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
                _logger.LogWarning("Items table is null.");
                return NotFound();
            }
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                _logger.LogWarning($"Item not found for ID: {id}");
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
            _logger.LogInformation($"Item {id} deleted successfully.");

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return (_context.Items?.Any(e => e.ItemID == id)).GetValueOrDefault();
        }
    }
}
