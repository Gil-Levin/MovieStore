using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieStore_API.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual ICollection<Item> Items { get; set; } = new List<Item>();

        [JsonIgnore]
        public virtual ICollection<Product>? Products { get; set; }
    }
}