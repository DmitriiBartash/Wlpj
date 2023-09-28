using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace LandingPage.Models
{
    public class FullDataModel
    {
        [Key]
        public int id { get; set; }
        public ICollection<CallBackModel> Callbacks { get; set; }
        public ICollection<SwiperModel> Swiper { get; set; }
    }
}
