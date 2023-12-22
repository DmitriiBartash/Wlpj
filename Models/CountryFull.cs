using System.ComponentModel.DataAnnotations;

namespace LandingPage.Models
{
	public class CountryFull
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public bool[] ifTagsPresent { get; set; }
		public int Price { get; set; }
		public string Currency { get; set; }
	}
}
