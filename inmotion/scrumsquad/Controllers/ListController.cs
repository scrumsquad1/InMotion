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
    public class ListController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetList(int id)  // make sure its string
        {
            List<List> listOfLists = GetLists();

            var list = listOfLists.FirstOrDefault((p) => p.List_Id == id);

            if (list == null)
                return NotFound();

            return Ok(list);
        }
        
        public List<List> GetLists()
        {
            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            List<List> locationList = new List<List>();

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM lists");

                cmd.Connection = conn;
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    locationList.Add(new List
                    {
                        List_Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Location_Id = reader.GetInt32(2)
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
            return locationList;
        }

        [HttpDelete]
        public HttpResponseMessage DeleteList(List passedList)
        {
            bool found = true;
            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            int delId = passedList.List_Id;

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("DELETE FROM lists WHERE lists.id=@id", conn);
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
        public void SaveList(List newList)
        {
            bool exist = false;
            List<List> listOfLists = GetLists();

            for (var i = 0; i < listOfLists.Count; i++)
            {
                if (listOfLists[i].List_Id == newList.List_Id)
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
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO lists (name, location_id) VALUES (@name, @location_id)", conn);
                    MySqlParameter param = new MySqlParameter("@name", newList.Name);
                    cmd.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter("@location_id", newList.Location_Id);
                    cmd.Parameters.Add(param1);
                    //get data stream
                    cmd.ExecuteNonQuery();

                }
                else
                {
                    conn = new MySqlConnection(myConnectionString);
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("UPDATE lists SET name = @name, location_id = @location_id WHERE lists.id = @LID", conn);
                    MySqlParameter param = new MySqlParameter("@name", newList.Name);
                    cmd.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter("@location_id", newList.Location_Id);
                    cmd.Parameters.Add(param1);
                    MySqlParameter param2 = new MySqlParameter("@LID", newList.List_Id);
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
