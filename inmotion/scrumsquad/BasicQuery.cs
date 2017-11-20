using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace inmotion
{
    public class BasicQuery
    {

        private static string CONNECTION_STRING = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public BasicQuery(MySqlCommand command, Action<MySqlDataReader> onLineRead)
        {

            MySqlConnection conn = new MySqlConnection(CONNECTION_STRING);

            try
            {
                conn.Open();
                command.Connection = conn;
                
                MySqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                    onLineRead(reader);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (conn != null)
                    conn.Close();
            }
           
        }

    }

}