data "vercel_project_directory" "pokedex-dir" {
  path = "../"
}

resource "vercel_project" "pokedex-webapp" {
  name      = "pokedex-webapp"
  framework = "create-react-app"

  dev_command    = "npm run dev"
  build_command  = "npm run build"
}

resource "vercel_deployment" "pokedex-deploy" {
  project_id  = vercel_project.pokedex-webapp.id
  files       = data.vercel_project_directory.pokedex-dir.files
  path_prefix = data.vercel_project_directory.pokedex-dir.path
  production  = true
}