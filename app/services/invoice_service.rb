class InvoiceService
  def initialize(invoice, has_lines, user = nil)
    @invoice = invoice
    @has_lines = has_lines
    @user = user
  end

  def calculateInvoiceTotals
    puts "We're calculating!"
    sub_total = 0;
    tax_total = 0;
    payment_total = 0;

    if @invoice.invoice_lines
        @invoice.invoice_lines.each do |line|
          sub_total += line.line_total.to_f;
          tax_total += line.line_tax.to_f;
        end
    end

    if @invoice.payments
      @invoice.payments.each do |payment|
        payment_total += payment.amount.to_f
      end
    end

    @invoice.sub_total = sub_total
    @invoice.tax = tax_total
    @invoice.total = sub_total + tax_total
    @invoice.balance = sub_total + tax_total - payment_total
    if (@has_lines)
      @invoice.status = @invoice.balance == 0 ? "closed" : "open";
    end
  end

  def createInvoiceLineMovements
    @invoice.invoice_lines.each { |line|
      if (!line.movement_created)
        MovementService.new(line.product, @user).record_invoice_line_movement(line)
        line.update(movement_created: true);
      end
    }
  end
end
