namespace LandingPage.Models
{
	public class SwiperMiniModel
	{
		public Dictionary<string, int> countriesData { get; set; }
		public List<string> picturePathsChosen { get; set; }
		public List<TagsAndIcons> tags { get; set; }

	}

	public class TagsAndIcons
	{
		public string tag { get; set; }
		public string icon { get; set; }
	}
}
