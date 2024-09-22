using MovieStore_API.Models;

namespace MovieStore_API.Repositories.CartsRepo
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetCartsAsync();
        Task<Cart> GetCartByIdAsync(int id);
        Task AddCartAsync(Cart cart);
        Task UpdateCartAsync(Cart cart);
        Task DeleteCartAsync(int id);
        Task<bool> CartExistsAsync(int id);
        Task DeleteCartByUserIdAsync(int userId);

    }
}
