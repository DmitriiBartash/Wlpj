using LandingPage.Data;
using LandingPage.Models;
using Microsoft.EntityFrameworkCore;

namespace LandingPage.Utils
{
	public static class Functions
	{
		public static SwiperMiniModel generateCountriesData(DatabaseContext _context, Dictionary<string, int> _countryCodes, Dictionary<string, string> _icons, StrCountry selectedCountry)
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

			// somehow get all the tags
			// first need to split them by '|' and only then by ','
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
					if (i++ == _countryCodes[selectedCountry.selectedLanguage])
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
				model.countriesData.Add(countryNames.ElementAt(i).Split("|")[_countryCodes[selectedCountry.selectedLanguage]], countryIds.ElementAt(i));
			}
			foreach (var photo in photoPaths)
			{
				model.picturePathsChosen.Add(photo);
			}
			int j = 0;
			foreach (var tagAndIcon in tagsFinal)
			{
				TagsAndIcons tagsAndIcons = new() { tag = tagAndIcon, icon = _icons[tagsForIcons[j++]] };
				model.tags.Add(tagsAndIcons);
			}

			//ViewBag.SelectedCountry = selectedCountry.countryID;


			return model;
		}



		public static List<CountryNoPics> generateAdminCountriesData(DatabaseContext _context, Dictionary<string, string> _icons)
		{
			List<CountryNoPics> model = new();

			HashSet<string> countryNames = new();
			HashSet<int> countryIds = new();
			HashSet<string> countryTags = new();

			// get all values 
			var items = _context.swiperModels.ToList<SwiperModel>();

			// sort them by alphabetic ascending order
			items.Sort((s1, s2) => s1.CountryName.CompareTo(s2.CountryName));

			// save countryNames array
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
			int i = 0;
			foreach (int id in countryIds)
			{
				CountryNoPics countryNoPics = new();
				var firstItem = items.First(model => model.ID == id);
				countryNoPics.ID = id;
				countryNoPics.Name = firstItem.CountryName.Split("|")[0];
				countryNoPics.Tags = new();
				countryNoPics.PriceEuro = firstItem.PriceEuro;
				countryNoPics.PriceUsd = firstItem.PriceUsd;


				// somehow get all the tags
				// first need to split them by '|' and only then by ','
				string tagsRaw = _context.swiperModels.Where(country => country.CountryName == firstItem.CountryName)
					.Select(s => s.Tags)
					.First<string>();

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
				model.Add(countryNoPics);
			}

			return model;
		}
	}
}
