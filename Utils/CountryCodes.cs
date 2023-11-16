namespace LandingPage.Utils
{
	public class CountryCodes
	{
		public readonly Dictionary<string, int> value;

		public CountryCodes()
		{
			value = new Dictionary<string, int>
		{
				{ "Ru", 0 },
				{ "Eng", 1 },
				{ "Ro", 2 } };
		}
	}
}
