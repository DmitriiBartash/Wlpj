namespace LandingPage.Utils
{
	public class Icons
	{
		public readonly Dictionary<string, string> value;

		public Icons()
		{
			value = new Dictionary<string, string>
			{
				{
					"Перелёт,Flight,Zbor",
					"1.Plane.svg"
				},
				{
					"Трансфер,Transfer,Transfer",
					"2.Transfer.svg"
				},
				{
					"Проживание,Residence,Cazare",
					"3.Residence.svg"
				},
				{
					"Питание согласно концепции отеля,Meals according to the hotel concept,Mese conform conceptului hotelului",
					"4.Food.svg"
				},
				{
					"Медицинская страховка,Medical insurance,Asigurare medicala",
					"5.Medical insurance.svg"
				}
			};
		}
	}
}