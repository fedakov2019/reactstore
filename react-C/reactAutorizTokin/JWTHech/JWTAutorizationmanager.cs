
using System.IdentityModel.Tokens.Jwt;
 
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;


namespace reactAutorizTokin.classes

{
    public class JWTAutorizationmanager
{
        private readonly string key= "lecureTest123 dfsdf dsf4$$$";
        private readonly IDictionary<string, string> users = new Dictionary<string, string>()
        {{"test","password"},{"test1","pwd"}};
        

        public string Authenticate(string username, string password)
        { if (!users.Any(u=>u.Key==username && u.Value==password))
            { return null; }



            var symmetr = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credenties = new SigningCredentials(symmetr, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credenties);
            var payload = new JwtPayload(username, null, null, null, DateTime.Today.AddDays(1));

                var securityToken =new JwtSecurityToken(header, payload);


           
            
            return new JwtSecurityTokenHandler().WriteToken(securityToken);
                    
                    }
}
}
