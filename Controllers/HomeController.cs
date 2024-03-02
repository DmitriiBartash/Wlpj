using LandingPage.Data;
using LandingPage.Models;
using LandingPage.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

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
			var items = _context.swiperModels.ToList<SwiperModel>();

			// sort them by alphabetic ascending order
			if (items.Count != 0)
			{
				items.Sort((s1, s2) => s1.CountryName.CompareTo(s2.CountryName));

				var actualModel = Functions.generateCountriesData(_context, _countryCodes, _icons, new() { countryID = items[0].ID.ToString(), selectedLanguage = "Ru" });

				ViewBag.SelectedCountry = items.Find(item => item.CountryName == items[0].CountryName).ID;
				ViewBag.SwiperViewModel = actualModel;
				ViewBag.ReviewModel = _context.reviewModels;
				return View();
			}
			return View();
		}

		[HttpPost]
		[EnableRateLimiting("fixed")]
		public IActionResult AddUserDetails([FromBody] CallBackMiniModel callBackModel)
		{
			CallBackModel _callBackModel = new()
			{
				CreationDate = DateTime.Now,
				NameSurname = callBackModel.NameSurname,
				PhoneNumber = callBackModel.PhoneNumber,
			};
			_context.callBackModels.Add(_callBackModel);
			_context.SaveChanges();
			return RedirectToAction("Index");
		}

		[HttpPost]
		public PartialViewResult LoadSwiper([FromBody] StrCountry selectedCountry)
		{
			var model = Functions.generateCountriesData(_context, _countryCodes, _icons, selectedCountry);

			ViewBag.SelectedCountry = selectedCountry.countryID;

			if (selectedCountry.selectedLanguage == "Ru")
			{
				ViewBag.PriceIncludes = "Цена включает:";
			}
			else if (selectedCountry.selectedLanguage == "Ro")
			{
				ViewBag.PriceIncludes = "Prețul include:";
			}
			else if (selectedCountry.selectedLanguage == "Eng")
			{
				ViewBag.PriceIncludes = "Price includes:";
			}

			return PartialView("_Swiper", model);
		}

		[HttpPost]
		public PartialViewResult LoadSecondSwiper([FromBody] StrCountry selectedCountry)
		{
			var model = Functions.generateCountriesData(_context, _countryCodes, _icons, selectedCountry);

			ViewBag.SelectedCountry = selectedCountry.countryID;

			if (selectedCountry.selectedLanguage == "Ru")
			{
				ViewBag.PriceIncludes = "Цена включает:";
			}
			else if (selectedCountry.selectedLanguage == "Ro")
			{
				ViewBag.PriceIncludes = "Prețul include:";
			}
			else if (selectedCountry.selectedLanguage == "Eng")
			{
				ViewBag.PriceIncludes = "Price includes:";
			}
			return PartialView("_FirstSwiper", model);
		}
	}
}