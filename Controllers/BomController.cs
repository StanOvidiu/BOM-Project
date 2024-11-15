using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
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
        private readonly IMongoCollection<BindingSocket> _bindingSocketCollection;

        public BomController(IMongoDatabase database)
        {
            _bomCollection = database.GetCollection<BOM>("BOMS");
            _bindingSocketCollection = database.GetCollection<BindingSocket>("bindingSocket");
        }

        [HttpGet]
        public async Task<ActionResult<List<BOM>>> GetAllBoms()
        {
            var boms = await _bomCollection.Find(_ => true).ToListAsync();
            var x = 1;
            return Ok(boms);
        }

        [HttpGet("{bomId}")]
        public async Task<ActionResult<BOM>> GetBomById(string bomId)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            var bom = await _bomCollection.Find(filter).FirstOrDefaultAsync();
            return Ok(bom);
        }

        [HttpGet("{bomId}")]
        public async Task<ActionResult<BindingSocket[]>> GetComponents(string bomId)
        {
            var componentsList = new List<BindingSocket>();

            var filter = Builders<BOM>.Filter.Eq("_id", bomId);

            var bom = await _bomCollection.Find(filter).FirstOrDefaultAsync();

            if(bom != null)
            {
                foreach(var id in bom.componentIDs)
                {
                    var filter2 = Builders<BindingSocket>.Filter.Eq("_id", ObjectId.Parse(id));

                    var socket = await _bindingSocketCollection.Find(filter2).FirstOrDefaultAsync();

                    componentsList.Add(socket);
                }
            }

            return Ok(componentsList);
        }

        [HttpPost("{bomId}")]
        public async Task<ActionResult> SelectAsDefault(string bomId)
        {
            var filter = Builders<BOM>.Filter.Eq("selected", true);

            var bom = _bomCollection.Find(filter).FirstOrDefault();

            if (bom != null)
            {
                bom.selected = false;
                await _bomCollection.ReplaceOneAsync(filter, bom);
            }

            filter = Builders<BOM>.Filter.Eq("_id", bomId);

            bom = _bomCollection.Find(filter).FirstOrDefault();

            if (bom != null)
            {
                bom.selected = true;
                await _bomCollection.ReplaceOneAsync(filter, bom);
                return Ok();
            }
            return NotFound();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
