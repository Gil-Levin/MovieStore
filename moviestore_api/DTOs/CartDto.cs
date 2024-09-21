using MovieStore_API.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieStore_API.DTOs
{
    public class CartDto
    {
        [Key]
        public int CartId { get; set; }

        [Required]
        public int UserId { get; set; }

    }
}
