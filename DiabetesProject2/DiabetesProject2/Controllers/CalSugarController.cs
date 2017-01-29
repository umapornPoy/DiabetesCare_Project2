using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DiabetesProject2.Controllers
{
    public class CalSugarController : Controller
    {
        // GET: CalSugar
        public ActionResult CalSugar()
        {
            return View();
        }

        public ActionResult AddFood()
        {
            return View();
        }
    }
}