﻿using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;
using System.Xml.Linq;
using reactAutorizTokin.data;
using Microsoft.AspNetCore.Authorization;
using reactAutorizTokin.classes;


namespace reactAutorizTokin.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class UsersControlers : ControllerBase
    {
        private readonly JWTAutorizationmanager jWTAutorizationmanager;
        public UsersControlers(JWTAutorizationmanager jWTAutorizationmanager, IUserRepository companyRepo)
        {
            this.jWTAutorizationmanager = jWTAutorizationmanager;
            _companyRepo = companyRepo;
        }




        private readonly IUserRepository _companyRepo;

        [Authorize]
        [HttpGet("all_companies")]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var companies = await _companyRepo.GetUser();
                return Ok(companies);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("get-post-by-id/{id}", Name = "CompanyById")]
        public async Task<IActionResult> GetUser(int id)
        {
            try
            {
                var company = await _companyRepo.GetUser(id);
                if (company == null)
                    return NotFound();
                return Ok(company);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }



        [HttpPost("create-post")]
        public async Task<IActionResult> CreateUser(user1 company)
        {
            try
            {
                var createdCompany = await _companyRepo.CreateUser(company);
                if (createdCompany == null)
                    return NotFound();
                return Ok(createdCompany);
                //return CreatedAtRoute("create-post", new { id = createdCompany.Id1 }, createdCompany);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("update-post/")]
        public async Task<IActionResult> UpdateCompany(user company)
        {
            try
            {
                var dbCompany = await _companyRepo.GetUser(company.Id1);
                if (dbCompany == null)
                    return NotFound();
                await _companyRepo.UpdateCompany(company);
                return Ok('1');
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }
        [HttpDelete("delete-post-by-id/{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            try
            {
                var dbCompany = await _companyRepo.GetUser(id);
                if (dbCompany == null)
                    return NotFound();
                await _companyRepo.DeleteCompany(id);
                return Ok(id);
            }
            catch (Exception ex)
            {
                //log error
                return StatusCode(500, ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPut("Authenticate")]
        public IActionResult AuthUser([FromBody] SuperUser usr)
        {
            var token = jWTAutorizationmanager.Authenticate(usr.username, usr.password);
            if (token == null)
            {
                return Unauthorized();
            }
            return Ok(token);
        }
    }

        public class SuperUser
        {
            public string username { get; set; }
            public string password { get; set; }

        }
    
}