using System.ComponentModel.DataAnnotations;

namespace LandingPage.Models
{
	public class ReviewModel
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Person { get; set; }
		[Required]
		public string Review { get; set; }
	}
}
