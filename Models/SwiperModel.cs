using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace LandingPage.Models
{
	public class SwiperModel
	{
		[Key]
		public int ID { get; set; }
		public string CountryName { get; set; }
		public string Tags { get; set; }
		[DataType(DataType.Currency)]
		public float PriceUsd { get; set; }
		[DataType(DataType.Currency)]
		public float PriceEuro { get; set; }
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
