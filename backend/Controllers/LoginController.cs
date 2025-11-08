using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using System.Security.Cryptography;
using System.Text;

using TaskManager.Models;
using TaskManager.Data;
namespace TaskManager.Controllers
{
    [Route("login")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        public class LoginViewModel
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Invalid input" });
            }

            string passwordHash = ComputeSha256Hash(model.Password);

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == model.Email && u.PasswordHash == passwordHash);

            if (user != null)
            {
                return Ok(new 
                { 
                    message = "Login successful",
                    user = new { user.Id, user.Email } 
                });
            }
            else
            {
                return Unauthorized(new { message = "Invalid email or password" });
            }
        }

        private string ComputeSha256Hash(string rawData)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
                StringBuilder builder = new StringBuilder();
                foreach (var b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

    }
}
