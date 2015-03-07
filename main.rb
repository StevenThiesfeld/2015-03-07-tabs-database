require "pry"
require "sqlite3"
DATABASE = SQLite3::Database.new("products.db")
require "active_support/inflector"
require_relative "models/model_db_methods.rb"
require "sinatra"
require "json"
require_relative "database/database-setup.rb"
require_relative "models/product.rb"




get "/" do
  erb :homepage
end

