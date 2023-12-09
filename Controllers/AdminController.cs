using LandingPage.Data;
using LandingPage.Models;
using LandingPage.Utils;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace LandingPage.Controllers
{
	//[Authorize]
	public class AdminController : Controller
	{
		private readonly DatabaseContext _context;
		private readonly string absoluteRootPath;
		public readonly Dictionary<string, int> _countryCodes;
		public readonly Dictionary<string, string> _icons;

		public readonly string[] tagsList;

		public AdminController(DatabaseContext context, CountryCodes countryCodes, Icons icons)
		{
			_context = context;
			_countryCodes = countryCodes.value;
			_icons = icons.value;
			tagsList = new string[]
			{
				"Перелёт,Flight,Zbor",
				"Трансфер,Transfer,Transfer",
				"Проживание,Residence,Cazare",
				"Питание согласно концепции отеля,Meals according to the hotel concept,Mese conform conceptului hotelului",
				"Медицинская страховка,Medical insurance,Asigurare medicala"
			};

			//Get the destination file path.
			absoluteRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "content", "img_for_swiper");
		}

		public IActionResult Index()
		{
			return View();
		}

		#region REVIEWS
		[HttpGet]
		public IActionResult Reviews()
		{
			return View(_context.reviewModels);
		}

		[HttpGet]
		public IActionResult ReviewAdd()
		{
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> ReviewAdd(ReviewModel reviewModel)
		{
			_context.reviewModels.Add(reviewModel);
			await _context.SaveChangesAsync();

			return View("Reviews", _context.reviewModels);
		}

		[HttpGet]
		public IActionResult ReviewDelete(int id)
		{
			var review = _context.reviewModels.Find(id);
			_context.reviewModels.Remove(review);
			_context.SaveChanges();
			return View("Reviews", _context.reviewModels);
		}

		[HttpGet]
		public IActionResult ReviewEdit(int id)
		{
			var review = _context.reviewModels.Find(id);
			return View(review);
		}

		[HttpPost]
		public IActionResult ReviewEdit(ReviewModel reviewModel)
		{
			var _review = _context.reviewModels.Find(reviewModel.Id);
			_review.Review = reviewModel.Review;
			_review.Person = reviewModel.Person;

			_context.SaveChanges();
			return View("Reviews", _context.reviewModels);
		}
		#endregion

		#region CALLS
		[HttpGet]
		public IActionResult DeleteCall(int id)
		{
			_context.callBackModels.Remove(_context.callBackModels.Find(id));
			_context.SaveChanges();

			return View("Calls", _context.callBackModels);
		}

		[HttpGet]
		public IActionResult Calls()
		{
			return View(_context.callBackModels);
		}
		#endregion

		#region COUNTRIES
		[HttpGet]
		public IActionResult Countries()
		{
			// default shall be Russian 
			var model = Functions.generateAdminCountriesData(_context, _icons);

			// iterate through the loop and grab all items that have the same Country
			if (model.Count > 0)
			{
				var photoPaths = _context.swiperImagesAndPictures
					.Where(country => country.CountryID == model[0].ID)
					.ToList();

				CountryTagsNPrices countryTagsNPrices = new()
				{
					ID = model[0].ID,
					Tags = model[0].Tags,
					PriceEuro = model[0].PriceEuro,
					PriceUsd = model[0].PriceUsd
				};

				ViewBag.Images = photoPaths;
				ViewBag.Countries = model;
				ViewBag.TagsNPrices = countryTagsNPrices;
			}
			else
			{
				ViewBag.Images = null;
				ViewBag.Countries = null;
				ViewBag.TagsNPrices = null;
			}

			return View();
		}

		[HttpPost]
		public PartialViewResult LoadImages([FromBody] int selectedCountry)
		{
			// get the country's name 
			var name = _context.swiperModels.Find(selectedCountry);

			var photoPaths = _context.swiperImagesAndPictures
				.Where(country => country.CountryID == name.ID)
				.ToList();

			return PartialView("_AdminCountryImages", photoPaths);
		}

		[HttpPut]
		public PartialViewResult LoadImages([FromForm] IFormCollection country)
		{
			string absoluteFilePath, relativeFilePath;

			int id = Convert.ToInt32(country["Id"]);
			var countryModel = _context.swiperModels.Find(id);
			string countryEn = countryModel!.CountryName.Split("|")[2];

			foreach (var photo in country.Files)
			{
				int randomNumber = new Random((int)(DateTime.Now.Ticks - DateTime.UnixEpoch.Ticks)).Next();

				absoluteFilePath = Path.Combine(absoluteRootPath, $"{countryEn.Normalize()}_{randomNumber}.jpg");
				relativeFilePath = $"/content/img_for_swiper/{countryEn.Normalize()}_{randomNumber}.jpg";

				// Create a new file stream to the destination file path.
				using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
				{
					// Copy the picture file to the destination file stream.
					photo.CopyTo(fileStream);
				}

				SwiperImagesAndPictures swiperImagesAndPictures = new() { CountryID = id, PathToPicture = relativeFilePath };
				_context.swiperImagesAndPictures.Add(swiperImagesAndPictures);
			}
			_context.SaveChanges();

			// iterate through the loop and grab all items that have the same Country
			var photoPaths = _context.swiperImagesAndPictures.Where(country => country.CountryID == id)
				.ToList();

			return PartialView("_AdminCountryImages", photoPaths);
		}

		[HttpPost]
		public PartialViewResult DeleteImage([FromBody] PicturePath data)
		{
			var countryModel = _context.swiperImagesAndPictures.Find(data.pictureID);

			// change the name
			string pattern = "\\content\\img_for_swiper";
			string trimmed = absoluteRootPath.Replace(pattern, "");

			var withoutFirst = countryModel.PathToPicture.Skip(1).ToList();
			StringBuilder stringBuilder = new();
			for (int i = 0; i < withoutFirst.Count; i++)
			{
				stringBuilder.Append(withoutFirst[i]);
			}

			string absoluteFilePath = Path.Combine(trimmed, stringBuilder.ToString());

			_context.swiperImagesAndPictures.Remove(countryModel);
			_context.SaveChanges();

			if (System.IO.File.Exists((absoluteFilePath)))
			{
				System.IO.File.Delete(absoluteFilePath);
			}

			// iterate through the loop and grab all items that have the same Country
			var photoPaths = _context.swiperImagesAndPictures.Where(country => country.CountryID == countryModel.CountryID)
				.ToList();

			return PartialView("_AdminCountryImages", photoPaths);
		}

		[HttpPost]
		public PartialViewResult LoadTags([FromBody] int selectedCountry)
		{
			// get the country's name 
			var name = _context.swiperModels.Find(selectedCountry);

			CountryNoPics countryNoPics = new();
			countryNoPics.Tags = new();

			// first need to split them by '|' and only then by ','
			string tagsRaw = name.Tags;

			List<string> tagsFinal = new();
			List<string> tagsForIcons = tagsRaw.Split("|").ToList();
			int j = 0;
			for (int k = 0; k < tagsForIcons.Count; k++)
			{
				tagsFinal.Add(tagsForIcons[k].Split(",")[0]);
				var tagToSearch = tagsForIcons[k].Split(",")[0];
				if (tagsForIcons[k].Contains('\n'))
				{
					tagsForIcons[j] = tagsForIcons[k][..^1];
				}
				TagsAndIcons tagsAndIcons = new() { tag = tagToSearch, icon = _icons[tagsForIcons[j++]] };
				countryNoPics.Tags.Add(tagsAndIcons);
			}


			CountryTagsNPrices countryTagsNPrices = new()
			{
				Tags = countryNoPics.Tags,
				PriceEuro = name.PriceEuro,
				PriceUsd = name.PriceUsd
			};

			ViewBag.ID = selectedCountry;
			return PartialView("_AdminCountryTagsNPrices", countryTagsNPrices);
		}


		[HttpPost]
		public PartialViewResult LoadPopUp([FromBody] int selectedCountry)
		{
			// get the country's name 
			var country = _context.swiperModels.Find(selectedCountry);

			bool[] ifPresent = new bool[5] { false, false, false, false, false };

			foreach (var tag in country.Tags.Split("|"))
			{
				for (int i = 0; i < 5; i++)
				{
					if (tag == tagsList[i])
					{
						ifPresent[i] = true;
					}
				}
			}
			CountryFull countryFull = new()
			{
				Id = selectedCountry,
				Name = country.CountryName,
				ifTagsPresent = ifPresent,
				PriceEuro = country.PriceEuro,
				PriceUsd = country.PriceUsd
			};

			// compare tags 
			// 0-	fly
			// 1-   transfer
			// 2-	accommodation
			// 3-	nutrition
			// 4-	insurance
			// if the tag is not present, mark as false

			return PartialView("_AdminPopUp", countryFull);
		}

		[HttpPost]
		public PartialViewResult SubmitPoster([FromBody] CountryFull countryFull)
		{
			var country = _context.swiperModels.Find(countryFull.Id);

			// assemble the tags 
			int i = 0;
			string assembledTags = "";
			StringBuilder stringBuilder = new();
			foreach (var item in countryFull.ifTagsPresent)
			{
				if (item)
				{
					stringBuilder.Append(tagsList[i]);
					stringBuilder.Append('|');
				}
				i++;
			}
			stringBuilder.Remove(stringBuilder.Length - 1, 1);
			assembledTags = stringBuilder.ToString();

			// update the db entry
			country!.Tags = assembledTags;
			country.CountryName = countryFull.Name;
			country.PriceEuro = (float)Convert.ToDouble(countryFull.PriceEuro);
			country.PriceUsd = (float)Convert.ToDouble(countryFull.PriceUsd);
			_context.SaveChanges();


			CountryNoPics countryNoPics = new();
			countryNoPics.Tags = new();

			// first need to split them by '|' and only then by ','
			string tagsRaw = country.Tags;

			List<string> tagsFinal = new();
			List<string> tagsForIcons = tagsRaw.Split("|").ToList();
			int j = 0;
			for (int k = 0; k < tagsForIcons.Count; k++)
			{
				tagsFinal.Add(tagsForIcons[k].Split(",")[0]);
				var tagToSearch = tagsForIcons[k].Split(",")[0];
				if (tagsForIcons[k].Contains('\n'))
				{
					tagsForIcons[j] = tagsForIcons[k][..^1];
				}
				TagsAndIcons tagsAndIcons = new() { tag = tagToSearch, icon = _icons[tagsForIcons[j++]] };
				countryNoPics.Tags.Add(tagsAndIcons);
			}

			CountryTagsNPrices countryTagsNPrices = new()
			{
				Tags = countryNoPics.Tags,
				PriceEuro = country.PriceEuro,
				PriceUsd = country.PriceUsd
			};

			ViewBag.ID = countryFull.Id;
			return PartialView("_AdminCountryTagsNPrices", countryTagsNPrices);
		}

		[HttpPost]
		public IActionResult CountryAdd([FromBody] CountryFull countryFull)
		{
			SwiperModel country = new();
			// assemble the tags 
			int i = 0;
			StringBuilder stringBuilder = new();
			foreach (var item in countryFull.ifTagsPresent)
			{
				if (item)
				{
					stringBuilder.Append(tagsList[i]);
					stringBuilder.Append('|');
				}
				i++;
			}
			stringBuilder.Remove(stringBuilder.Length - 1, 1);
			string assembledTags = stringBuilder.ToString();

			// update the db entry
			country.Tags = assembledTags;
			country.CountryName = countryFull.Name;
			country.PriceEuro = (float)Convert.ToDouble(countryFull.PriceEuro);
			country.PriceUsd = (float)Convert.ToDouble(countryFull.PriceUsd);
			_context.swiperModels.Add(country);
			_context.SaveChanges();


			CountryNoPics countryNoPics = new();
			countryNoPics.Tags = new();

			// first need to split them by '|' and only then by ','
			string tagsRaw = country.Tags;

			List<string> tagsFinal = new();
			List<string> tagsForIcons = tagsRaw.Split("|").ToList();
			int j = 0;
			for (int k = 0; k < tagsForIcons.Count; k++)
			{
				tagsFinal.Add(tagsForIcons[k].Split(",")[0]);
				var tagToSearch = tagsForIcons[k].Split(",")[0];
				if (tagsForIcons[k].Contains('\n'))
				{
					tagsForIcons[j] = tagsForIcons[k][..^1];
				}
				TagsAndIcons tagsAndIcons = new() { tag = tagToSearch, icon = _icons[tagsForIcons[j++]] };
				countryNoPics.Tags.Add(tagsAndIcons);
			}


			CountryTagsNPrices countryTagsNPrices = new()
			{
				Tags = countryNoPics.Tags,
				PriceEuro = country.PriceEuro,
				PriceUsd = country.PriceUsd
			};

			ViewBag.ID = countryFull.Id;

			return PartialView("_AdminCountryTagsNPrices", countryTagsNPrices);
		}

		[HttpPost]
		public IActionResult ListCountries([FromBody] string data)
		{
			var countries = _context.swiperModels.Select(s => new ExtraMinCountryModel() { ID = s.ID, Name = s.CountryName }).ToList();

			foreach (var country in countries)
			{
				if (country.Name.Split("|").Length > 1)
				{
					country.Name = country.Name.Split("|")[0];
				}
			}

			return PartialView("_AdminCountries", countries);
		}
		#endregion
	}
}
