using reactAutorizTokin.Models;

namespace reactAutorizTokin.Data
{
    public interface IUserRepository
    {
        public Task<List<user>> GetUser();
        public Task<user> GetUser(int id);
        public Task<user> CreateUser(user1 company);
        public Task DeleteCompany(int id);
        public Task UpdateCompany(user company);
    }




}
