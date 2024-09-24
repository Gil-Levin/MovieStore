using Microsoft.EntityFrameworkCore;
using MovieStore_API.Models;

namespace MovieStore_API.Repositories.ItemsRepo
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetItemsByCartIdAsync(int cartId);
        Task<Item> GetItemByIdAsync(int id);
        Task AddItemAsync(Item item);
        Task UpdateItemAsync(Item item);
        Task DeleteItemAsync(int id);
        Task<bool> ItemExistsAsync(int id);
        Task RemoveProductFromItemsAsync(int productId);
        Task<Item> GetItemByProductIdAndCartIdAsync(int productId, int cartId);
        Task DeleteItemsByCartIdAsync(int cartId);
    }
}
