using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using moviestore_dal.DTOs;
using MovieStore_API.Models;
using MovieStore_API.Repositories.ItemsRepo;
using MovieStore_API.Repositories.ProductRepo;
using MovieStore_api.DTOs;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        private readonly IProductRepository _productRepository;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(IItemRepository itemRepository, IProductRepository productRepository, ILogger<ItemsController> logger)
        {
            _itemRepository = itemRepository;
            _productRepository = productRepository;
            _logger = logger;
        }

        // GET: api/Items/{cartId}
        [AllowAnonymous]
        [HttpGet("{cartId}")]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetItemsByCartId(int cartId)
        {
            // Fetch the items by CartId
            var items = await _itemRepository.GetItemsByCartIdAsync(cartId);
            if (items == null || !items.Any())
            {
                _logger.LogWarning("No items found for CartId: {CartId}", cartId);
                return NotFound();
            }

            // Convert the list of items to CartItemDto including Product details
            var cartItems = items.Select(item => new CartItemDto
            {
                ItemID = item.ItemID,
                CartId = item.CartId,
                ProductID = item.ProductID,
                ProductName = item.Product.Name,
                ProductDescription = item.Product.Description,
                ProductPrice = item.Product.Price,
                ProductImage = item.Product.Image,
                ProductCategory = item.Product.Category,
                Quantity = item.Quantity
            }).ToList();

            _logger.LogInformation("Returning items for CartId: {CartId}", cartId);
            return Ok(cartItems);
        }

        // PUT: api/Items/{id}
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemDto updatedItemDto)
        {
            if (id != updatedItemDto.ItemID)
            {
                _logger.LogWarning($"Item ID {updatedItemDto.ItemID} doesn't match the link 'items/{id}'.");
                return BadRequest($"Item ID {updatedItemDto.ItemID} doesn't match the link 'items/{id}'.");
            }

            var existingItem = await _itemRepository.GetItemByIdAsync(id);
            if (existingItem == null)
            {
                _logger.LogWarning($"Item with ID {id} not found.");
                return NotFound($"Item with ID {id} not found.");
            }

            existingItem.Quantity = updatedItemDto.Quantity;

            try
            {
                await _itemRepository.UpdateItemAsync(existingItem);
                _logger.LogInformation("Item {Id} updated successfully.", id);
            }
            catch
            {
                if (!await _itemRepository.ItemExistsAsync(id))
                {
                    _logger.LogWarning("Item with ID: {Id} does not exist.", id);
                    return NotFound();
                }

                _logger.LogError("Concurrency issue while updating Item with ID: {Id}.", id);
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Items/{id}
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _itemRepository.GetItemByIdAsync(id);
            if (item == null)
            {
                _logger.LogWarning("Item not found for ID: {Id}", id);
                return NotFound($"Item with ID {id} not found.");
            }

            await _itemRepository.DeleteItemAsync(id);
            _logger.LogInformation("Item {Id} deleted successfully.", id);

            return NoContent();
        }

        // POST: api/Items
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(ItemDto newItemDto)
        {
            // Check if the product exists in the ProductRepository
            if (!await _productRepository.ProductExistsAsync(newItemDto.ProductID))
            {
                _logger.LogWarning("Product with ID {ProductID} does not exist.", newItemDto.ProductID);
                return NotFound($"Product with ID {newItemDto.ProductID} does not exist.");
            }

            // Check if the item with the same ProductID already exists in the cart
            var existingItem = await _itemRepository.GetItemByProductIdAndCartIdAsync(newItemDto.ProductID, newItemDto.CartId);

            if (existingItem != null)
            {
                // If the item exists, increment the quantity
                existingItem.Quantity += newItemDto.Quantity;
                await _itemRepository.UpdateItemAsync(existingItem);
                _logger.LogInformation("Quantity updated for existing Item {ItemID} in CartId {CartId}.", existingItem.ItemID, newItemDto.CartId);
                return Ok(existingItem); // Return the updated item
            }

            // Create a new Item if it doesn't exist
            var newItem = new Item
            {
                CartId = newItemDto.CartId,
                ProductID = newItemDto.ProductID,
                Quantity = newItemDto.Quantity
            };

            // Add the new item to the ItemRepository
            await _itemRepository.AddItemAsync(newItem);
            _logger.LogInformation("New Item {ItemID} created successfully in CartId {CartId}.", newItem.ItemID, newItemDto.CartId);

            // Return the newly created item with a 201 Created response
            return CreatedAtAction(nameof(GetItemsByCartId), new { cartId = newItem.CartId }, newItem);
        }

    }
}
