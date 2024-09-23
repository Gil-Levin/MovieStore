using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;

namespace MovieStore_API.Repositories.OrderRepo
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MovieStoreDbContext _context;

        public OrderRepository(MovieStoreDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Order>> GetOrdersAsync()
        {
            return await _context.Orders.ToListAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id)
        {
            return await _context.Orders.FindAsync(id);
        }

        public async Task AddOrderAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateOrderAsync(Order order)
        {
            _context.Entry(order).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteOrderAsync(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order != null)
            {
                _context.Orders.Remove(order);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> OrderExistsAsync(int id)
        {
            return await _context.Orders.AnyAsync(o => o.OrderId == id);
        }

        public async Task<Order?> GetLastOrderAsync()
        {
            return await _context.Orders.OrderByDescending(o => o.OrderId).FirstOrDefaultAsync();
        }
    }
}
