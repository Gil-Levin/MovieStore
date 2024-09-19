using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;
using MovieStore_API.Services;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly MovieStoreDbContext _context;

        public CartsController(MovieStoreDbContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            Logger.Instance.Log("GetCarts called.");

            if (_context.Carts == null)
            {
                Logger.Instance.Log("Carts not found.");
                return NotFound();
            }

            var carts = await _context.Carts.ToListAsync();
            Logger.Instance.Log($"Returned {carts.Count} carts.");

            return carts;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            Logger.Instance.Log($"GetCart called with id: {id}");

            if (_context.Carts == null)
            {
                Logger.Instance.Log("Carts not found.");
                return NotFound();
            }

            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                Logger.Instance.Log($"Cart with id {id} not found.");
                return NotFound();
            }

            Logger.Instance.Log($"Cart with id {id} returned.");
            return cart;
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            Logger.Instance.Log($"PutCart called for id: {id}");

            if (id != cart.CartId)
            {
                Logger.Instance.Log("BadRequest: CartId mismatch.");
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                Logger.Instance.Log($"Cart with id {id} updated successfully.");
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    Logger.Instance.Log($"Cart with id {id} not found during update.");
                    return NotFound();
                }
                else
                {
                    Logger.Instance.Log($"Concurrency issue during update of cart with id {id}.");
                    throw;
                }
            }

            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            Logger.Instance.Log("PostCart called.");

            if (_context.Carts == null)
            {
                Logger.Instance.Log("Error: MovieStoreDbContext.Carts is null.");
                return Problem("Entity set 'MovieStoreDbContext.Carts'  is null.");
            }

            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            Logger.Instance.Log($"Cart created with id {cart.CartId}.");
            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            Logger.Instance.Log($"DeleteCart called for id: {id}");

            if (_context.Carts == null)
            {
                Logger.Instance.Log("Carts not found.");
                return NotFound();
            }

            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                Logger.Instance.Log($"Cart with id {id} not found.");
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            Logger.Instance.Log($"Cart with id {id} deleted successfully.");
            return NoContent();
        }

        private bool CartExists(int id)
        {
            Logger.Instance.Log($"Checking if cart with id {id} exists.");
            return (_context.Carts?.Any(e => e.CartId == id)).GetValueOrDefault();
        }
    }
}
