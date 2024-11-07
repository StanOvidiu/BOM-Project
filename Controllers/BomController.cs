using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    [EnableCors("AllowSpecificOrigin")]
    public class BomController : Controller
    {
        private readonly IMongoCollection<BOM> _bomCollection;

        public BomController(IMongoDatabase database)
        {
            _bomCollection = database.GetCollection<BOM>("BOMS");
        }

        [HttpGet]
        public async Task<ActionResult<List<BOM>>> GetAllBoms()
        {
            var boms = await _bomCollection.Find(_ => true).ToListAsync();
            return Ok(boms);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
