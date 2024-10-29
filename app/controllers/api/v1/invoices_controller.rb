class Api::V1::InvoicesController < ApplicationController
  before_action :set_invoice, only: %i[ show update destroy ]

  # GET /invoices
  def index
    @invoices = Invoice.all

    render json: @invoices
  end

  # GET /invoices/1
  def show
    sleep 0.2

    @invoiceLines = @invoice.invoice_lines
    @payments = @invoice.payments
    calculateInvoiceTotals()

    render json: {invoice: @invoice, lines: @invoiceLines.as_json(include: [:product, :tax_rate]), payments: @payments}
  end

  # POST /invoices
  def create
    @invoice = Invoice.new(invoice_params)

    if @invoice.save
      render json: @invoice, status: :created, location: @invoice
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /invoices/1
  def update
    puts "Updating invoice"

    # Update Invoice Lines
    if invoice_params[:lines]
      invoice_params[:lines].each do |idx, line|
        recalculateInvoiceLine(line);
        # Removing extra properties on line for update.
        line = line.select do |key|
          !["product", "tax_rate", "updated_at"].include?(key)
        end
        # Update each invoice line.
        InvoiceLine.find(line[:id]).update(line)
      end
    end

    # Update payment if there are payments
    if invoice_params[:payments]
      invoice_params[:payments].each do |idx, payment|
        Payment.find(payment[:id]).update(payment)
      end
    end

    calculateInvoiceTotals()

    if @invoice.save
      render json: {invoice: @invoice, lines: @invoiceLines.as_json(include: [:product, :tax_rate]), payments: @payments}
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
      # params.require(:invoice).permit(:id, :customer_id, :user_id, :total, :balance, :tax)
      params.require(:invoiceData).permit(
      invoice: [:id, :customer_id, :total, :balance, :tax, :created_at, :updated_at, :status, :user_id],
      lines: [
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
        product: [
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
        tax_rate: [
          :id,
          :percentage,
          :created_at,
          :updated_at
          ]
        ],
       payments: [:id, :method, :invoice_id, :amount, :created_at, :updated_at]
       )
    end

    def calculateInvoiceTotals
      puts "We're calling calculate totals"
      invoice_total = 0;
      tax_total = 0;
      @invoice.invoice_lines.each do |line|
        invoice_total += line.line_total.to_f
        tax_total += line.line_tax.to_f
      end
      payment_total = 0;

      @invoice.payments.each do |payment|
        payment_total += payment.amount.to_f
      end

      @invoice.total = invoice_total
      @invoice.tax = tax_total
      @invoice.balance = invoice_total - payment_total
    end

    def recalculateInvoiceLine(line)
      subtotal = line[:product][:price].to_f
      discountDollars = (line[:product][:price].to_f * line[:discount_percentage].to_f/100)
      line[:line_total] = (subtotal - discountDollars) * line[:quantity].to_f
      line[:line_tax] = line[:lineTotal].to_f * line[:tax_rate][:percentage].to_f
    end
end
