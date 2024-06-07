class Api::V1::SearchController < ApplicationController
  def customers
    @customers = Customer.where('firstName LIKE ? OR lastName LIKE ? OR phone LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @customers
  end

  def products
    @products = Product.where('name LIKE ? OR sku LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @products
  end

  def inventory_movement
    @inventory_movements = InventoryMovement.all.select {|m| m.productID == params[:q].to_i}

    render json: @inventory_movements
  end
end
