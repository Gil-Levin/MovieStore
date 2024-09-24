using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;
using MovieStore_API.Repositories.ItemsRepo;

namespace MovieStore_api.Repositories.ItemsRepo
{
    public class ItemRepository : IItemRepository
    {
        private readonly MovieStoreDbContext _context;

        public ItemRepository(MovieStoreDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Item>> GetItemsByCartIdAsync(int cartId)
        {
            return await _context.Items
                .Include(i => i.Product)
                .Where(i => i.CartId == cartId)
                .ToListAsync();
        }

        public async Task<Item> GetItemByIdAsync(int id)
        {
            return await _context.Items.FindAsync(id);
        }

        public async Task AddItemAsync(Item item)
        {
            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateItemAsync(Item item)
        {
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteItemAsync(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ItemExistsAsync(int id)
        {
            return await _context.Items.AnyAsync(e => e.ItemID == id);
        }
        public async Task RemoveProductFromItemsAsync(int productId)
        {
            var itemsToRemove = await _context.Items.Where(i => i.ProductID == productId).ToListAsync();
            _context.Items.RemoveRange(itemsToRemove);
            await _context.SaveChangesAsync();
        }

        public async Task<Item> GetItemByProductIdAndCartIdAsync(int productId, int cartId)
        {
            return await _context.Items
                .FirstOrDefaultAsync(i => i.ProductID == productId && i.CartId == cartId);
        }
        public async Task DeleteItemsByCartIdAsync(int cartId)
        {
            var items = await _context.Items.Where(i => i.CartId == cartId).ToListAsync();
            _context.Items.RemoveRange(items);
            await _context.SaveChangesAsync();
        }

    }
}
