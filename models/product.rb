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
  
  def to_hash
    self.instance_variables.each_with_object({}) { |var,hash| hash[var.to_s.delete("@")] = self.instance_variable_get(var) }
  end
  
  def self.get_range_array(start_num)
    DATABASE.execute("SELECT * FROM products LIMIT 10 OFFSET #{start_num}")   
  end
end#classend