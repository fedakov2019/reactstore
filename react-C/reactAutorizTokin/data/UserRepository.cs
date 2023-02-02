using Dapper;

using reactAutorizTokin.data;
using System.Data;

namespace reactAutorizTokin.data
{
    public class UserRepository : IUserRepository
    {
        private readonly DapperContext _context;
        public UserRepository(DapperContext context)
        {
             _context = context;
        }

        public async  Task<List<user>> GetUser()
        {
            var query = "SELECT id Id1,Name Name1,age Age1 FROM [dbo].[User] ";
            using (var connection = _context.CreateConnection())
            {
                var companies = await connection.QueryAsync<user>(query);
                return companies.ToList();
            }
        }

        public async Task<user> GetUser(int id)
        {
            var query = "SELECT id Id1,Name Name1,age Age1 FROM [dbo].[User] WHERE id = @Id";
            using (var connection = _context.CreateConnection())
            {
                var company = await connection.QuerySingleOrDefaultAsync<user>(query, new { id });
                return company;
            }
        }

        public async Task<user> CreateUser(user1 company)
        {
            var query = "INSERT INTO [dbo].[User](Name, age) VALUES (@Name, @Age)"+
                 "SELECT CAST(SCOPE_IDENTITY() as int)"; 
            var parameters = new DynamicParameters();
            parameters.Add("Name", company.Name, DbType.String);
            parameters.Add("Age", company.age, DbType.Int64);
            
            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);
                var createdCompany = new user
                {
                    Id1 = id,
                    Name1 = company.Name,
                    Age1 = company.age
                    
                };
                return createdCompany;
            }
        }

        public async Task DeleteCompany(int id)
        {
            var query = "DELETE FROM [dbo].[User]  WHERE id = @Id";
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
            }
        }
        public async Task UpdateCompany( user company)
        {
            var query = "UPDATE [dbo].[User] SET Name = @Name, age = @Age WHERE id = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", company.Id1, DbType.Int32);
            parameters.Add("Name", company.Name1, DbType.String);
            parameters.Add("Age", company.Age1, DbType.Int32);
            
            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

    }
}
