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
    calculateTotals()

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
    puts "Made it to update invoice"
    if @invoice.update(invoice_params)
      render json: @invoice
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
      params.require(:invoice).permit(:id, :customer_id, :user_id, :total, :balance, :tax)
    end

    def calculateTotals
      puts "We're calling calculate totals"
      invoice_total = 0;
      tax_total = 0;
      @invoiceLines.each do |line|
        line.line_tax = line.line_total.to_f * line.tax_rate.percentage
        line.save
        invoice_total += line.line_total.to_f
        tax_total += line.line_tax.to_f
      end
      payment_total = 0;

      @payments.each do |payment|
        payment_total += payment.amount.to_f
      end

      @invoice.total = invoice_total
      @invoice.tax = tax_total
      @invoice.balance = invoice_total - payment_total

      @invoice.save
    end
end
