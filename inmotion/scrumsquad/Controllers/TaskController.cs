using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inmotion.Models;
using MySql.Data.MySqlClient;

namespace inmotion.Controllers
{
    public class TaskController : ApiController
    {

        bool testing = false;
        List<Task> taskList = new List<Task>();
        // add default controller for normal opperation
        public TaskController()
        {
            testing = false;
        }

        // add controller that lets you pass in a fake db for testing
        public TaskController(List<Task> FakeDataList)
        {
            taskList = FakeDataList;
            testing = true;
        }

        //List<Location> locationList = new List<Location>();
        [HttpGet]
        public IHttpActionResult GetTask(int id)  // make sure its string
        {
            if (!testing)
            {
                taskList = GetTasks();
            }

            var task = taskList.FirstOrDefault((p) => p.id == id);

            if (task == null)
                return NotFound();

            return Ok(task);

        }

        public List<Task> GetTasks()
        {
            if (!testing)
            {              
                new BasicQuery(new MySqlCommand("SELECT * FROM tasks"), (reader) =>
                 {
                     taskList.Add(new Task
                     {
                         id = reader.GetInt32(0),
                         subject = reader.GetString(1),                        
                         list_id = reader.GetInt32(2)
                     });
                 });       
            }
            
            return taskList;
        }

        [HttpDelete]
        public HttpResponseMessage DeleteTask(Task passedTask)
        {
            bool found = false;
            MySqlCommand cmd = new MySqlCommand("DELETE FROM tasks WHERE tasks.id=@id");
            cmd.Parameters.Add(new MySqlParameter("@id", passedTask.id));

            new BasicNonQuery(cmd, (rowsAffected) =>
            {
                found = rowsAffected >= 1;
            });

            if (!found)
               return new HttpResponseMessage(HttpStatusCode.BadRequest);
            else
               return new HttpResponseMessage(HttpStatusCode.OK);

        }

        [HttpPost]
        public IHttpActionResult SaveTask(Task newTask)
        {
            bool found = false;
            GetTasks().ForEach(t =>
            {
                if (t.id == newTask.id)
                    found = true;
            });

            MySqlCommand cmd;
            bool applied = false;
            if (!found)
            {
                cmd = new MySqlCommand("INSERT INTO tasks (subject, list_id) VALUES (@subject, @list_id)");
                cmd.Parameters.Add(new MySqlParameter("@subject", newTask.subject));
                cmd.Parameters.Add(new MySqlParameter("@list_id", newTask.list_id));
                new BasicQueryForID(cmd, id =>
                {
                    newTask.id = id;
                });
                applied = true;
            } else
            {
                cmd = new MySqlCommand("UPDATE tasks SET subject = @subject, list_id = @list_id WHERE tasks.id = @TID");
                cmd.Parameters.Add(new MySqlParameter("@subject", newTask.subject));              
                cmd.Parameters.Add(new MySqlParameter("@list_id", newTask.list_id));
                cmd.Parameters.Add(new MySqlParameter("@TID", newTask.id));
                new BasicNonQuery(cmd, rowsAffected =>
                {
                    applied = rowsAffected >= 1;
                });
            }


            if (!applied)
                return InternalServerError();
            else
                return Ok(newTask);


        }

    }
}
