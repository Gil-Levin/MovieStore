using MovieStore_API.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieStore_API.DTOs
{
    public class ItemDto
    {
        [Key]
        public int ItemID { get; set; }

        [Required]
        public int CartId { get; set; }

        [Required]
        public int ProductID { get; set; }

        [Required]
        public int Quantity { get; set; }
    }
}
