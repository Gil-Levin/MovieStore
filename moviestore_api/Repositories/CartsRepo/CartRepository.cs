using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;
using MovieStore_API.Repositories.CartsRepo;

namespace MovieStore_API.Repositories.Repo.CartsRepo
{
    public class CartRepository : ICartRepository
    {
        private readonly MovieStoreDbContext _context;

        public CartRepository(MovieStoreDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Cart>> GetCartsAsync()
        {
            return await _context.Carts.ToListAsync();
        }

        public async Task<Cart> GetCartByIdAsync(int id)
        {
            return await _context.Carts.FindAsync(id);
        }

        public async Task AddCartAsync(Cart cart)
        {
            await _context.Carts.AddAsync(cart);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCartAsync(Cart cart)
        {
            _context.Entry(cart).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCartAsync(int id)
        {
            var cart = await GetCartByIdAsync(id);
            if (cart != null)
            {
                _context.Carts.Remove(cart);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> CartExistsAsync(int id)
        {
            return await _context.Carts.AnyAsync(e => e.CartId == id);
        }
    }
}
