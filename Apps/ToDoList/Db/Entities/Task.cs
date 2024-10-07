using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoList.Db.Entities
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public bool IsEliminated { get; set; }
    }
}