using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inmotion.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Lat { get; set; }
        public int Long { get; set; }
    }
}