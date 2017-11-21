﻿using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace inmotion
{
    public class BasicNonQuery
    {

        private static string CONNECTION_STRING = ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;

        public BasicNonQuery(MySqlCommand command) : this(command, (rowsAffected) => { })
        {

        }
        
        public BasicNonQuery(MySqlCommand command, Action<int> onComplete)
        {

            MySqlConnection conn = new MySqlConnection(CONNECTION_STRING);
            try
            {
                conn.Open();
                command.Connection = conn;
                onComplete(command.ExecuteNonQuery());
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