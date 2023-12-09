namespace LandingPage.Models
{
	public class CountryTagsNPrices
	{
		public int ID { get; set; }	
		public List<TagsAndIcons> Tags { get; set; }
		public double PriceUsd { get; set; }
		public double PriceEuro { get; set; }
	}
}
