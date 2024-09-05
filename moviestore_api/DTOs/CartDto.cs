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

        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual ICollection<Product> Products { get; set; } = new List<Product>();

        [JsonIgnore]
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
