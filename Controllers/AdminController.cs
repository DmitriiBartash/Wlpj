using LandingPage.Data;
using LandingPage.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace LandingPage.Controllers
{
	[Authorize]
	public class AdminController : Controller
	{
		private readonly DatabaseContext _context;
		public AdminController(DatabaseContext context)
		{
			_context = context;
		}

		public IActionResult Index()
		{
			return View();
		}

		// REVIEWS
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
		public IActionResult ReviewAdd(ReviewModel reviewModel)
		{
			_context.reviewModels.Add(reviewModel);
			_context.SaveChanges();

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


		// CALLS
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

		// COUNTRIES
		[HttpGet]
		public IActionResult CountryAdd()
		{
			return View();
		}

		[HttpPut]
		public IActionResult CountryAdd([FromForm] IFormCollection country)
		{
			string countryEn = country["CountryName"][0].Split("|")[1];
			string[] items = country["tags"][0].Split("|");

			foreach (var photo in country.Files)
			{
				//Get the destination file path.
				var absoluteRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "content", "img_for_swiper");

				string absoluteFilePath, relativeFilePath;

				int randomNumber = new Random((int)(DateTime.Now.Ticks - DateTime.UnixEpoch.Ticks)).Next();

				absoluteFilePath = Path.Combine(absoluteRootPath, $"{countryEn.Normalize()}_{randomNumber}.jpg");
				relativeFilePath = $"/content/img_for_swiper/{countryEn.Normalize()}_{randomNumber}.jpg";

				// Create a new file stream to the destination file path.
				using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
				{
					// Copy the picture file to the destination file stream.
					photo.CopyTo(fileStream);
				}
				_context.swiperModels.Add(new() { CountryName = country["CountryName"][0], Tags = country["tags"][0], PathToPicture = relativeFilePath });
			}
			_context.SaveChanges();
			return Ok();
		}

		//[HttpPost]
		//public IActionResult CountryAdd(IFormFileCollection photos, [FromForm] string CountryName, [FromForm] string Tags)
		//{
		//	foreach (var photo in photos)
		//	{
		//		//Get the destination file path.
		//		var absoluteRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "content", "img_for_swiper");

		//		string absoluteFilePath, relativeFilePath;

		//		int randomNumber = new Random((int)(DateTime.Now.Ticks - DateTime.UnixEpoch.Ticks)).Next();

		//		absoluteFilePath = Path.Combine(absoluteRootPath, $"{CountryName.Normalize()}_{randomNumber}.jpg");
		//		relativeFilePath = $"/content/img_for_swiper/{CountryName.Normalize()}_{randomNumber}.jpg";

		//		// Create a new file stream to the destination file path.
		//		using (var fileStream = new FileStream(absoluteFilePath, FileMode.Create))
		//		{
		//			// Copy the picture file to the destination file stream.
		//			photo.CopyTo(fileStream);
		//		}

		//		//_context.swiperModels.Add(new() { CountryName = CountryName, Tags = Tags, PathToPicture = relativeFilePath });
		//		_context.SaveChanges();
		//	}
		//	return View();
		//}

		[HttpGet]
		public IActionResult ListCountries()
		{
			return View(_context.swiperModels);
		}
	}
}
