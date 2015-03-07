class Product
  include DatabaseMethods
  extend ClassMethods
  
  attr_reader :id
  attr_accessor :general_info, :technical_specs, :where_to_buy
  
  def initialize(options)
    @id = options["id"]
    @general_info = options["general_info"]
    @technical_specs = options["technical_specs"]
    @where_to_buy = options["where_to_buy"]
  end#method end
   
end#classend