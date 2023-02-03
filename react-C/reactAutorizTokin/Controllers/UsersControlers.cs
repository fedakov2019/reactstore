using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;
using System.Xml.Linq;
using reactAutorizTokin.Models;
using Microsoft.AspNetCore.Authorization;
using reactAutorizTokin.classes;
using reactAutorizTokin.Data;
using reactAutorizTokin.Dto;

namespace reactAutorizTokin.Controllers
{
    [Route("admin")]
    [ApiController]
   

    public class UsersControlers : Controller

    {
        
        private readonly JWTAutorizationmanager jWTAutorizationmanager;
        public UsersControlers(IUserAut UserSE, JWTAutorizationmanager jWTAutorizat)
        {
            _jWTAutorizat1 = jWTAutorizat;
            _userSE = UserSE;
            
        }
        private readonly IUserAut _userSE;
        private readonly JWTAutorizationmanager _jWTAutorizat1;

       
        
       
        [HttpPost("create-User")]
        public async Task<IActionResult> CreateUs(RegisterDto user)
        {
            try
            {
                var createdCUs = await _userSE.CreateUs(user);
                if (createdCUs == null)
                    return NotFound();
                return Created("Seccuss",createdCUs);
                //return CreatedAtRoute("create-post", new { id = createdCompany.Id1 }, createdCompany);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
        [AllowAnonymous]

        [HttpPost("Login")]
        public async Task<IActionResult> Login(RegisterDto user)
        {
            try
            {
                var createdCUs = await _userSE.Login(user.Name);
                if (createdCUs == null)
                    return BadRequest(new { message = "Name incorect" });

                if (!BCrypt.Net.BCrypt.Verify(user.Password,createdCUs.Password))
                {
                    return BadRequest(new { message = "Password incorect" });

                }

                var key= _jWTAutorizat1.Authenticate(user.Name);
                string key2 = key[1];
                var key1 = key[0];
                await _userSE.RegisterREFRToken(createdCUs.Id, key2); 

                Response.Cookies.Append("jwt",key1,new CookieOptions
                { HttpOnly= true });
                return Ok(new { message = "secceess" });
                
                //return CreatedAtRoute("create-post", new { id = createdCompany.Id1 }, createdCompany);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }




    }

       
    
}