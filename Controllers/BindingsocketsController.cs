using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
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
    public class BindingsocketsController : Controller
    {
        private readonly IMongoCollection<BindingSocket> _bindingSocketsCollection;
        private readonly IMongoCollection<BOM> _bomCollection;
        private readonly IMongoCollection<Variant> _variantCollection;

        public BindingsocketsController(IMongoDatabase database)
        {
            _bindingSocketsCollection = database.GetCollection<BindingSocket>("bindingSocket");
            _bomCollection = database.GetCollection<BOM>("BOMS");
            _variantCollection = database.GetCollection<Variant>("variants");
        }

        [HttpPost]
        public async Task<ActionResult<BindingSocket>> CreateBindingSocket([FromBody] BindingSocket bindingSocket)
        {
            await _bindingSocketsCollection.InsertOneAsync(bindingSocket);
            return Ok(bindingSocket);
        }

        [HttpGet]
        public async Task<ActionResult<List<BindingSocket>>> GetBindingSockets([FromQuery] string subcategory)
        {
            var filter = Builders<BindingSocket>.Filter.Eq("subcategory", subcategory);
            var result = await _bindingSocketsCollection.Find(filter).ToListAsync();

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<BindingSocket>>> GetBindingSocketsForSearch([FromQuery] string text, [FromQuery] string subcategory)
        {
            if (!string.IsNullOrEmpty(text))
            {
                var filter = Builders<BindingSocket>.Filter.Or(
                        Builders<BindingSocket>.Filter.Regex(bs => bs.name, new BsonRegularExpression(text, "i")),
                        Builders<BindingSocket>.Filter.Regex(bs => bs.size, new BsonRegularExpression(text, "i")),
                        Builders<BindingSocket>.Filter.Regex(bs => bs.color, new BsonRegularExpression(text, "i")),
                        Builders<BindingSocket>.Filter.Regex(bs => bs.mpn, new BsonRegularExpression(text, "i")),
                        Builders<BindingSocket>.Filter.Regex(bs => bs.details, new BsonRegularExpression(text, "i"))
                );

                var result = await _bindingSocketsCollection.Find(filter).ToListAsync();
                return Ok(result);
            }
            else
            {
                var allSockets = await _bindingSocketsCollection.Find(_ => true).ToListAsync();
                return Ok(allSockets);
            }
        }

        [HttpGet]
        public async Task<ActionResult<BindingSocket>> GetBindingSocket(string bindingsocketId)
        {
            var filter = Builders<BindingSocket>.Filter.Eq("_id", ObjectId.Parse(bindingsocketId));
            var bindingSocket = await _bindingSocketsCollection.Find(filter).FirstOrDefaultAsync();
            if (bindingSocket != null)
                return Ok(bindingSocket);
            return NotFound();
        }

        [HttpDelete("{bindingsocketId}")]
        public async Task<IActionResult> DeleteBindingSocket(string bindingsocketId)
        {
            var filter = Builders<BindingSocket>.Filter.Eq("_id", ObjectId.Parse(bindingsocketId));
            await _bindingSocketsCollection.DeleteOneAsync(filter);
            return Ok();
        }

        [HttpPut("{bindingsocketId}")]
        public async Task<IActionResult> UpdateBindingSocket(string bindingsocketId, [FromBody] BindingSocket updatedBindingSocket)
        {
            var filter = Builders<BindingSocket>.Filter.Eq("_id", ObjectId.Parse(bindingsocketId));
            var existingBindingSocket = await _bindingSocketsCollection.Find(filter).FirstOrDefaultAsync();
            if (existingBindingSocket != null)
            {
                existingBindingSocket.name = updatedBindingSocket.name;
                existingBindingSocket.size = updatedBindingSocket.size;
                existingBindingSocket.color = updatedBindingSocket.color;
                existingBindingSocket.mpn = updatedBindingSocket.mpn;
                existingBindingSocket.priceMin = updatedBindingSocket.priceMin;
                existingBindingSocket.details = updatedBindingSocket.details;
                existingBindingSocket.project = updatedBindingSocket.project;
                existingBindingSocket.stock = updatedBindingSocket.stock;
                existingBindingSocket.producer = updatedBindingSocket.producer;
                existingBindingSocket.image = updatedBindingSocket.image;
                existingBindingSocket.selectedsupplier = updatedBindingSocket.selectedsupplier;

                await _bindingSocketsCollection.ReplaceOneAsync(filter, existingBindingSocket);
                return Ok();
            }
            return NotFound();
        }

        [HttpPost("{socketId}")]
        public async Task<ActionResult> AddBOM(string socketID)
        {
            var filter = Builders<BOM>.Filter.Eq("selected", true);
            try
            {
                var bom = _bomCollection.Find(filter).FirstOrDefault();
                if (bom != null)
                {
                    ActionResult<BindingSocket> result = await GetBindingSocket(socketID);
                    BindingSocket socket = new BindingSocket();

                    if(result.Result is OkObjectResult okResult)
                    {
                        socket = (BindingSocket)okResult.Value;
                    }

                    BOMComponent component = new BOMComponent
                    {
                        componentId = socket._id,
                        image = socket.image,
                        name = socket.name,
                        suppliers = socket.producer
                    };

                    bom.components.Add(component);

                    await _bomCollection.ReplaceOneAsync(filter, bom);

                    await AddComponentToVariants(bom, socket);

                    return Ok();
                }
            } catch(Exception e)
            {

            }
            return NotFound();
        }

        [NonAction]
        public async Task AddComponentToVariants(BOM bom, BindingSocket socket)
        {
            var filter = Builders<Variant>.Filter.Eq("parent_id", bom._id);

            VariantComponent component = new VariantComponent
            {
                componentId = socket._id,
                quantity = 0
            };

            var update = Builders<Variant>.Update.AddToSet("components", component);

            await _variantCollection.UpdateManyAsync(filter, update);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
