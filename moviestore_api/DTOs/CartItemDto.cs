namespace MovieStore_api.DTOs
{
    public class CartItemDto
    {
        public int ItemID { get; set; }
        public int CartId { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public decimal ProductPrice { get; set; }
        public string ProductImage { get; set; }
        public string ProductCategory { get; set; }
        public int Quantity { get; set; }
    }
}
