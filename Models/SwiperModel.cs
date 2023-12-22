using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace LandingPage.Models
{
	public class SwiperModel
	{
		[Key]
		public int ID { get; set; }
		public string CountryName { get; set; }
		public string Tags { get; set; }
		public int Price { get; set; }
		public string Currency { get; set; }
	}

	public class SwiperImagesAndPictures
	{
		[Key]
		public int ID { get; set; }
		public int CountryID { get; set; }
		[MaybeNull]
		public string PathToPicture { get; set; }
	}


}
