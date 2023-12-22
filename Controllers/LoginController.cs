using LandingPage.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;

namespace LandingPage.Controllers
{
	// redo the security
	public class LoginController : Controller
	{
		[HttpGet]
		public async Task<IActionResult> Index()
		{
			ClaimsPrincipal claimuser = HttpContext.User;

			HashAlgorithm algorithm = new SHA256Managed();

			if (claimuser.Identity.IsAuthenticated)
			{
				return RedirectToAction("Index", "Home");
			}
			return View();
		}

		[HttpPost]
		public async Task<IActionResult> Login(AdminModel userdetails)
		{
			if (userdetails.Login == "Admin" && userdetails.Password == "Admin")
			{
				List<Claim> claims = new List<Claim>()
				{
					new(ClaimTypes.NameIdentifier,userdetails.Login)
				};
				ClaimsIdentity claimsIdentity = new(claims, CookieAuthenticationDefaults.AuthenticationScheme);

				AuthenticationProperties properties = new() { AllowRefresh = true, IsPersistent = true };

				await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new(claimsIdentity), properties);

				return RedirectToAction("Index", "Home");
			}
			return View("Index");
		}

		public async Task<IActionResult> LogOut()
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			return RedirectToAction("Index", "Home");
		}
	}
}
