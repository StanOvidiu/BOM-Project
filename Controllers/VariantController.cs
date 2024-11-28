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
    public class VariantController : Controller
    {
        private readonly IMongoCollection<Variant> _variantCollection;

        public VariantController(IMongoDatabase database)
        {
            _variantCollection = database.GetCollection<Variant>("variants");
        }

        [HttpGet]
        public async Task<ActionResult<List<Variant>>> GetVariantsForSpecificBOM([FromQuery] string bomId)
        {
            var filter = Builders<Variant>.Filter.Eq("parent_id", bomId);
            List<Variant> variants = await _variantCollection.Find(filter).ToListAsync();

            return Ok(variants);
        }

        [HttpPost]
        public async Task<ActionResult> SetQuantityToVariantProduct([FromQuery] string variantId, [FromQuery] string componentId, [FromQuery] int quantity)
        {
            var filter = Builders<Variant>.Filter.Eq("_id", variantId);
            var variant = _variantCollection.Find(filter).FirstOrDefault();

            foreach(var component in variant.components)
            {
                if (component.componentId == componentId)
                    component.quantity = quantity;
            }

            await _variantCollection.ReplaceOneAsync(filter, variant);
            return Ok();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
