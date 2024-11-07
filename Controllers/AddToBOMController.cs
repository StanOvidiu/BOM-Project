using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;
using MongoDB.Driver;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api/bindingsockets")]
    public class AddToBOMController : Controller
    {
        public List<BindingSocket> sockets = new List<BindingSocket>();

        public IMongoCollection<BindingSocket> _database;

        public AddToBOMController(IMongoDatabase database)
        {
            _database = database.GetCollection<BindingSocket>("bindingSocket");
        }

        [HttpPost("addBOM")]
        public async Task<IActionResult> AddBOM([FromQuery] string socketID)
        {
            // Build the query
            var filter = Builders<BindingSocket>.Filter.Eq("_id", socketID);

            // Execute the query to find the BindingSocket
            var bindingSocket = await _database.Find(filter).FirstOrDefaultAsync();

            if (bindingSocket == null)
            {
                return NotFound($"BindingSocket with ID {socketID} not found.");
            }

            // Add the found BindingSocket to the list
            sockets.Add(bindingSocket);

            // Print the name (or other property) of the BindingSocket to console
            Console.WriteLine(bindingSocket.name);

            // Return the list of BindingSocket objects in the response
            return Ok(sockets);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
