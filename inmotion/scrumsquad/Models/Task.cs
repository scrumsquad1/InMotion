using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inmotion.Models
{
    public class Task
    {
        public int id { get; set; }

        public int list_id { get; set; }

        public string subject { get; set; }
        
        public int priority { get; set; }

    }
}