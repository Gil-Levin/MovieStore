using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;
using Microsoft.Extensions.Logging;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly MovieStoreDbContext _context;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(MovieStoreDbContext context, ILogger<OrdersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            if (_context.Orders == null)
            {
                _logger.LogWarning("Orders set is null.");
                return NotFound();
            }
            return await _context.Orders.ToListAsync();
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            if (_context.Orders == null)
            {
                _logger.LogWarning("Orders set is null.");
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                _logger.LogWarning($"Order with ID {id} not found.");
                return NotFound();
            }

            return order;
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

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (!OrderExists(id))
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
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            if (_context.Orders == null)
            {
                _logger.LogWarning("Orders set is null.");
                return Problem("Entity set 'MovieStoreDbContext.Orders' is null.");
            }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Order with ID {order.OrderId} created successfully.");
            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                _logger.LogWarning("Orders set is null.");
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                _logger.LogWarning($"Order with ID {id} not found.");
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            _logger.LogInformation($"Order with ID {id} deleted successfully.");
            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}
