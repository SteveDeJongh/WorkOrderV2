class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[ show update destroy ]

  # GET /products
  def index
    @products = Product.all

    render json: @products
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      InventoryMovement.create(productID: @product.id, relation: "adj", adjustment: true, change: @product.stock, changeType: "ProductCreation", userID: 1)
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    stockChange = determineStockDifference();

    if @product.update(product_params)
      if (stockChange != 0)
        InventoryMovement.create(productID: @product.id, relation: "adj", adjustment: true, change: stockChange, changeType: "ProductEdit", userID: 1)
      end
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:id, :name, :description, :sku, :upc, :price, :cost, :stock, :min, :max, :inventory, :taxrate)
    end

    def determineStockDifference()
      product_params()["stock"].to_i - @product.stock.to_i
    end
end
