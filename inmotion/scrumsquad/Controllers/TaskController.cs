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
            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            List<Task> taskList = new List<Task>();

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM tasks");

                cmd.Connection = conn;
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    taskList.Add(new Task
                    {
                        Task_id = reader.GetInt32(0),
                        Subject = reader.GetString(1),
                        List_id = reader.GetInt32(2)
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //Code in finally block executes in normal scenario as well as in case of exception thrown.
                // close connection
                if (conn != null)
                {
                    conn.Close();

                }
            }
            return taskList;
        }

        [HttpDelete]
        public HttpResponseMessage DeleteTask(Task passedTask)
        {
            bool found = true;
            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            int delId = passedTask.Task_id;

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("DELETE FROM tasks WHERE tasks.id=@id", conn);
                MySqlParameter param = new MySqlParameter("@id", delId);
                cmd.Parameters.Add(param);
                //get data stream

                int numRowsAffected = cmd.ExecuteNonQuery();
                if (numRowsAffected < 1)
                {
                    found = false; 
                }            

            }

            catch (Exception ex)
            {
                found = false;               
            }
            finally
            {
                //Code in finally block executes in normal scenario as well as in case of exception thrown.
                // close connection
                if (conn != null)
                {
                    conn.Close();

                }
            }
            if (!found)
            {
                HttpResponseMessage badResponse = new HttpResponseMessage();
                badResponse.StatusCode = HttpStatusCode.BadRequest;
                return badResponse;
            }
            else
            {
                HttpResponseMessage goodResponse = new HttpResponseMessage();
                goodResponse.StatusCode = HttpStatusCode.OK;
                return goodResponse;
            }
        }

        [HttpPost]
        public void SaveTask(Task newTask)
        {
            bool exist = false;
            List<Task> listOfTasks = GetTasks();

            for (var i = 0; i < listOfTasks.Count; i++)
            {
                if (listOfTasks[i].Task_id == newTask.Task_id)
                {
                    exist = true;
                }
            }

            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";
            //  var noteList = mongoDatabase.GetCollection("Locations");
            try
            {
                if (exist == false)
                {
                    conn = new MySqlConnection(myConnectionString);
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO tasks (subject, list_id) VALUES (@subject, @list_id)", conn);
                    MySqlParameter param = new MySqlParameter("@subject", newTask.Subject);
                    cmd.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter("@list_id", newTask.List_id);
                    cmd.Parameters.Add(param1);
                    //get data stream
                    cmd.ExecuteNonQuery();

                }
                else
                {
                    conn = new MySqlConnection(myConnectionString);
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("UPDATE tasks SET subject = @subject, list_id = @list_id WHERE tasks.id = @TID", conn);
                    MySqlParameter param = new MySqlParameter("@subject", newTask.Subject);
                    cmd.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter("@list_id", newTask.List_id);
                    cmd.Parameters.Add(param1);
                    MySqlParameter param2 = new MySqlParameter("@TID", newTask.Task_id);
                    cmd.Parameters.Add(param2);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //Code in finally block executes in normal scenario as well as in case of exception thrown.
                // close connection
                if (conn != null)
                {
                    conn.Close();

                }
            }
        }
    }
}
