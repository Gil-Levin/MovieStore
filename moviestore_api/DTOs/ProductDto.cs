using System.Collections.Generic;
using MovieStore_API.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieStore_API.DTOs
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        public string Image { get; set; }

        [Required]
        public string Category { get; set; }

        [JsonIgnore]
        public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
