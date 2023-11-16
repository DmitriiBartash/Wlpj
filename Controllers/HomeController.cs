using LandingPage.Data;
using LandingPage.Models;
using LandingPage.Utils;
using Microsoft.AspNetCore.Mvc;

namespace LandingPage.Controllers
{
	public class HomeController : Controller
	{
		private readonly DatabaseContext _context;
		public readonly Dictionary<string, int> _countryCodes;
		public readonly Dictionary<string, string> _icons;

		public HomeController(DatabaseContext context, CountryCodes countryCodes, Icons icons)
		{
			_context = context;
			_countryCodes = countryCodes.value;
			_icons = icons.value;
		}

		public IActionResult Index()
		{
			// default shall be Russian 
			// MUST RETURN TO BACK
			//var items = _context.swiperModels.ToList<SwiperModel>();

			//// sort them by alphabetic ascending order
			//items.Sort((s1, s2) => s1.CountryName.CompareTo(s2.CountryName));

			//var actualModel = Functions.generateCountriesData(_context, _countryCodes, _icons, new() { countryID = items[0].ID.ToString(), selectedLanguage = "Ru" });

			//ViewBag.SelectedCountry = items.Find(item => item.CountryName == items[0].CountryName).ID;
			//ViewBag.SwiperViewModel = actualModel;
			//ViewBag.ReviewModel = _context.reviewModels;

			return RedirectToAction("Countries","Admin");
		}

		[HttpPost]
		public IActionResult AddUserDetails(CallBackModel callBackModel)
		{
			// validate the data 
			_context.callBackModels.Add(callBackModel);
			_context.SaveChanges();
			return RedirectToAction("Index");
		}

		[HttpPost]
		public PartialViewResult LoadSwiper([FromBody] StrCountry selectedCountry)
		{
			var model = Functions.generateCountriesData(_context, _countryCodes, _icons, selectedCountry);

			ViewBag.SelectedCountry = selectedCountry.countryID;

			return PartialView("_Swiper", model);
		}
	}
}