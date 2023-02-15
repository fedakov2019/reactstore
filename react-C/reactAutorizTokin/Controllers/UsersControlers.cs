using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;
using System.Xml.Linq;
using reactAutorizTokin.Models;
using Microsoft.AspNetCore.Authorization;
using reactAutorizTokin.classes;
using reactAutorizTokin.Data;
using reactAutorizTokin.Dto;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Security.Principal;
using Azure.Core;

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
                return Created("Seccuss", createdCUs);
                //return CreatedAtRoute("create-post", new { id = createdCompany.Id1 }, createdCompany);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
        

        [HttpPost("login")]
        public async Task<IActionResult> Login(RegisterDto user)
        {
            try
            {
                var createdCUs = await _userSE.Login(user.Name);
                if (createdCUs == null)
                    return BadRequest(new { message = "Name incorect" });

                if (!BCrypt.Net.BCrypt.Verify(user.Password, createdCUs.Password))
                {
                    return BadRequest(new { message = "Password incorect" });

                }

                var key = _jWTAutorizat1.Authenticate(new string[] {createdCUs.Name, createdCUs.Id.ToString()});
                string key2 = key[1];
                string key1 = key[0];
                createdCUs.RefreshToken = key2;
                Token_modal token_mod=new Token_modal { AccessToken = key1, RefreshToken = key2 };
                await _userSE.RegisterREFRToken(createdCUs.Id, key2);

                Response.Cookies.Append("jwt_r", key2, new CookieOptions
                { HttpOnly = true, Secure=true, SameSite = 0 });
              
                return Ok(new { token_mod, createdCUs });

                //return CreatedAtRoute("create-post", new { id = createdCompany.Id1 }, createdCompany);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
        [AllowAnonymous]
        [HttpGet("users")]
        public async Task<IActionResult> User()
        {
            try {
                string jwt = Request.Headers.Authorization.ToString();

                
                var token = _jWTAutorizat1.Verify_acces(jwt);
                if (token.Payload["nameid"].ToString()==null)
                {
                    return NotFound();

                }
                int Userid = int.Parse(token.Payload["nameid"].ToString());

                var user = await _userSE.GitidUser(Userid);
                return Ok(user);

            }
            catch (Exception ex)
            {
                return StatusCode(401, ex.Message);
            }


        }
        [HttpGet("refrech")]
        public async Task<IActionResult>  Refrech()
        {
            try
            {
                var jwt_r = Request.Cookies["jwt_r"];
                var token = _jWTAutorizat1.Verify_refrech(jwt_r);
                int Userid = int.Parse(token.Payload["nameid"].ToString());

                var user = await _userSE.ValidRefrehTok(jwt_r);
                if ((user == null)||(token.Payload["nameid"] == null)) {
                    return NotFound();
                }
                var usernew=await _userSE.GitidUser(Userid);
                var key = _jWTAutorizat1.Authenticate(new string[] { usernew.Name, usernew.Id.ToString() });
                string key2 = key[1];
                var key1 = key[0];
                Token_modal token_mod = new Token_modal { AccessToken = key1, RefreshToken = key2 };
                await _userSE.RegisterREFRToken(Userid, key2);

                Response.Cookies.Append("jwt", key2, new CookieOptions
                { HttpOnly = true, Secure=true,SameSite=0 });
                
                return Ok(new { token_mod,usernew });

                

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }






        [HttpPost("logout")]
        public IActionResult Logaut()
        {
            Response.Cookies.Delete("jwt_r");
            return Ok(new { message = "seccess" });
        }


    }

       
    
}