using MovieStore_API.Models;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieStore_API.Models
{
    public class UserDto
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        public string? Username { get; set; }
        [Required]
        public string? Password { get; set; }
        [Required]
        public string? Email { get; set; }
        public string? ProfilePicture { get; set; }
        public string? UserType { get; set; }
    }
}
