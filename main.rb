require 'rubygems'
require 'bundler/setup'
Bundler.require(:default)
require 'active_support/inflector'
DATABASE = SQLite3::Database.new("products.db")
require_relative "models/model_db_methods.rb"
require_relative "database/database-setup.rb"
require_relative "models/product.rb"


get "/" do
  erb :homepage
end

get "/products/all" do
  @products = Product.get_range(0)
  erb :"product_view"
end

post "/products/next" do
  Product.get_range_array(params["range"]).to_json
end

post "/products/" do
  @products = Product.find(params["id"])
  erb :"product_view"
end

get "/products/new" do
  erb :"new_product"
end

post "/create-product" do
  Product.new(params).insert
  redirect "/products/all"
end

post "/products/edit" do
  @product = Product.find(params["id"])
  erb :"edit_product"
end

post "/confirm-edit" do
  product = Product.find(params["id"])
  product.edit(params)
  product.save
  redirect "/products/all"
end

post "/products/delete" do
  product = Product.find(params["id"])
  product.delete
  redirect "/products/all"
end

