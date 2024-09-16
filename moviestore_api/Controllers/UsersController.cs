using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Data;
using MovieStore_API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MovieStoreDbContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(MovieStoreDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            if (users == null)
            {
                return NotFound();
            }
            return users;
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest("User ID mismatch.");
            }

            // Check if the username is already taken by another user
            var existingUserName = await _context.Users
                .Where(u => u.Username == user.Username && u.UserId != id)
                .FirstOrDefaultAsync();

            if (existingUserName != null)
            {
                return Conflict(new { message = "Username is already taken." });
            }

            var existingEmail = await _context.Users
                .Where(u => u.Email == user.Email && u.UserId != id)
                .FirstOrDefaultAsync();

            if (existingEmail != null)
            {
                return Conflict(new { message = "Email is already taken." });
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Retrieve the updated user from the database
            var updatedUser = await _context.Users.FindAsync(id);

            if (updatedUser == null)
            {
                return NotFound();
            }

            return Ok(updatedUser);
        }



        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("profile")]
        public async Task<ActionResult<User>> GetProfile()
        {
            // Extract user ID from JWT claims
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID.");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}


