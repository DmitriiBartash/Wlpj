using LandingPage.Data;
using LandingPage.Models;
using Microsoft.AspNetCore.Mvc;

namespace LandingPage.Controllers
{
	public class HomeController : Controller
	{
		private readonly DatabaseContext _context;
		public readonly Dictionary<string, int> CountryCodes;
		public readonly Dictionary<string, string> Icons;

		public HomeController(DatabaseContext context)
		{
			_context = context;
			CountryCodes = new() {
				{ "Ru", 0 },
				{ "Eng", 1 },
				{ "Ro", 2 } };

			Icons = new() {
				{"Перелёт,Flight,Zbor",
					"1.Plane.svg"
				},
				{"Трансфер,Transfer,Transfer",
					"2.Transfer.svg"
				},
				{"Проживание,Residence,Cazare",
					"3.Residence.svg"
				},
				{"Питание согласно концепции отеля,Meals according to the hotel concept,Mese conform conceptului hotelului",
					"4.Food.svg"
				},
				{"Медицинская страховка,Medical insurance,Asigurare medicala",
					"5.Medical insurance.svg"
				}
			};
		}

		public IActionResult Index()
		{
			// default shall be Russian 
			HashSet<string> countryNames = new();
			HashSet<int> countryIds = new();

			// get all values 
			var items = _context.swiperModels.ToList<SwiperModel>();

			// sort them by alphabetic ascending order
			items.Sort((s1, s2) => s1.CountryName.CompareTo(s2.CountryName));

			// for each item in DB populate countryNames array
			foreach (var item in items)
			{
				int previousCount = countryNames.Count;
				countryNames.Add(item.CountryName);
				int currentCount = countryNames.Count;
				if (previousCount != currentCount)
				{
					countryIds.Add(item.ID);
				}
			}

			// find all photoPaths which have the same first Country
			var firstItem = countryNames.First();
			ViewBag.SelectedCountry = items.Find(item => item.CountryName == firstItem).ID;
			// somehow get all the tags
			// first need to divide them by | and only then by ,
			string tagsRaw = _context.swiperModels.Where(country => country.CountryName == firstItem)
				.Select(s => s.Tags)
				.First<string>();

			List<string> tagsFinal = new();
			List<string> tagsForIcons = tagsRaw.Split("|").ToList();
			foreach (var tag in tagsForIcons)
			{
				int i = 0;
				foreach (var miniTag in tag.Split(","))
				{
					if (i++ == 0)
					{
						tagsFinal.Add(miniTag);
					}
				}
			}

			// iterate through the loop and grab all items that have the same Country
			var photoPaths = _context.swiperModels.Where(country => country.CountryName == firstItem)
				.Select(s => s.PathToPicture)
				.ToList();

			// populate 
			SwiperMiniModel model = new() { countriesData = new(), picturePathsChosen = new(), tags = new() };

			for (int i = 0; i < countryNames.Count; i++)
			{
				model.countriesData.Add(countryNames.ElementAt(i).Split("|")[0], countryIds.ElementAt(i));
			}
			foreach (var photo in photoPaths)
			{
				model.picturePathsChosen.Add(photo);
			}
			int j = 0;
			foreach (var tagAndIcon in tagsFinal)
			{
				TagsAndIcons tagsAndIcons = new() { tag = tagAndIcon, icon = Icons[tagsForIcons[j++]] };
				model.tags.Add(tagsAndIcons);
			}

			// Set the ViewBag property
			ViewBag.SwiperViewModel = model;
			ViewBag.ReviewModel = _context.reviewModels;

			return View();
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
			HashSet<string> countryNames = new();
			HashSet<int> countryIds = new();

			// get all values 
			var items = _context.swiperModels.ToList<SwiperModel>();

			// sort them by alphabetic ascending order
			items.Sort((s1, s2) => s1.CountryName.CompareTo(s2.CountryName));

			// for each item in DB populate countryNames array
			foreach (var item in items)
			{
				int previousCount = countryNames.Count;
				countryNames.Add(item.CountryName);
				int currentCount = countryNames.Count;
				if (previousCount != currentCount)
				{
					countryIds.Add(item.ID);
				}
			}

			// find all photoPaths which have the same first Country
			// find the country data by the ID
			var firstItem = items.First(model => model.ID == Convert.ToInt32(selectedCountry.countryID));
			ViewBag.SelectedCountry = selectedCountry.countryID;

			// somehow get all the tags
			// first need to divide them by | and only then by ,
			string tagsRaw = _context.swiperModels.Where(country => country.CountryName == firstItem.CountryName)
				.Select(s => s.Tags)
				.First<string>();

			List<string> tagsFinal = new();
			List<string> tagsForIcons = tagsRaw.Split("|").ToList();
			foreach (var tag in tagsForIcons)
			{
				int i = 0;
				foreach (var miniTag in tag.Split(","))
				{
					if (i++ == CountryCodes[selectedCountry.selectedLanguage])
					{
						tagsFinal.Add(miniTag);
					}
				}
			}

			// iterate through the loop and grab all items that have the same Country
			var photoPaths = _context.swiperModels.Where(country => country.CountryName == firstItem.CountryName)
				.Select(s => s.PathToPicture)
				.ToList();

			// populate 
			SwiperMiniModel model = new() { countriesData = new(), picturePathsChosen = new(), tags = new() };

			for (int i = 0; i < countryNames.Count; i++)
			{
				model.countriesData.Add(countryNames.ElementAt(i).Split("|")[CountryCodes[selectedCountry.selectedLanguage]], countryIds.ElementAt(i));
			}
			foreach (var photo in photoPaths)
			{
				model.picturePathsChosen.Add(photo);
			}
			int j = 0;
			foreach (var tagAndIcon in tagsFinal)
			{
				TagsAndIcons tagsAndIcons = new() { tag = tagAndIcon, icon = Icons[tagsForIcons[j++]] };
				model.tags.Add(tagsAndIcons);
			}

			return PartialView("_Swiper", model);
		}

		public class StrCountry
		{
			public string countryID { get; set; }
			public string selectedLanguage { get; set; }
		}
	}
}