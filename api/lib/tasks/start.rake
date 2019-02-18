task :start do
  exec 'foreman start -d ../ -p 3000'
end