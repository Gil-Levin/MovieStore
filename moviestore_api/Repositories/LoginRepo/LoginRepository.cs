using Microsoft.EntityFrameworkCore;
using MovieStore_api.Repositories.LoginRepo;
using MovieStore_API.Data;
using MovieStore_API.Models;

namespace MovieStore_API.Repositories.LoginRepo
{
    public class LoginRepository : ILoginRepository
    {
        private readonly MovieStoreDbContext _context;

        public LoginRepository(MovieStoreDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }
    }
}
