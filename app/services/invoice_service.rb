class InvoiceService
  def initialize(resource)
    @resource = resource
  end

  def calculateInvoiceTotals
    invoice_total = 0;
    tax_total = 0;
    payment_total = 0;

    if @resource.invoice_lines
        @resource.invoice_lines.each do |line|
          invoice_total += line.line_total.to_f;
          tax_total += line.line_tax.to_f;
        end
    end

    if @resource.payments
      @resource.payments.each do |payment|
        payment_total += payment.amount.to_f
      end
    end

    @resource.total = invoice_total
    @resource.tax = tax_total
    @resource.balance = invoice_total + tax_total - payment_total
  end
end