using MovieStore_API.Models;

namespace MovieStore_API.Repositories.OrderRepo
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrdersAsync();
        Task<Order> GetOrderByIdAsync(int id);
        Task AddOrderAsync(Order order);
        Task UpdateOrderAsync(Order order);
        Task DeleteOrderAsync(int id);
        Task<bool> OrderExistsAsync(int id);
    }
}
