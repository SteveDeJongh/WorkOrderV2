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
      # puts "render results"
      # puts @invoice.as_json(include: [{
      #                                 invoice_lines: {
      #                                   include: [:product, :tax_rate]
      #                                 }
      #                                 }, {
      #                                   payments: {}
      #                                   }
      #                                ])
      # puts "After render Results"
      render json: @invoice.as_json(include: [{
        invoice_lines: {
          include: [:product, :tax_rate]
        }
        }, {
          payments: {}
          }
       ])
  end

  # @invoice.as_json(include: {
  #   invoice_lines: {
  #     include: [:product, :tax_rate]
  #   }
  # })

  # user.as_json(include: { posts: {
  #                          include: { comments: {
  #                                         only: :body } },
  #                          only: :title } })

  # POST /invoices
  def create
    @invoice = Invoice.new(invoice_params)

    InvoiceService.new(@invoice).calculateInvoiceTotals

    if @invoice.save
      render json: {invoice: @invoice, invoice_lines_attributes: @invoice.invoice_lines.as_json(include: [:product, :tax_rate]), payments_attributes: @invoice.payments}
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /invoices/1
  def update
    # Update Invoice Lines
    puts "Invoice Params"
    puts invoice_params();
    if invoice_params[:invoice_lines_attributes]
      invoice_params[:invoice_lines_attributes].each do |idx, line|
        line = recalculateInvoiceLine(line);
        # Removing extra properties on line for update.
        line = removeExtraProps(line, ["product", "tax_rate", "updated_at"])
        # Update each invoice line.
        # InvoiceLine.find(line[:id]).update(line)
      end
    end

    # Update payment if there are payments
    if invoice_params[:payments_attributes]
      invoice_params[:payments_attributes].each do |idx, payment|
        puts "payment"
        puts payment.inspect
        payment = removeExtraProps(payment, ["created_at", "updated_at"])
        # Payment.find(payment[:id]).update(payment)
      end
    end

    # calculateInvoiceTotals()
    InvoiceService.new(@invoice).calculateInvoiceTotals

    if @invoice.save
      puts "We in here"
      render json: {invoice: @invoice, invoice_lines_attributes: @invoice.invoice_lines.as_json(include: [:product, :tax_rate]), payments_attributes: @invoice.payments}
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
      :invoice_lines_attributes => [
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
       :payments_attributes => [:id, :method, :invoice_id, :amount, :created_at, :updated_at]
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
