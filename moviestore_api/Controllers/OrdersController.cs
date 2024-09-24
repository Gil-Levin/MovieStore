using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MovieStore_API.Models;
using MovieStore_API.Repositories;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Repositories.OrderRepo;
using MovieStore_API.Repositories.ItemsRepo;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IItemRepository _itemRepository;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(IOrderRepository orderRepository, IItemRepository itemRepository, ILogger<OrdersController> logger)
        {
            _orderRepository = orderRepository;
            _itemRepository = itemRepository;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _orderRepository.GetOrdersAsync();
            if (orders == null)
            {
                _logger.LogWarning("Orders set is null.");
                return NotFound();
            }

            return Ok(orders);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(id);
            if (order == null)
            {
                _logger.LogWarning($"Order with ID {id} not found.");
                return NotFound();
            }

            return Ok(order);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                _logger.LogWarning($"Order ID mismatch. URL ID: {id}, Order ID: {order.OrderId}");
                return BadRequest();
            }

            try
            {
                await _orderRepository.UpdateOrderAsync(order);
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!await _orderRepository.OrderExistsAsync(id))
                {
                    _logger.LogWarning($"Order with ID {id} not found.");
                    return NotFound();
                }
                else
                {
                    _logger.LogError($"Error occurred while updating order with ID {id}: {ex.Message}");
                    throw;
                }
            }

            _logger.LogInformation($"Order with ID {id} updated successfully.");
            return NoContent();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(int cartId)
        {
            // Clear items from the repository that match the CartId
            await _itemRepository.DeleteItemsByCartIdAsync(cartId); // Ensure this method exists in your item repository.

            // Create a new order
            var order = new Order
            {
                UserId = cartId,        // Assign CartId to UserId
                OrderDate = DateTime.UtcNow // Assign current date
            };

            await _orderRepository.AddOrderAsync(order);
            _logger.LogInformation($"Order with ID {order.OrderId} created successfully.");

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, order);
        }


        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var orderExists = await _orderRepository.OrderExistsAsync(id);
            if (!orderExists)
            {
                _logger.LogWarning($"Order with ID {id} not found.");
                return NotFound();
            }

            await _orderRepository.DeleteOrderAsync(id);
            _logger.LogInformation($"Order with ID {id} deleted successfully.");
            return NoContent();
        }
    }
}
