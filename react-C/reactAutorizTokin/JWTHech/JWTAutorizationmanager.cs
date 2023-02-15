
using System.IdentityModel.Tokens.Jwt;
 
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.VisualBasic;
using System.Linq.Expressions;

namespace reactAutorizTokin.classes

{
    public class JWTAutorizationmanager
{
        





        private readonly string secureKey_acces= new ConfigurationBuilder().
            AddJsonFile("appsettings.json").Build().GetValue<string>("ReactServer:JWT_acces_token");

        private readonly string secureKey_refrech = new ConfigurationBuilder().
             AddJsonFile("appsettings.json").Build().GetValue<string>("ReactServer:JWT_refrech_token");

        public string[] Authenticate(string[] userid)
       
            {

            JwtSecurityTokenHandler tokenHandler= new JwtSecurityTokenHandler();    
            var tokenKey =Encoding.ASCII.GetBytes(secureKey_acces);
            var tokenKeyRefrech= Encoding.ASCII.GetBytes(secureKey_refrech);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                    new Claim[] {
                        new Claim(ClaimTypes.Name,userid[0]),
                        new Claim(ClaimTypes.NameIdentifier,userid[1]),
                    }),
                    Expires = DateTime.Now.AddSeconds(20),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(tokenKey),
                        SecurityAlgorithms.HmacSha256Signature)
                    };

            SecurityTokenDescriptor tokenDescriptorRefrech= new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                   new Claim[] {
                        new Claim(ClaimTypes.Name,userid[0]),
                        new Claim(ClaimTypes.NameIdentifier,userid[1]),
                   }),
                Expires = DateTime.Now.AddSeconds(40),
                SigningCredentials = new SigningCredentials(
                       new SymmetricSecurityKey(tokenKeyRefrech),
                       SecurityAlgorithms.HmacSha256Signature)
            };
            var token =tokenHandler.CreateToken(tokenDescriptor);
            var tokenRefrech = tokenHandler.CreateToken(tokenDescriptorRefrech);
            var key1= tokenHandler.WriteToken(token);
            var key2= tokenHandler.WriteToken(tokenRefrech);



            



          //  var symmetr = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secureKey_acces));
          //  var credenties = new SigningCredentials(symmetr, SecurityAlgorithms.HmacSha256Signature);
            //var header = new JwtHeader(credenties);
            //var payload = new JwtPayload(userid , null, null, null, DateTime.Today.AddDays(1));
            
            //var symmetr_ref = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secureKey_refrech));
            //var credenties_ref = new SigningCredentials(symmetr_ref, SecurityAlgorithms.HmacSha256Signature);
           // var header_ref = new JwtHeader(credenties_ref);
            

            //var payloadrefrech = new JwtPayload(userid, null, null, null, DateTime.Today.AddDays(60));

            //var securityToken =new JwtSecurityToken(header, payload);
            //var securtuTokenRefrech = new JwtSecurityToken(header_ref, payloadrefrech);

            
          //  var tok1 = new JwtSecurityTokenHandler().WriteToken(securityToken);
            //var tok2 = new JwtSecurityTokenHandler().WriteToken(securtuTokenRefrech);
            


            return new string[] { key1,key2 };
                    
                    }
        public JwtSecurityToken Verify_acces(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler(); ;
            var key = Encoding.ASCII.GetBytes(secureKey_acces);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters

            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken volitedToken);
            return (JwtSecurityToken)volitedToken;
            
        }
        public JwtSecurityToken Verify_refrech(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler(); ;
            var key = Encoding.ASCII.GetBytes(secureKey_refrech);
            tokenHandler.ValidateToken(jwt, new TokenValidationParameters

            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken volitedToken);
            return (JwtSecurityToken)volitedToken;

        }
    }
}

