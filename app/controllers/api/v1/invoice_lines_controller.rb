class Api::V1::InvoiceLinesController < ApplicationController
  before_action :set_invoice_line, only: %i[ show update destroy ]

  # GET /invoice_lines
  def index
    @invoice_lines = InvoiceLine.all

    render json: @invoice_lines
  end

  # GET /invoice_lines/1
  def show
    render json: @invoice_line
  end

  # POST /invoice_lines
  def create
    @invoice_line = InvoiceLine.new(invoice_line_params)

    if @invoice_line.save
      render json: @invoice_line, status: :created, location: @invoice_line
    else
      render json: @invoice_line.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /invoice_lines/1
  def update
    if @invoice_line.update(invoice_line_params)
      render json: @invoice_line
    else
      render json: @invoice_line.errors, status: :unprocessable_entity
    end
  end

  # DELETE /invoice_lines/1
  def destroy
    @invoice_line.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invoice_line
      @invoice_line = InvoiceLine.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def invoice_line_params
      params.require(:invoice_line).permit(:invoice_id, :product_id, :discount_percentage, :price, :quantity, :line_total, :line_tax)
    end
end
