using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;
using MovieStore_API.Repositories.UserRepo;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MovieStore_API.Repositories.UserRepo
{
    public class UserRepository : IUserRepository
    {
        private readonly MovieStoreDbContext _context;

        public UserRepository(MovieStoreDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUserAsync(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await GetUserByIdAsync(id);
            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UserExistsAsync(int id)
        {
            return await _context.Users.AnyAsync(u => u.UserId == id);
        }

        public async Task<(bool usernameExists, bool emailExists)> CheckIfExistsAsync(string username, string email)
        {
            var usernameExists = await _context.Users.AnyAsync(u => u.Username == username);
            var emailExists = await _context.Users.AnyAsync(u => u.Email == email);
            return (usernameExists, emailExists);
        }
    }
}
