using LandingPage.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.RateLimiting;

namespace LandingPage.Controllers
{
	public class LoginController : Controller
	{
		[HttpGet]
		public async Task<IActionResult> Index()
		{
			if (HttpContext.User.Identity.IsAuthenticated)
			{
				return RedirectToAction("Index", "Home");
			}
			return View();
		}

		[HttpPost]
		[EnableRateLimiting("fixed")]
		public async Task<IActionResult> Login(AdminModel userdetails)
		{
			// https://jasonwatmore.com/post/2022/01/16/net-6-hash-and-verify-passwords-with-bcrypt
			string passwordHash = "$2a$11$MFUFQl6VLOLB.5VkC8SAluVGFyeELpvop8qP1T5wlOzYspqX5VbWW";

			bool verified = BCrypt.Net.BCrypt.Verify(userdetails.Password, passwordHash);

			if (userdetails.Login == "Admin" && verified)
			{
				List<Claim> claims = new()
				{
					new(ClaimTypes.NameIdentifier,userdetails.Login)
				};
				ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);

				AuthenticationProperties properties = new() { AllowRefresh = true, IsPersistent = false };

				await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new(claimsIdentity), properties);

				return RedirectToAction("Index", "Admin");
			}
			return View("Index");
		}

		public async Task<IActionResult> Logout()
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			return RedirectToAction("Index", "Home");
		}
	}
}
