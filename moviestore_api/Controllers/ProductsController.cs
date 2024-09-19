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
    public class ProductsController : ControllerBase
    {
        private readonly MovieStoreDbContext _context;
        private readonly ILogger<ProductsController> _logger;

        public ProductsController(MovieStoreDbContext context, ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_context.Products == null)
            {
                _logger.LogWarning("Products set is null.");
                return NotFound();
            }
            return await _context.Products.ToListAsync();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                _logger.LogWarning("Products set is null.");
                return NotFound();
            }

            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                _logger.LogWarning($"Product with ID {id} not found.");
                return NotFound();
            }

            var productDto = new Product
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                Image = product.Image,
                Category = product.Category
            };

            return Ok(productDto);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                _logger.LogWarning($"Product ID mismatch. URL ID: {id}, Product ID: {product.ProductId}");
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!ProductExists(id))
                {
                    _logger.LogWarning($"Product with ID {id} not found.");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Error occurred while updating product with ID {id}: {ex.Message}");
                    throw;
                }
            }

            _logger.LogInformation($"Product with ID {id} updated successfully.");
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (_context.Products == null)
            {
                _logger.LogWarning("Products set is null.");
                return Problem("Entity set 'MovieStoreDbContext.Products' is null.");
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Product with ID {product.ProductId} created successfully.");
            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                _logger.LogWarning("Products set is null.");
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                _logger.LogWarning($"Product with ID {id} not found.");
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Product with ID {id} deleted successfully.");
            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return (_context.Products?.Any(e => e.ProductId == id)).GetValueOrDefault();
        }
    }
}
