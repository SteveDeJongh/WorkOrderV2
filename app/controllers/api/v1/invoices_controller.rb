class Api::V1::InvoicesController < ApplicationController
  before_action :set_invoice, only: %i[ show update destroy ]

  # GET /invoices
  def index
    @invoices = Invoice.all.sort_by {|invoice| -invoice.id}

    render json: @invoices
  end

  # GET /invoices/1
  def show
    render json: @invoice.as_json(include: [{
      invoice_lines: {
        include: [{
          product: {
            include:
              [:tax_rate]
            }
          }]
        }
        }, {
        payments: {}
        }
      ])
  end

  # POST /invoices
  def create
    workingParams = invoice_params;

    # Update Invoice Lines
    if workingParams[:invoice_lines_attributes]
      workingParams[:invoice_lines_attributes].map! do |line|
        line = recalculateInvoiceLine(line);
        # Removing extra properties on line for update.
        removeExtraProps(line, ["product", "updated_at", "created_at"])
      end
    end

    # Update payment if there are payments
    if workingParams[:payments_attributes]
      workingParams[:payments_attributes].map! do |payment|
        removeExtraProps(payment, ["created_at", "updated_at"])
      end
    end

    @invoice = Invoice.new(workingParams)

    has_lines = !workingParams[:invoice_lines_attributes].empty? || !workingParams[:payments_attributes].empty?

    InvoiceService.new(@invoice, has_lines).calculateInvoiceTotals

    if @invoice.save
      # Created invoice movements if the invoice saves, status is closed, and we have lines.
      if (@invoice.status === "closed" && has_lines)
        InvoiceService.new(@invoice, has_lines, @user).createInvoiceLineMovements
      end

      render json: @invoice.as_json(include: [{
        invoice_lines: {
          include: [{
            product: {
              include:
                [:tax_rate]
              }
            }]
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

      if (@invoice.status === "closed" && has_lines)
        InvoiceService.new(@invoice, has_lines, @user).createInvoiceLineMovements
      end

      @invoice.save
      render json: @invoice.as_json(include: [{
        invoice_lines: {
          include: [{
            product: {
              include:
                [:tax_rate]
              }
            }]
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
        :sub_total,
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
        :movement_created,
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
          :created_at,
          :updated_at,
          :tax_rate_id,
          :tax_rate => [
            :id,
            :percentage,
            :created_at,
            :updated_at
            ],
          ],
        ],
       payments_attributes: [:id, :method, :invoice_id, :amount, :created_at, :updated_at, :_destroy, :change]
       )
    end

    def recalculateInvoiceLine(line)
      # This is currently trusting that the `product` and `tax_rate` data received from the front-end is still up to date. The front end will only receive `product` and `tax_rate` data when the invoice is refetched. If a product or tax rate are changed between an invoice being loaded and updated, it could calculate incorrectly.
      subtotal = line[:product][:price].to_f
      discountDollars = line[:product][:price].to_f * (line[:discount_percentage].to_f/100)
      line[:line_total] = (subtotal - discountDollars) * line[:quantity].to_f
      line[:line_tax] = line[:line_total].to_f * line[:product][:tax_rate][:percentage].to_f
      return line
    end

    def removeExtraProps(resource, props)
      resource.select do |k|
        !props.include?(k)
      end
    end
end
