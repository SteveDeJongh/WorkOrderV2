class Api::V1::InvoicesController < ApplicationController
  before_action :set_invoice, only: %i[ show update destroy ]

  # GET /invoices
  def index
    @invoices = Invoice.all

    render json: @invoices
  end

  # GET /invoices/1
  def show
      # render json: {invoice: @invoice, invoice_lines_attributes: @invoice.invoice_lines.as_json(include: [:product, :tax_rate]), payments_attributes: @invoice.payments}
      render json: @invoice.as_json(include: [{
        invoice_lines: {
          include: [:product, :tax_rate]
        }
        }, {
          payments: {}
          }
       ])
  end

  # POST /invoices
  def create
    @invoice = Invoice.new(invoice_params)

    InvoiceService.new(@invoice).calculateInvoiceTotals

    if @invoice.save
      render json: @invoice.as_json(include: [{
        invoice_lines: {
          include: [:product, :tax_rate]
        }
        }, {
          payments: {}
          }
       ])
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /invoices/1
  def update
    workingParams = invoice_params()

    # Update Invoice Lines
    if workingParams[:invoice_lines_attributes]
      workingParams[:invoice_lines_attributes].map! do |line|
        line = recalculateInvoiceLine(line);
        # Removing extra properties on line for update.
        removeExtraProps(line, ["product", "tax_rate", "updated_at", "created_at"])
      end
    end

    # Update payment if there are payments
    if workingParams[:payments_attributes]
      workingParams[:payments_attributes].map! do |payment|
        removeExtraProps(payment, ["created_at", "updated_at"])
      end
    end

    has_lines = !workingParams[:invoice_lines_attributes].empty? || !workingParams[:payments_attributes].empty?

    if @invoice.update(workingParams)
      # Update Invoice total amounts.
      InvoiceService.new(@invoice, has_lines).calculateInvoiceTotals
      @invoice.save
      render json: @invoice.as_json(include: [{
        invoice_lines: {
          include: [:product, :tax_rate]
        }
        }, {
          payments: {}
          }
       ])
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /invoices/1
  def destroy
    @invoice.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_invoice
      @invoice = Invoice.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def invoice_params
      params.require(:invoice).permit(
        :id,
        :customer_id,
        :total,
        :balance,
        :tax,
        :created_at,
        :updated_at,
        :status,
        :user_id,
      invoice_lines_attributes: [
        :invoice_id,
        :line_tax,
        :product_id,
        :tax_rate_id,
        :id,
        :discount_percentage,
        :price,
        :quantity,
        :line_total,
        :created_at,
        :updated_at,
        :product => [
          :id,
          :name,
          :description,
          :sku,
          :upc,
          :price,
          :cost,
          :stock,
          :min,
          :max,
          :inventory,
          :tax_rate_id,
          :created_at,
          :updated_at
          ],
        :tax_rate => [
          :id,
          :percentage,
          :created_at,
          :updated_at
          ]
        ],
       payments_attributes: [:id, :method, :invoice_id, :amount, :created_at, :updated_at, :_destroy]
       )
    end

    def recalculateInvoiceLine(line)
      subtotal = line[:product][:price].to_f
      discountDollars = line[:product][:price].to_f * (line[:discount_percentage].to_f/100)
      line[:line_total] = (subtotal - discountDollars) * line[:quantity].to_f
      line[:line_tax] = line[:line_total].to_f * line[:tax_rate][:percentage].to_f
      return line
    end

    def removeExtraProps(resource, props)
      resource.select do |k|
        !props.include?(k)
      end
    end
end
