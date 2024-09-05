using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MovieStore_API.Models; // Add the namespace of your models
using Pomelo.EntityFrameworkCore.MySql; // Add this namespace
using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MovieStore_API.Data
{
    public class MovieStoreDbContext : DbContext
    {
        private readonly IConfiguration _configuration;

        public MovieStoreDbContext() { }

        public MovieStoreDbContext(DbContextOptions<MovieStoreDbContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Item> Items{ get; set; }
        public DbSet<Cart> Carts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string connectionString = _configuration.GetConnectionString("MyConnectionString");

            optionsBuilder.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 26)));

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId)
                    .IsRequired()
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Username)
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.ProfilePicture)
                    .HasMaxLength(255);

                entity.Property(e => e.UserType)
                    .HasMaxLength(50);

                entity.HasMany(e => e.Orders)
                    .WithOne(o => o.User)
                    .HasForeignKey(o => o.UserId)
                    .OnDelete(DeleteBehavior.Cascade); 

                entity.HasOne(u => u.Cart)
                      .WithOne(c => c.User)
                      .HasForeignKey<Cart>(c => c.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductId).IsRequired().ValueGeneratedOnAdd();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Description).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Price).HasColumnType("decimal(18, 2)").IsRequired();
                entity.Property(e => e.Image).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Carts");
                entity.HasKey(e => e.CartId);

                entity.Property(e => e.CartId).IsRequired().ValueGeneratedOnAdd();
                entity.Property(e => e.UserId).IsRequired().ValueGeneratedNever();

                entity.HasOne(e => e.User)
                      .WithOne(u => u.Cart)
                      .HasForeignKey<Cart>(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.Items)
                      .WithOne(i => i.Cart)
                      .HasForeignKey(i => i.CartId);

                entity.HasMany(e => e.Products)
                      .WithMany(p => p.Carts)
                      .UsingEntity(j => j.ToTable("CartProduct"));
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable("Items");
                entity.HasKey(e => e.ItemID);

                entity.Property(e => e.ItemID).IsRequired().ValueGeneratedOnAdd();
                entity.Property(e => e.CartId).IsRequired();
                entity.Property(e => e.ProductID).IsRequired();
                entity.Property(e => e.Quantity).IsRequired();

                entity.HasOne(e => e.Cart)
                      .WithMany(c => c.Items)
                      .HasForeignKey(e => e.CartId);

                entity.HasOne(e => e.Product)
                      .WithMany()
                      .HasForeignKey(e => e.ProductID);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("Orders");
                entity.HasKey(e => e.OrderId);

                entity.Property(e => e.OrderId).IsRequired().ValueGeneratedOnAdd();
                entity.Property(e => e.UserId).IsRequired();
                entity.Property(e => e.OrderDate).IsRequired();

                entity.HasOne(e => e.User)
                      .WithMany(u => u.Orders)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(e => e.Products)
                      .WithMany(p => p.Orders)
                      .UsingEntity(j => j.ToTable("OrderProduct"));

                entity.HasMany(o => o.Items)
                      .WithOne(i => i.Order) 
                      .HasForeignKey(i => i.CartId)
                      .HasPrincipalKey(o => o.UserId);
            });

            modelBuilder.Entity<User>().HasData(
                new User { UserId = 1, Username = "Admin", Password = "1234", Email = "admin1234@gmail.com", ProfilePicture = "profile1.jpg", UserType = "Admin" },
                new User { UserId = 2, Username = "JohnDoe", Password = "password123", Email = "john.doe@gmail.com", ProfilePicture = "profile1.jpg", UserType = "Customer" },
                new User { UserId = 3, Username = "JaneSmith", Password = "password456", Email = "jane.smith@gmail.com", ProfilePicture = "profile2.jpg", UserType = "Customer" },
                new User { UserId = 4, Username = "MichaelScott", Password = "ilovepaper", Email = "michael.scott@gmail.com", ProfilePicture = "profile3.jpg", UserType = "Customer" },
                new User { UserId = 5, Username = "EmilyJohnson", Password = "securepass", Email = "emily.johnson@yahoo.com", ProfilePicture = "profile4.jpg", UserType = "Customer" },
                new User { UserId = 6, Username = "DavidLee", Password = "david123", Email = "david.lee@outlook.com", ProfilePicture = "profile5.jpg", UserType = "Customer" },
                new User { UserId = 7, Username = "MichelleWilliams", Password = "michelle", Email = "michelle.williams@protonmail.com", ProfilePicture = "profile6.jpg", UserType = "Customer" },
                new User { UserId = 8, Username = "AlexTurner", Password = "arctic123", Email = "alex.turner@gmail.com", ProfilePicture = "profile7.jpg", UserType = "Customer" },
                new User { UserId = 9, Username = "EmmaWatson", Password = "hermione", Email = "emma.watson@yahoo.com", ProfilePicture = "profile8.jpg", UserType = "Customer" },
                new User { UserId = 10, Username = "ChrisHemsworth", Password = "thorlove", Email = "chris.hemsworth@outlook.com", ProfilePicture = "profile9.jpg", UserType = "Customer" }
            );

            modelBuilder.Entity<Cart>().HasData(
                new Cart { CartId = 1, UserId = 1 },
                new Cart { CartId = 2, UserId = 2 },
                new Cart { CartId = 3, UserId = 3 },
                new Cart { CartId = 4, UserId = 4 },
                new Cart { CartId = 5, UserId = 5 },
                new Cart { CartId = 6, UserId = 6 },
                new Cart { CartId = 7, UserId = 7 },
                new Cart { CartId = 8, UserId = 8 },
                new Cart { CartId = 9, UserId = 9 },
                new Cart { CartId = 10, UserId = 10 });

            modelBuilder.Entity<Order>().HasData(
                new Order { OrderId = 1, UserId = 1, OrderDate = new DateTime(2023, 07, 20) },
                new Order { OrderId = 2, UserId = 2, OrderDate = new DateTime(2023, 07, 22) },
                new Order { OrderId = 3, UserId = 3, OrderDate = new DateTime(2023, 07, 24) },
                new Order { OrderId = 4, UserId = 4, OrderDate = new DateTime(2023, 07, 21) },
                new Order { OrderId = 5, UserId = 5, OrderDate = new DateTime(2023, 07, 23) },
                new Order { OrderId = 6, UserId = 6, OrderDate = new DateTime(2023, 07, 25) },
                new Order { OrderId = 7, UserId = 7, OrderDate = new DateTime(2023, 07, 26) },
                new Order { OrderId = 8, UserId = 8, OrderDate = new DateTime(2023, 07, 27) },
                new Order { OrderId = 9, UserId = 9, OrderDate = new DateTime(2023, 07, 28) },
                new Order { OrderId = 10, UserId = 10, OrderDate = new DateTime(2023, 07, 29) });

    modelBuilder.Entity<Product>(entity =>
    {
        entity.HasKey(e => e.ProductId);
        entity.Property(e => e.ProductId).ValueGeneratedOnAdd();
        entity.Property(e => e.Name).IsRequired();
        entity.Property(e => e.Description).IsRequired();
        entity.Property(e => e.Price).IsRequired().HasColumnType("decimal(18,2)");
        entity.Property(e => e.Image).IsRequired();
        entity.Property(e => e.Category).IsRequired();
    });

            modelBuilder.Entity<Product>().HasData(
               new Product { ProductId = 1, Name = "Inception", Description = "A thief who enters the dreams of others to steal secrets from their subconscious.", Price = 9.99m, Image = "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg", Category = "Action" },
               new Product { ProductId = 2, Name = "The Dark Knight", Description = "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", Price = 11.99m, Image = "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg", Category = "Action" },
               new Product { ProductId = 3, Name = "Fight Club", Description = "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.", Price = 10.99m, Image = "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg", Category = "Drama" },
               new Product { ProductId = 4, Name = "Pulp Fiction", Description = "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", Price = 11.99m, Image = "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg", Category = "Crime" },
               new Product { ProductId = 5, Name = "The Shawshank Redemption", Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", Price = 10.99m, Image = "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg", Category = "Drama" },
               new Product { ProductId = 6, Name = "Forrest Gump", Description = "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", Price = 8.99m, Image = "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", Category = "Drama" },
               new Product { ProductId = 7, Name = "The Godfather", Description = "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", Price = 13.99m, Image = "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg", Category = "Crime" },
               new Product { ProductId = 8, Name = "The Matrix", Description = "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", Price = 12.99m, Image = "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", Category = "Sci-Fi" },
               new Product { ProductId = 9, Name = "Goodfellas", Description = "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.", Price = 11.99m, Image = "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg", Category = "Crime" },
               new Product { ProductId = 10, Name = "The Lord of the Rings: The Return of the King", Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", Price = 14.99m, Image = "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Return_of_the_King.jpg", Category = "Fantasy" },
               new Product { ProductId = 11, Name = "The Lord of the Rings: The Fellowship of the Ring", Description = "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", Price = 13.99m, Image = "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Fellowship_of_the_Ring_%282001%29_theatrical_poster.jpg", Category = "Fantasy" },
               new Product { ProductId = 12, Name = "The Lord of the Rings: The Two Towers", Description = "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.", Price = 12.99m, Image = "https://upload.wikimedia.org/wikipedia/en/a/ad/Lord_of_the_Rings_-_The_Two_Towers.jpg", Category = "Fantasy" },
               new Product { ProductId = 13, Name = "The Godfather: Part II", Description = "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.", Price = 13.99m, Image = "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg", Category = "Crime" },
               new Product { ProductId = 14, Name = "The Shawshank Redemption", Description = "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", Price = 10.99m, Image = "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg", Category = "Drama" },
               new Product { ProductId = 15, Name = "The Dark Knight Rises", Description = "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.", Price = 12.99m, Image = "https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg", Category = "Action" },
               new Product { ProductId = 16, Name = "Schindler's List", Description = "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", Price = 11.99m, Image = "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg", Category = "Drama" },
               new Product { ProductId = 17, Name = "The Lord of the Rings: The Fellowship of the Ring", Description = "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", Price = 13.99m, Image = "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Fellowship_of_the_Ring_%282001%29_theatrical_poster.jpg", Category = "Fantasy" },
               new Product { ProductId = 18, Name = "The Lord of the Rings: The Two Towers", Description = "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.", Price = 12.99m, Image = "https://upload.wikimedia.org/wikipedia/en/a/ad/Lord_of_the_Rings_-_The_Two_Towers.jpg", Category = "Fantasy" },
               new Product { ProductId = 19, Name = "The Lord of the Rings: The Return of the King", Description = "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", Price = 14.99m, Image = "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Return_of_the_King.jpg", Category = "Fantasy" },
               new Product { ProductId = 20, Name = "Forrest Gump", Description = "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", Price = 8.99m, Image = "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", Category = "Drama" });

        modelBuilder.Entity<Item>().HasData(
           new Item { ItemID = 1, CartId = 1, ProductID = 1, Quantity = 2 },
           new Item { ItemID = 2, CartId = 2, ProductID = 3, Quantity = 1 },
           new Item { ItemID = 3, CartId = 3, ProductID = 5, Quantity = 3 },
           new Item { ItemID = 4, CartId = 4, ProductID = 7, Quantity = 2 },
           new Item { ItemID = 5, CartId = 5, ProductID = 9, Quantity = 1 },
           new Item { ItemID = 6, CartId = 6, ProductID = 11, Quantity = 4 },
           new Item { ItemID = 7, CartId = 7, ProductID = 13, Quantity = 2 },
           new Item { ItemID = 8, CartId = 8, ProductID = 15, Quantity = 3 },
           new Item { ItemID = 9, CartId = 9, ProductID = 17, Quantity = 1 },
           new Item { ItemID = 10, CartId = 10, ProductID = 19, Quantity = 5 },
           new Item { ItemID = 11, CartId = 1, ProductID = 2, Quantity = 1 },
           new Item { ItemID = 12, CartId = 2, ProductID = 4, Quantity = 2 },
           new Item { ItemID = 13, CartId = 3, ProductID = 6, Quantity = 1 },
           new Item { ItemID = 14, CartId = 4, ProductID = 8, Quantity = 3 },
           new Item { ItemID = 15, CartId = 5, ProductID = 10, Quantity = 2 },
           new Item { ItemID = 16, CartId = 6, ProductID = 12, Quantity = 4 },
           new Item { ItemID = 17, CartId = 7, ProductID = 14, Quantity = 1 },
           new Item { ItemID = 18, CartId = 8, ProductID = 16, Quantity = 2 },
           new Item { ItemID = 19, CartId = 9, ProductID = 18, Quantity = 3 },
           new Item { ItemID = 20, CartId = 10, ProductID = 20, Quantity = 2 });
        }
    }
}