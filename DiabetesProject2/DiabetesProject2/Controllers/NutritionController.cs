using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiabetesProject2.Controllers
{
    public class NutritionController : Controller
    {
        // GET: Nutrition
        public ActionResult Nutrients()
        {
            return View();
        }
    }
}