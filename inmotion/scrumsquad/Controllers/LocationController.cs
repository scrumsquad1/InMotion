using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using scrumsquad.Models;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data.MySqlClient;
using inmotion.Models;

namespace inmotion.Controllers
{
    public class LocationController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetLocation(int id)  // make sure its string
        {
            List<Location> locationList = GetLocationList();

            var location = locationList.FirstOrDefault((p) => p.Location_Id == id);

            if (location == null)
                return NotFound();

            return Ok(location);
        }
     
        public List<Location> GetLocationList()
        {
            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            List<Location> locationList = new List<Location>();

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM locations");

                cmd.Connection = conn;
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    locationList.Add(new Location
                    {
                        Location_Id = reader.GetInt32(0),
                        Lat = reader.GetDouble(1),
                        Lng = reader.GetDouble(2)
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
        public HttpResponseMessage DeleteLocation(List passedList)
        {
            bool found = true;
            MySqlConnection conn = null;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            int delId = passedList.Location_Id;

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("DELETE FROM locations WHERE locations.id=@id", conn);
                MySqlParameter param = new MySqlParameter("@id", delId);
                cmd.Parameters.Add(param);
                //get data stream
                int numRowsAffected = cmd.ExecuteNonQuery();
                if (numRowsAffected < 1)
                {
                    found = false;
                }

                //may not need these additional commands if the table structure allows for CASCADING deletes. List items should
                // be deleted that have the same location id and tasks should be deleted that have the same list id as the list
                //items that were deleted

                //MySqlCommand cmd1 = new MySqlCommand("DELETE t FROM Tasks t INNER JOIN Lists l ON t.list_id = l.id " +
                //"WHERE l.id=@id", conn);
                //MySqlParameter param1 = new MySqlParameter("@id", delId);
                //cmd1.Parameters.Add(param1);
                ////get data stream
                //cmd1.ExecuteNonQuery();

                //MySqlCommand cmd2 = new MySqlCommand("DELETE FROM Lists WHERE Lists.Location_Id=@id", conn);
                //MySqlParameter param2 = new MySqlParameter("@id", delId);
                //cmd2.Parameters.Add(param2);
                ////get data stream
                //cmd2.ExecuteNonQuery();
                ////Check whether record exists or not
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
        public void SaveLocation(Location newLocation)
        {
            bool exist = false;
            List<Location> locationList = GetLocationList();

            for (var i = 0; i < locationList.Count; i++)
            {
                if (locationList[i].Location_Id == newLocation.Location_Id)
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
                    MySqlCommand cmd = new MySqlCommand("INSERT INTO locations (lat, lng) VALUES (@lat, @lng)", conn);
                    MySqlParameter param = new MySqlParameter("@lat", newLocation.Lat);
                    cmd.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter("@lng", newLocation.Lng);
                    cmd.Parameters.Add(param1);
                    //get data stream
                    cmd.ExecuteNonQuery();

                }
                else
                {
                    conn = new MySqlConnection(myConnectionString);
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("UPDATE locations SET lat = @lat, lng = @lng WHERE locations.id = @LID", conn);
                    MySqlParameter param = new MySqlParameter("@lat", newLocation.Lat);
                    cmd.Parameters.Add(param);
                    MySqlParameter param1 = new MySqlParameter("@lng", newLocation.Lng);
                    cmd.Parameters.Add(param1);
                    MySqlParameter param2 = new MySqlParameter("@LID", newLocation.Location_Id);
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
