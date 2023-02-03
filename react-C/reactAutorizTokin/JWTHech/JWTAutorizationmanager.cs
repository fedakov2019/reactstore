
using System.IdentityModel.Tokens.Jwt;
 
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace reactAutorizTokin.classes

{
    public class JWTAutorizationmanager
{
        private readonly string key= "lecureTest123 dfsdf dsf4$$$";
       

        public string[] Authenticate(string username)
       
            {


            var symmetr = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            var credenties = new SigningCredentials(symmetr, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credenties);
            var payload = new JwtPayload(username, null, null, null, DateTime.Today.AddDays(1));
            var payloadrefrech = new JwtPayload(username, null, null, null, DateTime.Today.AddDays(60));

            var securityToken =new JwtSecurityToken(header, payload);
            var securtuTokenRefrech = new JwtSecurityToken(header, payloadrefrech);

            
            var tok1 = new JwtSecurityTokenHandler().WriteToken(securityToken);
            var tok2 = new JwtSecurityTokenHandler().WriteToken(securtuTokenRefrech);
            


            return new string[] { tok1,tok2 };
                    
                    }
}
}
