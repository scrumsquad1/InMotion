using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MySql.Data.MySqlClient;
using inmotion.Models;

namespace inmotion.Controllers
{
    public class LocationController : ApiController
    {

        bool testing = false;
        List<Location> locationList = new List<Location>();
        // add default controller for normal opperation
        public LocationController()
        {
            testing = false;
        }

        // add controller that lets you pass in a fake db for testing
        public LocationController(List<Location> FakeDataList)
        {
            locationList = FakeDataList;
            testing = true;
        }

        //List<Location> locationList = new List<Location>();

        public List<Location> GetLocationList()
        {
            if (!testing)
            {

                new BasicQuery(new MySqlCommand("SELECT * FROM locations"), (reader) => {
                    locationList.Add(new Location
                    {
                        id = reader.GetInt32(0),
                        lat = reader.GetDouble(1),
                        lng = reader.GetDouble(2)
                    });
                });
            }
            return locationList;
        }

        [HttpGet]
        public IHttpActionResult GetLocation(int id)  // make sure its string
        {
            if (!testing)
            {
                locationList = GetLocationList();
            }

            var location = locationList.FirstOrDefault((p) => p.id == id);

            if (location == null)
                return NotFound();

            return Ok(location);

        }

        [HttpDelete]
        public HttpResponseMessage DeleteLocation(List passedList)
        {
            bool found = false;

            MySqlCommand cmd = new MySqlCommand("DELETE FROM locations WHERE locations.id=@id");
            cmd.Parameters.Add(new MySqlParameter("@id", passedList.location_id));
            new BasicNonQuery(cmd, (rowsAffect) =>
            {
                found = rowsAffect >= 1;
            });

            if (!found)
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            else
                return new HttpResponseMessage(HttpStatusCode.OK);

        }

        [HttpPost]
        public IHttpActionResult SaveLocation(Location newLocation)
        {
            bool found = false;
            GetLocationList().ForEach(l =>
            {
                if (l.id == newLocation.id)
                    found = true;
            });

            MySqlCommand cmd;
            bool applied = false;
            if (!found)
            {
                cmd = new MySqlCommand("INSERT INTO locations (lat, lng) VALUES (@lat, @lng)");
                cmd.Parameters.Add(new MySqlParameter("@lat", newLocation.lat));
                cmd.Parameters.Add(new MySqlParameter("@lng", newLocation.lng));
                new BasicQueryForID(cmd, id =>
                {
                    newLocation.id = id;
                    applied = true;
                });
            }
            else
            {
                cmd = new MySqlCommand("UPDATE locations SET lat = @lat, lng = @lng WHERE locations.id = @LID");
                cmd.Parameters.Add(new MySqlParameter("@lat", newLocation.lat));
                cmd.Parameters.Add(new MySqlParameter("@lng", newLocation.lng));
                cmd.Parameters.Add(new MySqlParameter("@LID", newLocation.id));
                new BasicNonQuery(cmd, rowsAffected =>
                {
                    applied = rowsAffected >= 1;
                });
            }

            if (!applied)
                return InternalServerError();
            else
                return Ok(newLocation);

        }

    }

}
