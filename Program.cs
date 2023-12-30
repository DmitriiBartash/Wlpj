using LandingPage.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using LandingPage.Utils;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.RateLimiting;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");

builder.Services.AddHttpsRedirection(options =>
{
	options.RedirectStatusCode = StatusCodes.Status307TemporaryRedirect;
	options.HttpsPort = 5001;
});

builder.Services.AddRateLimiter(options => options.AddFixedWindowLimiter(policyName: "fixed", options =>
{
	options.PermitLimit = 4;
	options.Window = TimeSpan.FromSeconds(12);
	options.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
	options.QueueLimit = 2;
}));

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
	.AddCookie(options =>
{
	options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
	options.Cookie.HttpOnly = true;
	options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
	options.Cookie.SameSite = SameSiteMode.Strict;
	options.LoginPath = "/Login/Index";
	options.LogoutPath = "/Login/LogOut";
});

builder.Services.AddDbContext<DatabaseContext>(Options =>
{
	Options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// dependency injection
CountryCodes countryCodes = new();
Icons icons = new();
builder.Services.AddSingleton<CountryCodes>(countryCodes);
builder.Services.AddSingleton<Icons>(icons);

var app = builder.Build();

app.UseRateLimiter();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}

static string GetTicks() => (DateTime.Now.Ticks & 0x11111).ToString("00000");


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();