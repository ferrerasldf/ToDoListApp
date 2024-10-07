using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Mvc;
using ToDoList.Db;
using ToDoList.Db.Entities;
using ToDoList.Models;
using RouteAttribute = System.Web.Http.RouteAttribute;
using TaskEntity = ToDoList.Db.Entities.Task;

namespace ToDoList.Controllers
{
    public class TasksController : ApiController
    {
        private readonly ToDoListContext _context;

        public TasksController()
        {
            _context = new ToDoListContext();
        }
        //GET: /Tasks
        public async Task<IHttpActionResult> GetTasks()
        {
            try
            {
                var tasks = await _context.Tasks.ToListAsync();

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        [Route("Tasks/Grid")]
        public IHttpActionResult GetTasksGrid(int pageNumber, int pageSize)
        {
            if (pageNumber <= 0 || pageSize <= 0)
            {
                return BadRequest("El número de página y el tamaño de la página deben ser mayores que 0.");
            }

            // Obtener el número total de registros
            int totalRecords = _context.Tasks.Count();

            // Calcular el número total de páginas
            int totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

            // Obtener los registros para la página solicitada
            var tasks = _context.Tasks
                                .OrderBy(t => t.Title) // Ordenar por cualquier campo que prefieras
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToList();

            if (tasks.Count == 0)
            {
                return NotFound();
            }

            // Crear la respuesta paginada
            var response = new PaginatedResponse<TaskEntity>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                Data = tasks
            };

            return Ok(response);
        }
        //POST: /Tasks
        public async Task<IHttpActionResult> Post(TaskEntity entity)
        {
            // Verifica si el modelo es válido
            if (!ModelState.IsValid)
                return BadRequest(ModelState); // Devuelve los errores de validación en el BadRequest

            try
            {
                // Añadir la nueva tarea a la base de datos
                _context.Tasks.Add(entity);
                await _context.SaveChangesAsync(); // Asíncrono para mejor rendimiento

                // Devuelve el código 201 Created junto con la URI de la nueva tarea creada
                return Created(new Uri(Request.RequestUri + "/" + entity.Id), entity);
            }
            catch (Exception ex)
            {
                // Si ocurre algún error, devolver Internal Server Error (500)
                return InternalServerError(ex);
            }
        }
        //PUT: /Tasks/{id}
        public async Task<IHttpActionResult> Put(string id)
        {
            // Buscar la tarea por ID
            var task = await _context.Tasks.FindAsync(Guid.Parse(id));

            // Si la tarea no existe, devolver NotFound (404)
            if (task == null)
                return NotFound();

            try
            {
                // Marcar la tarea como completada
                task.IsCompleted = true;

                // Guardar los cambios en la base de datos
                await _context.SaveChangesAsync();

                // Devolver un OK (200) indicando que la tarea se actualizó correctamente
                return Ok(task); // Puedes devolver la tarea actualizada como parte de la respuesta
            }
            catch (Exception ex)
            {
                // Si ocurre algún error, devolver Internal Server Error (500)
                return InternalServerError(ex);
            }
        }

        //DELETE: /Tasks/{id}
        public async Task<IHttpActionResult> Delete(string id)
        {
            // Buscar la tarea por ID
            var task = await _context.Tasks.FindAsync(Guid.Parse(id));

            // Si la tarea no existe, devolver NotFound (404)
            if (task == null)
                return NotFound();

            try
            {
                task.IsEliminated = true;
                // Eliminar la tarea de la base de datos
                await _context.SaveChangesAsync();

                // Devolver un OK (200) indicando que la tarea se eliminó correctamente
                return Ok();
            }
            catch (Exception ex)
            {
                // Si ocurre algún error, devolver Internal Server Error (500)
                return InternalServerError(ex);
            }
        }
    }
}
