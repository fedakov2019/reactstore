using Microsoft.Identity.Client;
using reactAutorizTokin.Dto;
using reactAutorizTokin.Models;

namespace reactAutorizTokin.Data
{
    public interface IUserAut
    {   public Task<UsersAUT> CreateUs(RegisterDto LogUser);
        public Task<UsersAUT> UpdateUS(UsersAUT UserAUT);
        public Task DeleteUs(int Id);
        public Task<UsersAUT> Login(String UserName);
        public Task RegisterREFRToken(int Id, string RefrToken);
        public Task<UsersAUT> ValidRefrehTok(string RefrToken);
        public Task<UsersAUT> GitidUser(int Id);
        public Task<List<UserRoleDto>> Users();
        public Task<List<AccesRoles>> AccesRoles();
    }
}
