﻿using System.Text.Json.Serialization;

namespace reactAutorizTokin.Models
{
    public class UsersAUT
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RefreshToken { get; set; }
        public int? Acceskey { get; set; }

        [JsonIgnore] public string Password { get; set; }
            
    }
}
