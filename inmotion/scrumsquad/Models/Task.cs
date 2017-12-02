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

        public int CompareTo(Task other)
        {
            // If they are equal, sort alphabetically by subject
            if (this.priority == other.priority)
            {
                return this.subject.CompareTo(other.subject);
            }
            // Otherwise sort by priority from high to low
            return other.priority.CompareTo(this.priority);
        }

    }
}