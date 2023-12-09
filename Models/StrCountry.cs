namespace LandingPage.Models
{
	public class StrCountry
	{
		public string countryID { get; set; }
		public string selectedLanguage { get; set; }
	}

	public class PicturePath
	{
		public int countryID { get; set; }
		public int pictureID { get; set; }
		public string picturePath { get; set; }
	}

}
