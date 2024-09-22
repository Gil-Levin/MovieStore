using MovieStore_API.Models;

namespace MovieStore_api.Repositories.LoginRepo
{
    public interface ILoginRepository
    {
        Task<User> GetUserByEmailAsync(string email);
    }
}
