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
using iTextSharp.text;
using iTextSharp.text.pdf;
using System.IO;

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

        [HttpGet("{bomId}")]
        public async Task<ActionResult> DownloadReport(string bomId)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            var bom = _bomCollection.Find(filter).FirstOrDefault();

            using (MemoryStream stream = new MemoryStream())
            {
                Document document = new Document();
                PdfWriter writer = PdfWriter.GetInstance(document, stream);
                document.Open();

                Font titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 16);

                document.Add(new Paragraph($"Bill Of Materials for {bom.project_name}", titleFont));
                document.Add(new Paragraph($"Equipment Name: {bom.equipment_name}", FontFactory.GetFont(FontFactory.HELVETICA_BOLD,12)));
                document.Add(new Paragraph($"Project DS: {bom.project_ds}", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)));
                document.Add(new Paragraph($"Project DG: {bom.project_dg}", FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12)));
                document.Add(new Paragraph("\n"));

                PdfPTable table = new PdfPTable(3);
                table.AddCell("Component Name");
                table.AddCell("Supplier");
                table.AddCell("Quantity");

                foreach (var component in bom.components)
                {
                    table.AddCell(component.name);
                    table.AddCell(component.selectedSupplier ?? "N/A");
                    table.AddCell(component.quantity.ToString());
                }

                document.Add(table);
                document.Close();

                return File(stream.ToArray(), "application/pdf", $"BOM_Report_{bom.project_name}.pdf");
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateBOM([FromQuery] string name)
        {
            BOM bom = new BOM();

            bom.project_name = name;

            await _bomCollection.InsertOneAsync(bom);

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteBOM([FromQuery] string bomId)
        {
            var filter = Builders<BOM>.Filter.Eq("_id", bomId);
            await _bomCollection.DeleteOneAsync(filter);
            return Ok();
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
