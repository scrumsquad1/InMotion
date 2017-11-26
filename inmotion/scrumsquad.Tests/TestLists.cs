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

namespace inmotion.Tests
{
    [TestClass]
    public class TestLists
    {

        List<List> listOfList = new List<List>();

        // method used to generate fake List of valid data
        private List<List> GenerateFakeDataList()
        {
            List<List> workingList = new List<List>();           
            for (int i = 1; i < 4; i++)
            {

                List nextList = new List();

                nextList.id = i;
                nextList.name = "testList " + i; 
                nextList.location_id = i;
                workingList.Add(nextList);
            }
            return workingList;
        }

        [TestMethod]
        public void GetAllFakeLists_ShouldReturnAllLists()
        {
            List<List> testLists = GenerateFakeDataList();
            var controller = new ListController(testLists); // use 1 of 2 constructors

            var result = controller.GetLists() as List<List>;
            Assert.AreEqual(testLists.Count, result.Count);

        }

        [TestMethod]
        public void GetAllMySQLLists_ShouldReturnAllLists()
        {
            // need to modify Controller to point to NotesTest
            List<List> testLists = GenerateFakeDataList();
            var controller = new ListController(); // use the other constructor

            var result = controller.GetLists() as List<List>;
            Assert.AreEqual(2, result.Count);
        }

        [TestMethod]
        // first test local logic, using fake data
        public void GetFakeList_ShouldReturnParticularList()
        {
            List<List> testLists = GenerateFakeDataList();
            var controller = new ListController(testLists); // use 1 of 2 constructors

            IHttpActionResult result = controller.GetList(3);
            var contentResult = result as OkNegotiatedContentResult<List>;

            Assert.AreEqual(testLists[2].id, contentResult.Content.id);

        }

        [TestMethod]
        public void GetMySQLList_ShouldReturnParticularList()
        {
            List<List> testLists = GenerateFakeDataList();
            var controller = new ListController(); // use 1 of 2 constructors

            IHttpActionResult result = controller.GetList(3);
            var contentResult = result as OkNegotiatedContentResult<List>;

            Assert.AreEqual(testLists[2].id, contentResult.Content.id);

        }

        [TestMethod]
        public void GetMySqlList_DeleteReturnsOk()
        {
            // Arrange          
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

            IHttpActionResult resultList = listController.SaveList(list);
            var listContentResult = resultList as OkNegotiatedContentResult<List>;
            

            HttpResponseMessage deleteOK = listController.DeleteList(list);
            controller.DeleteLocation(list); 
            var returnsOK = false;
            if (deleteOK.StatusCode == HttpStatusCode.OK)
            {
                returnsOK = true;
            };
            // Assert
            Assert.IsTrue(returnsOK);
        }

        [TestMethod]
        public void GetMySqlList_VerifySavedList()
        {
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

            IHttpActionResult resultList = listController.SaveList(list);
            var listContentResult = resultList as OkNegotiatedContentResult<List>;

            IHttpActionResult verifyList = listController.GetList(listContentResult.Content.id);
            var verifyResult = verifyList as OkNegotiatedContentResult<List>;

            controller.DeleteLocation(list);
            // Assert
            Assert.AreEqual(listContentResult.Content.name, verifyResult.Content.name);
        }
    }
}
