using LandingPage.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using LandingPage.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;
using Microsoft.Extensions.Options;
using AspNetCoreRateLimit;

// Create builder
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add antiforgery
builder.Services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");

// Add https redirection
builder.Services.AddHttpsRedirection(options =>
{
	options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
	options.HttpsPort = 5001;
});

// Configure rate limiter for login attempts
// 3 attempts and then 60 min ban
// might remove it
builder.Services.AddRateLimiter(options => options.AddFixedWindowLimiter(policyName: "fixed", _ =>
{
	_.PermitLimit = 3;
	_.Window = TimeSpan.FromMinutes(60);
}));

// Configure cookies
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
{
	options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
	options.Cookie.HttpOnly = true;
	options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
	options.Cookie.SameSite = SameSiteMode.Strict;
	options.LoginPath = "/Login/Index";
	options.LogoutPath = "/Login/LogOut";
});

// Coonect DB
builder.Services.AddDbContext<DatabaseContext>(Options =>
{
	Options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add web optimizer for bundling and minifier
builder.Services.AddWebOptimizer(pipeline =>
{
	pipeline.AddCssBundle("/css/bundledMain.css", "/css/mainpage.css", "/css/header.css", "/css/aboutus.css", "/css/callrequest.css", "/css/testimonials.css", "/css/findus.css", "/css/footer.css", "/css/animations.css", "/css/Animation.css", "/css/slider.css");

	pipeline.AddJavaScriptBundle("/js/bundledMain.js", "/js/languagesChange.js", "/js/SelectCountry.js", "/js/script.js", "/js/swiper.js", "/js/scrolling.js", "/js/validateForm.js");
});

// Dependency injection
CountryCodes countryCodes = new();
Icons icons = new();
builder.Services.AddSingleton<CountryCodes>(countryCodes);
builder.Services.AddSingleton<Icons>(icons);

// Build app
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

// Hook middleware
app.UseHttpsRedirection();
app.UseWebOptimizer();
app.UseStaticFiles();

app.UseRouting();
app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();