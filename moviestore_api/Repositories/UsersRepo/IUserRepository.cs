using MovieStore_API.Models;

namespace MovieStore_API.Repositories.UserRepo
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsersAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> AddUserAsync(User user);
        Task<User> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
        Task<bool> UserExistsAsync(int id);
        Task<(bool usernameExists, bool emailExists)> CheckIfExistsAsync(string username, string email);
    }
}
