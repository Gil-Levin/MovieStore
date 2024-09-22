using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Models;
using MovieStore_API.Repositories.ItemsRepo;
using MovieStore_API.Repositories.ProductRepo;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly ILogger<ProductsController> _logger;
        private readonly IItemRepository _itemRepository;


        public ProductsController(IProductRepository productRepository, IItemRepository itemRepository, ILogger<ProductsController> logger)
        {
            _productRepository = productRepository;
            _logger = logger;
            _itemRepository = itemRepository;

        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productRepository.GetAllProductsAsync();
            if (products == null)
            {
                _logger.LogWarning("No products found.");
                return NotFound();
            }

            return Ok(products);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);
            if (product == null)
            {
                _logger.LogWarning($"Product with ID {id} not found.");
                return NotFound();
            }

            return Ok(product);
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

            try
            {
                await _productRepository.UpdateProductAsync(product);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _productRepository.ProductExistsAsync(id))
                {
                    _logger.LogWarning($"Product with ID {id} not found.");
                    return NotFound();
                }
                else
                {
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
            await _productRepository.AddProductAsync(product);
            _logger.LogInformation($"Product with ID {product.ProductId} created successfully.");
            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, product);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productRepository.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound();
            }
            await _itemRepository.RemoveProductFromItemsAsync(id);

            await _productRepository.DeleteProductAsync(id);

            return NoContent();
        }
    }
}
