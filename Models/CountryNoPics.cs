namespace LandingPage.Models
{
	public class CountryNoPics
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public List<TagsAndIcons> Tags { get; set; }
		public float PriceUsd { get; set; }
		public float PriceEuro { get; set; }
	}
}
