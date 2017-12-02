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
    public class TestTasks
    {

        List<Models.Task> taskList = new List<Models.Task>();

        // method used to generate fake List of valid data
        private List<Models.Task> GenerateFakeDataList()
        {
            List<Models.Task> workingList = new List<Models.Task>();
            for (int i = 1; i < 4; i++)
            {

                Models.Task nextTask = new Models.Task();

                nextTask.id = i;
                nextTask.subject = "My test Task" + i;
                nextTask.list_id = i; 
                workingList.Add(nextTask);
            }
            return workingList;
        }

        [TestMethod]
        public void GetAllFakeTasks_ShouldReturnAllTasks()
        {
            List<Models.Task> testTasks = GenerateFakeDataList();
            var controller = new TaskController(testTasks); // use 1 of 2 constructors

            var result = controller.GetTasks() as List<Models.Task>;
            Assert.AreEqual(testTasks.Count, result.Count);

        }

        [TestMethod]
        public void GetAllMySQLTasks_ShouldReturnAllTasks()
        {           
            List<Models.Task> testTasks = GenerateFakeDataList();
            var controller = new TaskController(); // use the other constructor

            var result = controller.GetTasks() as List<Models.Task>;
            Assert.AreEqual(3, result.Count);
        }

        [TestMethod]
        // first test local logic, using fake data
        public void GetFakeTask_ShouldReturnParticularTask()
        {
            List<Models.Task> testTasks = GenerateFakeDataList();
            var controller = new TaskController(testTasks); // use 1 of 2 constructors

            IHttpActionResult result = controller.GetTask(2);
            var contentResult = result as OkNegotiatedContentResult<Models.Task>;

            Assert.AreEqual(testTasks[1].id, contentResult.Content.id);

        }

        [TestMethod]
        public void GetMySQLTask_ShouldReturnParticularTask()
        {
            List<Models.Task> testTasks = GenerateFakeDataList();
            var controller = new TaskController(); // use 1 of 2 constructors

            IHttpActionResult result = controller.GetTask(3);
            var contentResult = result as OkNegotiatedContentResult<Models.Task>;

            Assert.AreEqual(testTasks[2].id, contentResult.Content.id);

        }

        [TestMethod]
        public void GetMySqlTask_DeleteReturnsOk()
        {
            List<Models.Task> testTasks = GenerateFakeDataList();                 
            var taskController = new TaskController();
            Models.Task testTask = new Models.Task();
            testTask.subject = "test task";
            testTask.list_id = 3; 

            IHttpActionResult result = taskController.SaveTask(testTask);
            var contentResult = result as OkNegotiatedContentResult<Models.Task>;
            testTask.id = contentResult.Content.id; 

            HttpResponseMessage deleteOK = taskController.DeleteTask(testTask);
            var returnsOK = false;
            if (deleteOK.StatusCode == HttpStatusCode.OK)
            {
                returnsOK = true;
            };
            // Assert
            Assert.IsTrue(returnsOK);
        }

        [TestMethod]
        public void GetMySqlTask_VerifySavedTask()
        {
            var controller = new TaskController();
            Models.Task testTask = new Models.Task();
            testTask.subject = "test task";            
            testTask.list_id = 3;

            IHttpActionResult result = controller.SaveTask(testTask);
            var contentResult = result as OkNegotiatedContentResult<Models.Task>;
            testTask.id = contentResult.Content.id;

            IHttpActionResult verifyTask = controller.GetTask(testTask.id);
            var verifyResult = verifyTask as OkNegotiatedContentResult<Models.Task>;

            controller.DeleteTask(testTask);
            // Assert
            Assert.AreEqual(contentResult.Content.subject, verifyResult.Content.subject);
        }
    }
}
