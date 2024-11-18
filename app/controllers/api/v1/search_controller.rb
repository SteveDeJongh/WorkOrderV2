class Api::V1::SearchController < ApplicationController
  def customers
    @customers = Customer.where('first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @customers
  end

  def customerInvoices
    @invoices = Invoice.all.select {|i| i.customer_id == params[:q].to_i}

    render json: @invoices
  end

  def products
    @products = Product.where('name LIKE ? OR sku LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @products
  end

  def inventory_movement
    @inventory_movements = InventoryMovement.all.select {|m| m.product_id == params[:q].to_i}

    render json: @inventory_movements
  end

  def last_3_inventory_movements
    movements = InventoryMovement.all.select {|m| m.product_id == params[:q].to_i}
    if (movements.length > 1)
      @inventory_movements = movements.slice!(movements.length - 3, movements.length).reverse
    else
      @inventory_movements = movements
    end

    render json: @inventory_movements
  end

  def invoices
    @invoices = Invoice.where('id LIKE ?', "%#{params[:q]}%")

    render json: @invoices
  end
end
