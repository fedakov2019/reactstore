using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using reactAutorizTokin.classes;
using reactAutorizTokin.Data;
using reactAutorizTokin.Models;

namespace reactAutorizTokin.Controllers
{
    [Route("")]
    [ApiController]
    public class VnutrControler : Controller
    {
       
        private readonly JWTAutorizationmanager jWTAutorizationmanager;
        public VnutrControler(IUserRepository companyRepo, JWTAutorizationmanager jWTAutorizat)
        {
            _jWTAutorizat = jWTAutorizat;
            _companyRepo = companyRepo;

        }
        private readonly JWTAutorizationmanager _jWTAutorizat;
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
    }
}
