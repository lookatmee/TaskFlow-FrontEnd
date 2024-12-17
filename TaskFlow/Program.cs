using BW_WEB.Models;
using System.Text;
using JwtBearerHandler = BW_WEB.JwtBearerHandler;
using Serilog;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using AspnetCoreFull.Data;
using AspnetCoreFull.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurar Serilog
Log.Logger = new LoggerConfiguration()
    //.WriteTo.Console() // (Comentado para evitar log en la consola)
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Configurar la inyección de dependencias de ApiSettings
builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection("ApiSettings"));

// Configurar HttpClientFactory
builder.Services.AddHttpClient("ApiClient", client =>
{
  client.BaseAddress = new Uri(builder.Configuration["ApiSettings:BaseUrl"]);
}).AddHttpMessageHandler<JwtBearerHandler>();

// Configurar IHttpContextAccessor
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

// Configurar JwtBearerHandler
builder.Services.AddTransient<JwtBearerHandler>();

// Agregar servicios al contenedor (incluyendo DbContext y RazorPages)
builder.Services.AddRazorPages();
builder.Services.AddDbContext<UserContext>(options =>
{
  options.UseSqlite(builder.Configuration.GetConnectionString("UserContext") ?? throw new InvalidOperationException("Connection string 'UserContext' not found."));
}, ServiceLifetime.Scoped);

// Configurar Session
builder.Services.AddSession(options =>
{
  options.IdleTimeout = TimeSpan.FromMinutes(30);
  options.Cookie.HttpOnly = true;
  options.Cookie.IsEssential = true;
});

var app = builder.Build();

// Configurar el pipeline de la solicitud HTTP.
using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;
  SeedData.Initialize(services); // Inicialización de datos
}

if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Error");
  app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Middleware para session y autenticación
app.UseSession();
app.UseAuthentication();
app.UseAuthorization();

// Lista de rutas que no requieren autenticación
var allowedRoutes = new[] {
    "/Login",
    "/ForgotPassword",
    "/ResetPassword",
    "/Apps/Kanban"  // Agregar esta ruta
};

// Middleware para redirigir a Login si no hay token
app.Use(async (context, next) =>
{
    var token = context.Session.GetString("JWToken");
    if (string.IsNullOrEmpty(token) &&
        !allowedRoutes.Any(route =>
            context.Request.Path.Value.StartsWith(route, StringComparison.OrdinalIgnoreCase)))
    {
        context.Response.Redirect("/Login");
        return;
    }
    await next();
});

// Mapear Razor Pages
app.MapRazorPages();

// Escribimos en el log el inicio de la aplicación
try
{
  Log.Information("Iniciando BW_WEB");
  app.Run();
}
catch (Exception ex)
{
  Log.Fatal(ex, "BW_WEB start-up failed");
}
finally
{
  Log.CloseAndFlush();
}
