//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using MovieStore_API.Data;
//using Microsoft.IdentityModel.Tokens;
//using System.Text;


//namespace MovieStore_API
//{
//    public class Program
//    {
//        public static void Main(string[] args)
//        {

//            var builder = WebApplication.CreateBuilder(args);

//            builder.Configuration.AddUserSecrets<Program>();

//            builder.Services.AddControllers();

//            builder.Services.AddEndpointsApiExplorer();
//            builder.Services.AddSwaggerGen();


//            builder.Services.AddDbContext<MovieStoreDbContext>(options =>
//            {
//                options.UseMySql(builder.Configuration.GetConnectionString("movie_store-db"),
//                    new MySqlServerVersion(new Version(8, 0, 26)));
//            });

//            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//                .AddJwtBearer(options =>
//                {
//                    options.TokenValidationParameters = new TokenValidationParameters
//                    {
//                        ValidateIssuer = true,
//                        ValidateAudience = true,
//                        ValidateLifetime = true,
//                        ValidateIssuerSigningKey = true,
//                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
//                        ValidAudience = builder.Configuration["Jwt:Audience"],
//                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
//                    };
//                });

//            var app = builder.Build();


//            app.UseCors(builder => builder
//                .AllowAnyOrigin()
//                .AllowAnyMethod()
//                .AllowAnyHeader());

//            if (app.Environment.IsDevelopment())
//            {
//                app.UseSwagger();
//                app.UseSwaggerUI();
//            }

//            app.UseHttpsRedirection();
//            app.UseAuthentication();
//            app.UseAuthorization();

//            app.MapControllers();

//            app.Run();
//        }
//    }
//}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MovieStore_API.Data;
using System.Text;

namespace MovieStore_API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Load configurations from User Secrets
            builder.Configuration.AddUserSecrets<Program>();

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Use connection string from User Secrets
            builder.Services.AddDbContext<MovieStoreDbContext>(options =>
            {
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                new MySqlServerVersion(new Version(8, 0, 29)));
            });

            // Set up JWT Authentication using User Secrets
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]))
                    };
                });

            var app = builder.Build();

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}