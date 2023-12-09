using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Data
{
	public class DatabaseContext : DbContext
	{
		public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

		public DatabaseContext() { }

		public DbSet<SwiperModel> swiperModels { get; set; }
		public DbSet<SwiperImagesAndPictures> swiperImagesAndPictures { get; set; }
		public DbSet<CallBackModel> callBackModels { get; set; }
		public DbSet<ReviewModel> reviewModels { get; set; }

	}
}

