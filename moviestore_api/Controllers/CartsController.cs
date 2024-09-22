using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Models;
using MovieStore_API.Repositories.CartsRepo;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartsController(ICartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            var carts = await _cartRepository.GetCartsAsync();
            return Ok(carts);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _cartRepository.GetCartByIdAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            if (id != cart.CartId)
            {
                return BadRequest();
            }

            try
            {
                await _cartRepository.UpdateCartAsync(cart);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _cartRepository.CartExistsAsync(id))
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

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            await _cartRepository.AddCartAsync(cart);
            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _cartRepository.GetCartByIdAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            await _cartRepository.DeleteCartAsync(id);
            return NoContent();
        }
    }
}
