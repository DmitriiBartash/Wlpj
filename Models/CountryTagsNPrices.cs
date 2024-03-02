namespace LandingPage.Models
{
	public class CountryTagsNPrices
	{
		public int ID { get; set; }
		public string CountryName{ get; set; }
		public List<TagsAndIcons> Tags { get; set; }
		public int Price { get; set; }
		public string Currency { get; set; }
	}
}
