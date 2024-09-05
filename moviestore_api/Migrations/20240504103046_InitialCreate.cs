using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MovieStore_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Image = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ProfilePicture = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserType = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Carts",
                columns: table => new
                {
                    CartId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Carts", x => x.CartId);
                    table.ForeignKey(
                        name: "FK_Carts_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.UniqueConstraint("AK_Orders_UserId", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Orders_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "CartProduct",
                columns: table => new
                {
                    CartsCartId = table.Column<int>(type: "int", nullable: false),
                    ProductsProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartProduct", x => new { x.CartsCartId, x.ProductsProductId });
                    table.ForeignKey(
                        name: "FK_CartProduct_Carts_CartsCartId",
                        column: x => x.CartsCartId,
                        principalTable: "Carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CartProduct_Products_ProductsProductId",
                        column: x => x.ProductsProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Items",
                columns: table => new
                {
                    ItemID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    CartId = table.Column<int>(type: "int", nullable: false),
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Items", x => x.ItemID);
                    table.ForeignKey(
                        name: "FK_Items_Carts_CartId",
                        column: x => x.CartId,
                        principalTable: "Carts",
                        principalColumn: "CartId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Orders_CartId",
                        column: x => x.CartId,
                        principalTable: "Orders",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Items_Products_ProductID",
                        column: x => x.ProductID,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "OrderProduct",
                columns: table => new
                {
                    OrdersOrderId = table.Column<int>(type: "int", nullable: false),
                    ProductsProductId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProduct", x => new { x.OrdersOrderId, x.ProductsProductId });
                    table.ForeignKey(
                        name: "FK_OrderProduct_Orders_OrdersOrderId",
                        column: x => x.OrdersOrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderProduct_Products_ProductsProductId",
                        column: x => x.ProductsProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "Category", "Description", "Image", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Action", "A thief who enters the dreams of others to steal secrets from their subconscious.", "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg", "Inception", 9.99m },
                    { 2, "Action", "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", "https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg", "The Dark Knight", 11.99m },
                    { 3, "Drama", "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.", "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg", "Fight Club", 10.99m },
                    { 4, "Crime", "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg", "Pulp Fiction", 11.99m },
                    { 5, "Drama", "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg", "The Shawshank Redemption", 10.99m },
                    { 6, "Drama", "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", "Forrest Gump", 8.99m },
                    { 7, "Crime", "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg", "The Godfather", 13.99m },
                    { 8, "Sci-Fi", "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", "The Matrix", 12.99m },
                    { 9, "Crime", "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.", "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg", "Goodfellas", 11.99m },
                    { 10, "Fantasy", "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Return_of_the_King.jpg", "The Lord of the Rings: The Return of the King", 14.99m },
                    { 11, "Fantasy", "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Fellowship_of_the_Ring_%282001%29_theatrical_poster.jpg", "The Lord of the Rings: The Fellowship of the Ring", 13.99m },
                    { 12, "Fantasy", "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.", "https://upload.wikimedia.org/wikipedia/en/a/ad/Lord_of_the_Rings_-_The_Two_Towers.jpg", "The Lord of the Rings: The Two Towers", 12.99m },
                    { 13, "Crime", "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.", "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg", "The Godfather: Part II", 13.99m },
                    { 14, "Drama", "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg", "The Shawshank Redemption", 10.99m },
                    { 15, "Action", "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.", "https://upload.wikimedia.org/wikipedia/en/8/83/Dark_knight_rises_poster.jpg", "The Dark Knight Rises", 12.99m },
                    { 16, "Drama", "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg", "Schindler's List", 11.99m },
                    { 17, "Fantasy", "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Fellowship_of_the_Ring_%282001%29_theatrical_poster.jpg", "The Lord of the Rings: The Fellowship of the Ring", 13.99m },
                    { 18, "Fantasy", "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.", "https://upload.wikimedia.org/wikipedia/en/a/ad/Lord_of_the_Rings_-_The_Two_Towers.jpg", "The Lord of the Rings: The Two Towers", 12.99m },
                    { 19, "Fantasy", "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.", "https://upload.wikimedia.org/wikipedia/en/9/9d/Lord_of_the_Rings_-_The_Return_of_the_King.jpg", "The Lord of the Rings: The Return of the King", 14.99m },
                    { 20, "Drama", "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.", "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", "Forrest Gump", 8.99m }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "Password", "ProfilePicture", "UserType", "Username" },
                values: new object[,]
                {
                    { 1, "admin1234@gmail.com", "1234", "profile1.jpg", "Admin", "Admin" },
                    { 2, "john.doe@gmail.com", "password123", "profile1.jpg", "Customer", "JohnDoe" },
                    { 3, "jane.smith@gmail.com", "password456", "profile2.jpg", "Customer", "JaneSmith" },
                    { 4, "michael.scott@gmail.com", "ilovepaper", "profile3.jpg", "Customer", "MichaelScott" },
                    { 5, "emily.johnson@yahoo.com", "securepass", "profile4.jpg", "Customer", "EmilyJohnson" },
                    { 6, "david.lee@outlook.com", "david123", "profile5.jpg", "Customer", "DavidLee" },
                    { 7, "michelle.williams@protonmail.com", "michelle", "profile6.jpg", "Customer", "MichelleWilliams" },
                    { 8, "alex.turner@gmail.com", "arctic123", "profile7.jpg", "Customer", "AlexTurner" },
                    { 9, "emma.watson@yahoo.com", "hermione", "profile8.jpg", "Customer", "EmmaWatson" },
                    { 10, "chris.hemsworth@outlook.com", "thorlove", "profile9.jpg", "Customer", "ChrisHemsworth" }
                });

            migrationBuilder.InsertData(
                table: "Carts",
                columns: new[] { "CartId", "UserId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 4 },
                    { 5, 5 },
                    { 6, 6 },
                    { 7, 7 },
                    { 8, 8 },
                    { 9, 9 },
                    { 10, 10 }
                });

            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "OrderId", "OrderDate", "UserId" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 7, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 1 },
                    { 2, new DateTime(2023, 7, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 2 },
                    { 3, new DateTime(2023, 7, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), 3 },
                    { 4, new DateTime(2023, 7, 21, 0, 0, 0, 0, DateTimeKind.Unspecified), 4 },
                    { 5, new DateTime(2023, 7, 23, 0, 0, 0, 0, DateTimeKind.Unspecified), 5 },
                    { 6, new DateTime(2023, 7, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 6 },
                    { 7, new DateTime(2023, 7, 26, 0, 0, 0, 0, DateTimeKind.Unspecified), 7 },
                    { 8, new DateTime(2023, 7, 27, 0, 0, 0, 0, DateTimeKind.Unspecified), 8 },
                    { 9, new DateTime(2023, 7, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 9 },
                    { 10, new DateTime(2023, 7, 29, 0, 0, 0, 0, DateTimeKind.Unspecified), 10 }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "ItemID", "CartId", "ProductID", "Quantity" },
                values: new object[,]
                {
                    { 1, 1, 1, 2 },
                    { 2, 2, 3, 1 },
                    { 3, 3, 5, 3 },
                    { 4, 4, 7, 2 },
                    { 5, 5, 9, 1 },
                    { 6, 6, 11, 4 },
                    { 7, 7, 13, 2 },
                    { 8, 8, 15, 3 },
                    { 9, 9, 17, 1 },
                    { 10, 10, 19, 5 },
                    { 11, 1, 2, 1 },
                    { 12, 2, 4, 2 },
                    { 13, 3, 6, 1 },
                    { 14, 4, 8, 3 },
                    { 15, 5, 10, 2 },
                    { 16, 6, 12, 4 },
                    { 17, 7, 14, 1 },
                    { 18, 8, 16, 2 },
                    { 19, 9, 18, 3 },
                    { 20, 10, 20, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartProduct_ProductsProductId",
                table: "CartProduct",
                column: "ProductsProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Carts_UserId",
                table: "Carts",
                column: "UserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Items_CartId",
                table: "Items",
                column: "CartId");

            migrationBuilder.CreateIndex(
                name: "IX_Items_ProductID",
                table: "Items",
                column: "ProductID");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProduct_ProductsProductId",
                table: "OrderProduct",
                column: "ProductsProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartProduct");

            migrationBuilder.DropTable(
                name: "Items");

            migrationBuilder.DropTable(
                name: "OrderProduct");

            migrationBuilder.DropTable(
                name: "Carts");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
