using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using ToDoList.Db.Entities;

namespace ToDoList.Db
{
    public class ToDoListContext : DbContext
    {
        public ToDoListContext(): base("ToDoListConnection"){}

        public DbSet<Task> Tasks { get; set; }
    }
}