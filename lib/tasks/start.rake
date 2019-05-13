namespace :start do
  task :development do
    exec 'foreman start -f Procfile.dev'
  end

  desc 'Start production server'
  task :production do
    exec 'NPM_CONFIG_PRODUCTION=true npm run postinstall && foreman start'
  end

  desc 'Start production local server'
  task :production_local do
    exec 'NPM_CONFIG_PRODUCTION=true npm run deploy:local && foreman start -f Procfile.production.local'
  end
end

desc 'Start development server'
task :start => 'start:development'