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

        public List<Task> GetTasks()
        {
            List<Task> taskList = new List<Task>();
            new BasicQuery(new MySqlCommand("SELECT * FROM tasks"), (reader) =>
             {
                 taskList.Add(new Task
                 {
                     id = reader.GetInt32(0),
                     subject = reader.GetString(1),
                     list_id = reader.GetInt32(2)
                 });
             });
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
        public HttpResponseMessage SaveTask(Task newTask)
        {
            bool found = false;
            GetTasks().ForEach(t =>
            {
                if (t.id == newTask.id)
                    found = true;
            });

            MySqlCommand cmd;
            if(!found)
            {
                cmd = new MySqlCommand("INSERT INTO tasks (subject, list_id) VALUES (@subject, @list_id)");
                cmd.Parameters.Add(new MySqlParameter("@subject", newTask.subject));
                cmd.Parameters.Add(new MySqlParameter("@list_id", newTask.list_id));
            } else
            {
                cmd = new MySqlCommand("UPDATE tasks SET subject = @subject, list_id = @list_id WHERE tasks.id = @TID");
                cmd.Parameters.Add(new MySqlParameter("@subject", newTask.subject));
                cmd.Parameters.Add(new MySqlParameter("@list_id", newTask.list_id));
                cmd.Parameters.Add(new MySqlParameter("@TID", newTask.id));
            }

            bool applied = false;
            new BasicNonQuery(cmd, rowsAffected =>
            {
                applied = rowsAffected >= 1;
            });

            if (!applied)
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            else
                return new HttpResponseMessage(HttpStatusCode.OK);

        }

    }
}
