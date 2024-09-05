using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace MovieStore_API.Models
{
    public class Item
    {
        [Key]
        public int ItemID { get; set; }
        [Required]
        public int CartId { get; set; }
        [Required]
        public int ProductID { get; set; }
        [Required]
        public int Quantity { get; set; }

        [JsonIgnore]
        public virtual Cart Cart { get; set; }

        [JsonIgnore]
        public virtual Product Product { get; set; }

        [JsonIgnore]
        public virtual Order Order { get; set; }
    }
}
