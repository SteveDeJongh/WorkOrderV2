class Api::V1::InventoryMovementsController < ApplicationController
  before_action :set_inventory_movement, only: %i[ show update destroy ]

  # GET /inventory_movements
  def index
    @inventory_movements = InventoryMovement.all

    render json: @inventory_movements
  end

  # GET /inventory_movements/1
  def show
    render json: @inventory_movement
  end

  # POST /inventory_movements
  def create
    @inventory_movement = InventoryMovement.new(inventory_movement_params)

    if @inventory_movement.save
      render json: @inventory_movement, status: :created, location: @inventory_movement
    else
      render json: @inventory_movement.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /inventory_movements/1
  def update
    if @inventory_movement.update(inventory_movement_params)
      render json: @inventory_movement
    else
      render json: @inventory_movement.errors, status: :unprocessable_entity
    end
  end

  # DELETE /inventory_movements/1
  def destroy
    @inventory_movement.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_inventory_movement
      @inventory_movement = InventoryMovement.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def inventory_movement_params
      params.require(:inventory_movement).permit(:relation, :adjustment, :change, :type, :userID)
    end
end
