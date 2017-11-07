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

            var location = locationList.FirstOrDefault((p) => p.Id == id);

            if (location == null)
                return NotFound();

            return Ok(location);
        }

        public List<Location> GetLocationList()
        {
            MySqlConnection conn;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            List<Location> locationList = new List<Location>();

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM Locations");

                cmd.Connection = conn;
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    locationList.Add(new Location
                    {
                        Id = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Lat = reader.GetInt32(2),
                        Long = reader.GetInt32(3)
                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //  noteList.Sort();
            return locationList;

        }
    }
}
