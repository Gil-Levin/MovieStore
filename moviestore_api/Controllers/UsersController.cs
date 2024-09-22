using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MovieStore_API.Models;
using MovieStore_API.Repositories;
using MovieStore_API.Repositories.CartsRepo;
using MovieStore_API.Repositories.UserRepo;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MovieStore_API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ICartRepository _cartRepository;  // Added cart repository
        private readonly IConfiguration _configuration;

        public UsersController(IUserRepository userRepository, ICartRepository cartRepository, IConfiguration configuration)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _cartRepository = cartRepository ?? throw new ArgumentNullException(nameof(cartRepository));  // Assign cart repository
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            if (users == null || !users.Any())
            {
                return NotFound("No users found.");
            }
            return Ok(users);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest("User ID mismatch.");
            }

            var (usernameExists, emailExists) = await _userRepository.CheckIfExistsAsync(user.Username, user.Email);
            if (usernameExists)
            {
                return Conflict(new { message = "Username is already taken." });
            }

            if (emailExists)
            {
                return Conflict(new { message = "Email is already taken." });
            }

            try
            {
                await _userRepository.UpdateUserAsync(user);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _userRepository.UserExistsAsync(id))
                {
                    return NotFound($"User with ID {id} not found.");
                }
                else
                {
                    throw;
                }
            }

            var updatedUser = await _userRepository.GetUserByIdAsync(id);
            if (updatedUser == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            return Ok(updatedUser);
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var (usernameExists, emailExists) = await _userRepository.CheckIfExistsAsync(user.Username, user.Email);

            if (usernameExists)
            {
                return Conflict(new { message = "Username is already taken." });
            }

            if (emailExists)
            {
                return Conflict(new { message = "Email is already in use." });
            }

            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            await _userRepository.AddUserAsync(user);

            var cart = new Cart
            {
                UserId = user.UserId
            };

            await _cartRepository.AddCartAsync(cart);
            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // First, delete the user's cart
            await _cartRepository.DeleteCartByUserIdAsync(id); // Ensure this method exists in your ICartRepository

            // Now, delete the user
            var deleted = await _userRepository.DeleteUserAsync(id);
            if (!deleted)
            {
                return NotFound($"User with ID {id} not found.");
            }

            return NoContent();
        }

        [AllowAnonymous]
        [HttpGet("profile")]
        public async Task<ActionResult<User>> GetProfile()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                return Unauthorized("User ID claim not found.");
            }

            if (!int.TryParse(userIdClaim, out var userId))
            {
                return BadRequest("Invalid user ID.");
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }

            return Ok(user);
        }

        [AllowAnonymous]
        [HttpGet("check")]
        public async Task<IActionResult> CheckIfExists([FromQuery] string username, [FromQuery] string email)
        {
            var (usernameExists, emailExists) = await _userRepository.CheckIfExistsAsync(username, email);
            return Ok(new { usernameExists, emailExists });
        }
    }
}