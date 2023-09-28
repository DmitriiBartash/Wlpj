using Microsoft.Identity.Client;
using Microsoft.VisualBasic;

namespace LandingPage.Models
{
	public class Country
	{
		public string CountryName { get; set; }
		public IFormFile[] FormFiles { get; set; }
		public string Tags { get; set; }
	}
}
