using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieStore_API.DTOs;
using MovieStore_API.Models;
using MovieStore_API.Repositories;
using MovieStore_API.Repositories.ItemsRepo;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;
        private readonly ILogger<ItemsController> _logger;

        public ItemsController(IItemRepository itemRepository, ILogger<ItemsController> logger)
        {
            _itemRepository = itemRepository;
            _logger = logger;
        }

        // GET: api/Items/{cartId}
        [AllowAnonymous]
        [HttpGet("{cartId}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByCartId(int cartId)
        {
            var items = await _itemRepository.GetItemsByCartIdAsync(cartId);
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

            var existingItem = await _itemRepository.GetItemByIdAsync(id);
            if (existingItem == null)
            {
                _logger.LogWarning($"Item not found for ID: {id}");
                return NotFound();
            }

            existingItem.Quantity = updatedItemDto.Quantity;

            try
            {
                await _itemRepository.UpdateItemAsync(existingItem);
                _logger.LogInformation($"Item {id} updated successfully.");
            }
            catch
            {
                if (!await _itemRepository.ItemExistsAsync(id))
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
            var item = await _itemRepository.GetItemByIdAsync(id);
            if (item == null)
            {
                _logger.LogWarning($"Item not found for ID: {id}");
                return NotFound();
            }

            await _itemRepository.DeleteItemAsync(id);
            _logger.LogInformation($"Item {id} deleted successfully.");

            return NoContent();
        }

        // POST: api/Items
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Item>> CreateItem(ItemDto newItemDto)
        {
            var productExists = await _itemRepository.ItemExistsAsync(newItemDto.ProductID); // Ensure this check is on the repository side
            if (!productExists)
            {
                _logger.LogWarning($"Product with ID {newItemDto.ProductID} does not exist.");
                return NotFound($"Product with ID {newItemDto.ProductID} does not exist.");
            }

            var item = new Item
            {
                CartId = newItemDto.CartId,
                ProductID = newItemDto.ProductID,
                Quantity = newItemDto.Quantity
            };

            await _itemRepository.AddItemAsync(item);
            _logger.LogInformation($"Item {item.ItemID} created successfully.");
            return CreatedAtAction(nameof(GetItemsByCartId), new { cartId = item.CartId }, item);
        }
    }
}
