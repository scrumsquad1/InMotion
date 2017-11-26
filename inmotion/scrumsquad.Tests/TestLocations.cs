using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Threading.Tasks;

using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Web.Http;  // had to grab the .dll by browsing in "Add reference" to scrumsquad

using inmotion.Controllers;
using inmotion.Models;
using System.Web.Http.Results;
namespace scrumsquad.Tests
{
    [TestClass]
    public class TestLocations
    {
        
        List<Location> locationList = new List<Location>();

        // method used to generate fake List of valid data
        private List<Location> GenerateFakeDataList()
        {
            List<Location> workingList = new List<Location>();
            double theLat = 48.5;
            double theLng = 124.23;
            for (int i = 0; i < 3; i++)
            {

                Location nextLocation = new Location();

                nextLocation.id = i;
                nextLocation.lat = theLat + .10;
                nextLocation.lng = theLng + .10;
                workingList.Add(nextLocation);
            }
            return workingList;
        }

        [TestMethod]
        public void GetAllFakeLocations_ShouldReturnAllLocations()
        {
            List<Location> testLocations = GenerateFakeDataList();
            var controller = new LocationController(testLocations); // use 1 of 2 constructors

            var result = controller.GetLocationList() as List<Location>;
            Assert.AreEqual(testLocations.Count, result.Count);

        }

        [TestMethod]
        public void GetAllMySQLLocations_ShouldReturnAllLocations()
        {    
            List<Location> testLocations = GenerateFakeDataList();
            var controller = new LocationController(); // use the other constructor

            var result = controller.GetLocationList() as List<Location>;
            Assert.AreEqual(34, result.Count);
        }

        [TestMethod]
        // first test local logic, using fake data
        public void GetFakeLocation_ShouldReturnParticularLocation()
        {
            List<Location> testLocations = GenerateFakeDataList();
            var controller = new LocationController(testLocations); // use 1 of 2 constructors

            IHttpActionResult result = controller.GetLocation(2);
            var contentResult = result as OkNegotiatedContentResult<Location>;

            Assert.AreEqual(testLocations[2].id, contentResult.Content.id);

        }

        [TestMethod]
        public void GetMySQLLocation_ShouldReturnParticularLocation()
        {
            List<Location> testLocations = GenerateFakeDataList();
            var controller = new LocationController(); // use 1 of 2 constructors

            IHttpActionResult result = controller.GetLocation(2);
            var contentResult = result as OkNegotiatedContentResult<Location>;

            Assert.AreEqual(testLocations[0].lat, contentResult.Content.lat);

        }

        [TestMethod]
        public void GetMySqlLocation_DeleteReturnsOk()
        {
            // Arrange
            List<Location> testNotes = GenerateFakeDataList();
            var controller = new LocationController();
            var listController = new ListController(); 
            Location location = new Location();
            location.lat = 48.7;
            location.lng = 124.43;

            IHttpActionResult result = controller.SaveLocation(location);
            var contentResult = result as OkNegotiatedContentResult<Location>;
            location.id = contentResult.Content.id;

            List list = new List();
            list.name = "test list";
            list.location_id = location.id; 

            HttpResponseMessage deleteOK = controller.DeleteLocation(list);
            // associated list should be deleted automatically
            // listController.DeleteList(list);
            var returnsOK = false;
            if (deleteOK.StatusCode == HttpStatusCode.OK)
            {
                returnsOK = true;
            };           
            // Assert
            Assert.IsTrue(returnsOK);
        }

        [TestMethod]
        public void GetMySqlLocation_VerifySavedLocation()
        {
            List<Location> testLocations = GenerateFakeDataList();
            var controller = new LocationController();
            Location location = new Location();
            location.lat = 48.7;
            location.lng = 124.43;

            IHttpActionResult result = controller.SaveLocation(location);
            var contentResult = result as OkNegotiatedContentResult<Location>;
            location.id = contentResult.Content.id;

            List list = new List();
            list.name = "test list";
            list.location_id = location.id;

            IHttpActionResult verifyNote = controller.GetLocation(location.id);
            var verifyResult = verifyNote as OkNegotiatedContentResult<Location>;

            controller.DeleteLocation(list);
            // Assert
            Assert.AreEqual(contentResult.Content.lat, verifyResult.Content.lat);
        }

    }
}
