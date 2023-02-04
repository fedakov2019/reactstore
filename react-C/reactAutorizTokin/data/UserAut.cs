using Dapper;
using reactAutorizTokin.Dto;
using reactAutorizTokin.Models;
using System.Data;

namespace reactAutorizTokin.Data
{
    public class UserAut : IUserAut
    {
        private readonly DapperContext _context;
        public UserAut(DapperContext context)
        {
            _context = context;
        }
        public Task<List<AccesRoles>> AccesRoles()
        {
            throw new NotImplementedException();
        }

        public async Task<UsersAUT> CreateUs(RegisterDto LogUser)
        {
            var query = "INSERT INTO [dbo].[UsersAUT](Name, Password) VALUES (@Name, @Password)" +
                 "SELECT CAST(SCOPE_IDENTITY() as int)";
            var parameters = new DynamicParameters();
            parameters.Add("Name", LogUser.Name, DbType.String);
            parameters.Add("Password", BCrypt.Net.BCrypt.HashPassword(LogUser.Password), DbType.String);

            using (var connection = _context.CreateConnection())
            {
                var id = await connection.QuerySingleAsync<int>(query, parameters);
                var createdUser = new UsersAUT
                {
                    Id = id,
                    Name = LogUser.Name,
                    Password = LogUser.Password

                };
                return createdUser;
            }
        }
        public async Task<UsersAUT> GitidUser(int Id)
        {
            var query = "select  * from [dbo].[UsersAUT] where Id=@Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", Id, DbType.Int64);
            using (var connection = _context.CreateConnection())
            {
                var UserAUT = await connection.QuerySingleOrDefaultAsync<UsersAUT>(query, parameters);
                return UserAUT;

            }
        }

        public async Task<UsersAUT> Login(String UserName)
        {
            var query = "select top 1 * from [dbo].[UsersAUT] where Name=@Name";
            var parameters = new DynamicParameters();
            parameters.Add("Name", UserName, DbType.String);
            using (var connection = _context.CreateConnection())
            {
                var UserAUT = await connection.QuerySingleOrDefaultAsync<UsersAUT>(query,parameters);
                return UserAUT;

            }


        }
        public async Task RegisterREFRToken(int Id, string RefreshToken)
        {
            var query = "UPDATE [dbo].[UsersAUT] set RefreshToken  = @RefreshToken WHERE Id = @Id";
            var parameters = new DynamicParameters();
            parameters.Add("Id", Id, DbType.Int32);
            parameters.Add("RefreshToken", RefreshToken, DbType.String);
            

            using (var connection = _context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameters);
            }
        }

        public async Task<UsersAUT> ValidRefrehTok(string RefreshToken)

        {
            var query = "select  * from [dbo].[UsersAUT] where RefreshToken=@RefreshToken";
            var parameters = new DynamicParameters();
            parameters.Add("RefreshToken", RefreshToken, DbType.String);
            using (var connection = _context.CreateConnection())
            {
                var UserAUT = await connection.QuerySingleOrDefaultAsync<UsersAUT>(query, parameters);
                return UserAUT;

            }

        }
            public Task DeleteUs(int Id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateCompany(user company)
        {
            throw new NotImplementedException();
        }

        public Task<UsersAUT> UpdateUS(UsersAUT UserAUT)
        {
            throw new NotImplementedException();
        }

        public Task<List<UserRoleDto>> Users()
        {
            throw new NotImplementedException();
        }
    }
}
