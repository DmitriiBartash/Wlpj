using System.ComponentModel.DataAnnotations;

namespace LandingPage.Models
{
    public class CallBackModel
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string NameSurname { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}
