using System.ComponentModel.DataAnnotations;

namespace LandingPage.Models
{
	public class CountryFull
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public bool[] ifTagsPresent { get; set; }
		public double PriceUsd { get; set; }
		public double PriceEuro { get; set; }
	}
}
