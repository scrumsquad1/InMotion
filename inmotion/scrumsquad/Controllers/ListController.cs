using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using inmotion.Models;
using MySql.Data.MySqlClient;
using System.Configuration;

namespace inmotion.Controllers
{
    public class ListController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetList(int id)  // make sure its string
        {
            List<List> listOfLists = GetLists();
            var list = listOfLists.FirstOrDefault((p) => p.id == id);

            if (list == null)
                return NotFound();

            return Ok(list);

        }
        
        public List<List> GetLists()
        {

            List<List> locationList = new List<List>();
            new BasicQuery(new MySqlCommand("SELECT * FROM lists"), (reader) =>
            {
                locationList.Add(new List
                {
                    id = reader.GetInt32(0),
                    name = reader.GetString(1),
                    location_id = reader.GetInt32(2)
                });
            });
            return locationList;

        }

        [HttpDelete]
        public HttpResponseMessage DeleteList(List passedList)
        {

            bool found = false;

            MySqlCommand cmd = new MySqlCommand("DELETE FROM lists WHERE lists.id=@id");
            cmd.Parameters.Add(new MySqlParameter("@id", passedList.id));

            new BasicNonQuery(cmd, (rowsAffected) => {
                found = rowsAffected >= 1;
            });

            if (!found)
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            else
                return new HttpResponseMessage(HttpStatusCode.OK);

        }

        [HttpPost]
        public IHttpActionResult SaveList(List newList)
        {

            bool found = false;
            GetLists().ForEach(l =>
            {
                if (l.id == newList.id)
                    found = true;
            });

            MySqlCommand cmd;
            bool applied = false;
            if (found)
            {
                cmd = new MySqlCommand("UPDATE lists SET name = @name, location_id = @location_id WHERE lists.id = @LID");
                cmd.Parameters.Add(new MySqlParameter("@name", newList.name));
                cmd.Parameters.Add(new MySqlParameter("@location_id", newList.location_id));
                cmd.Parameters.Add(new MySqlParameter("@LID", newList.id));
                new BasicNonQuery(cmd, rowsAffected =>
                {
                    applied = rowsAffected >= 1;
                });
            }
            else
            {
                cmd = new MySqlCommand("INSERT INTO lists (name, location_id) VALUES (@name, @location_id)");
                cmd.Parameters.Add(new MySqlParameter("@name", newList.name));
                cmd.Parameters.Add(new MySqlParameter("@location_id", newList.location_id));
                new BasicQueryForID(cmd, id => {
                    newList.id = id;
                    applied = true;
                });
            }

            if (!applied)
                return InternalServerError();
            else
                return Ok(newList);

        }

    }
}
