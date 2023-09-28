using LandingPage.Data;
using LandingPage.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace LandingPage.Controllers
{
    public class Basic : Controller
    {
        private DatabaseContext db;
        public Basic(DatabaseContext ggg)
        {
            db = ggg;
        }
        // GET: Basic
        public ActionResult Index()
        {
            //Anime fff = new Anime();
            //fff.Name = "Asfd";
            //fff.Grade = 4;
            //db.Animes.Add(fff);
            //db.SaveChanges();
            return View();
        }

        // GET: Basic/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Basic/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Basic/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Basic/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Basic/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Basic/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Basic/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
