using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace inmotion.Models
{
    public class Item
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public int Priority { get; set; }
    }
}