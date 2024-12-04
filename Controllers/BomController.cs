using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using System.Text.Json;

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
        private readonly IMongoCollection<Variant> _variantCollection;

        public BomController(IMongoDatabase database)
        {
            _bomCollection = database.GetCollection<BOM>("BOMS");
            _bindingSocketCollection = database.GetCollection<BindingSocket>("bindingSocket");
            _variantCollection = database.GetCollection<Variant>("variants");
        }

        [HttpGet]
        public async Task<ActionResult<List<BOM>>> GetAllBoms()
        {
            var boms = await _bomCollection.Find(_ => true).ToListAsync();
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
        public async Task<ActionResult<List<BOMComponent>>> GetBomSuppliersById(string bomId)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            var bom = await _bomCollection.Find(filter).FirstOrDefaultAsync();
            return Ok(bom.components);
        }

        //[HttpGet("{bomId}")]
        //public async Task<ActionResult<BindingSocket[]>> GetComponents(string bomId)
        //{
        //    var componentsList = new List<BindingSocket>();

        //    var filter = Builders<BOM>.Filter.Eq("_id", bomId);

        //    var bom = await _bomCollection.Find(filter).FirstOrDefaultAsync();

        //    if(bom != null)
        //    {
        //        foreach(var id in bom.componentIDs)
        //        {
        //            var filter2 = Builders<BindingSocket>.Filter.Eq("_id", ObjectId.Parse(id));

        //            var socket = await _bindingSocketCollection.Find(filter2).FirstOrDefaultAsync();

        //            componentsList.Add(socket);
        //        }
        //    }

        //    return Ok(componentsList);
        //}


        [HttpPut("{bomId}")]
        public async Task<IActionResult> UpdateBOM(string bomId, [FromBody] BOM updatedBom)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", ObjectId.Parse(bomId));
            var existingBom = await _bomCollection.Find(filter).FirstOrDefaultAsync();
            if (existingBom != null)
            {
                existingBom.selected = updatedBom.selected;
                existingBom.bom_id = updatedBom.bom_id;
                existingBom.project_name = updatedBom.project_name;
                existingBom.project_ds = updatedBom.project_ds;
                existingBom.project_dg = updatedBom.project_dg;
                existingBom.equipment_name = updatedBom.equipment_name;
                existingBom.variant = updatedBom.variant;
                existingBom.sets = updatedBom.sets;
                existingBom.created_by = updatedBom.created_by;
                existingBom.created_date = updatedBom.created_date;
                existingBom.components = updatedBom.components;
               

                await _bomCollection.ReplaceOneAsync(filter, existingBom);
                return Ok();
            }
            return NotFound();
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

        [HttpPost]
        public async Task<ActionResult> SetSelectedSupplierToBOMProduct([FromQuery] string productId, [FromQuery] string selectedSupplier, [FromQuery] string bomId)
        {
            // Filter to find the BOM document containing the specific component
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            var bom = _bomCollection.Find(filter).FirstOrDefault();

            foreach(var component in bom.components)
            {
                if(productId == component.componentId)
                {
                    component.selectedSupplier = selectedSupplier;
                }
            }

            await _bomCollection.ReplaceOneAsync(filter, bom);
            return Ok();
        }



        [HttpPost]
        public async Task<ActionResult> SetQuantityToBOMProduct([FromQuery] string productId, [FromQuery] string bomId, [FromQuery] int quantity)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            var bom = _bomCollection.Find(filter).FirstOrDefault();

            foreach (var component in bom.components)
            {
                if (productId == component.componentId)
                {
                    component.quantity = quantity;
                }
            }

            await _bomCollection.ReplaceOneAsync(filter, bom);
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> CreateVariant([FromQuery] string bomId, [FromQuery] string variantName)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            var bom = _bomCollection.Find(filter).FirstOrDefault();

            var variant = new Variant()
            {
                name = variantName,
                parent_id = bomId
            };

            foreach(var component in bom.components)
            {
                var variantComponent = new VariantComponent();
                variantComponent.componentId = component.componentId;
                variantComponent.quantity = 0;
                variant.components.Add(variantComponent);
            }

            await _variantCollection.InsertOneAsync(variant);

            return Ok();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
