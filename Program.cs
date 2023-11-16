using LandingPage.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using LandingPage.Utils;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
	.AddCookie(options =>
{
	options.LoginPath = "/Login/Index";
	options.LogoutPath = "/Login/LogOut";
	options.Cookie.HttpOnly = true;
	options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
	options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
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

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Home/Error");
	// The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
	app.UseHsts();
}


app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapDefaultControllerRoute();

app.Run();