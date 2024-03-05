using LandingPage.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace LandingPage.Controllers
{
	public class LoginController : Controller
	{
		[HttpGet]
		public IActionResult Index()
		{
			if (HttpContext.User.Identity.IsAuthenticated)
			{
				return RedirectToAction("Index", "Home");
			}
			return View();
		}

		[HttpPost]
		[EnableRateLimiting("longerBan")]
		public IActionResult Login(AdminModel userdetails)
		{
			if (ModelState.IsValid)
			{
				// https://jasonwatmore.com/post/2022/01/16/net-6-hash-and-verify-passwords-with-bcrypt
				string passwordHash = "$2a$11$vtO1nAKaxpuOmxkHuXe2x.vEI5po9PWuOUtNTVoPxppKzxRp5QerW";

				bool verified = BCrypt.Net.BCrypt.Verify(userdetails.Password, passwordHash);

				if (userdetails.Login == "emirat.travel@gmail.com" && verified)
				{
					List<Claim> claims = new()
					{
						new(ClaimTypes.NameIdentifier,userdetails.Login)
					};
					ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);

					AuthenticationProperties properties = new() { AllowRefresh = true, IsPersistent = false };

					HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new(claimsIdentity), properties);

					return RedirectToAction("Index", "Admin47");
				}
				return View("Index");
			}
			else { return View("Index"); }

		}

		public IActionResult Logout()
		{
			HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			return RedirectToAction("Index", "Home");
		}
	}
}
