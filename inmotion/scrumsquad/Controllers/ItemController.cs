using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using scrumsquad.Models;
using System.Web.Http;
using inmotion.Models;
using MySql.Data.MySqlClient;

namespace inmotion.Controllers
{
    public class ItemController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetItem(int id)  // make sure its string
        {
            List<Item> noteList = GetItemList();

            var item = noteList.FirstOrDefault((p) => p.Id == id);

            if (item == null)
                return NotFound();

            return Ok(item);
        }

        public List<Item> GetItemList()
        {
            MySqlConnection conn;
            string myConnectionString = "server=scrumsquadserver.mysql.database.azure.com;uid=scrumuser@scrumsquadserver;" +
            "pwd=scrumpass1!;database=scrumsquaddb";

            List<Item> itemList = new List<Item>();

            try
            {
                conn = new MySqlConnection(myConnectionString);
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("SELECT * FROM Items");

                cmd.Connection = conn;
                MySqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    itemList.Add(new Item
                    {
                        Id = reader.GetInt32(0),
                        Title = reader.GetString(1),
                        Body = reader.GetString(2),
                        Priority = reader.GetInt32(3),
                        LocationId = reader.GetInt32(4)

                    });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //  noteList.Sort();
            return itemList;

        }
    }
}
