using System.ComponentModel.DataAnnotations;

namespace LandingPage.Models
{
    public class SwiperModel
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string CountryName { get; set; }
        [Required]
        public string PathToPicture { get; set; }
        [Required]
        public string Tags { get; set; }
    }
}
