using HajosTeszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HajosTeszt.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class BoatController : ControllerBase
    {
        [HttpGet]
        [Route("questions/all")]
        public ActionResult M1()
        {
            HajostesztContext context = new HajostesztContext();
            var kérdések = from x in context.Questions select x.QuestionText;

            return new JsonResult(kérdések);
        }

        [HttpGet]
        [Route("questions/{sorszam}")]
        public ActionResult M2(int sorszam)
        {
            HajostesztContext context = new HajostesztContext();
            var kerdes = (from x in context.Questions
                          where x.QuestionId == sorszam
                          select x).FirstOrDefault();

            if (kerdes == null) return BadRequest("Nincs ilyen sorszamu kerdes");
            return new JsonResult(kerdes);
        }

        [HttpGet]
        [Route("questions/mind")]
        public ActionResult M3()
        {
            HajostesztContext context = new HajostesztContext();
            var osszSzam = (from x in context.Questions
                            select x).Count();
            return new JsonResult(osszSzam);
        }

        [HttpGet]
        [Route("questions/count")]
        public int M4() //Tetszőleges metódusnév
        {
            HajostesztContext context = new HajostesztContext();
            int kérdésekSzáma = context.Questions.Count();

            return kérdésekSzáma;
        }
    }
}
