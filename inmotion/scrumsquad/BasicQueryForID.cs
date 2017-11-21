using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace inmotion
{
    public class BasicQueryForID
    {

        private static string CONNECTION_STRING = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public BasicQueryForID(MySqlCommand command, Action<int> onIdGenerated )
        {

            if(!command.CommandText.Contains("LAST_INSERT_ID()"))
                command.CommandText += "; SELECT LAST_INSERT_ID()";
            
            MySqlConnection conn = new MySqlConnection(CONNECTION_STRING);

            try
            {
                conn.Open();
                command.Connection = conn;
                MySqlDataReader reader = command.ExecuteReader();
                if (reader != null && reader.Read())
                    onIdGenerated(reader.GetInt32(0));
                
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