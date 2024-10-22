class ChangeInvoiceLineTaxRateToTaxRateId < ActiveRecord::Migration[7.1]
  def change
    change_table :invoice_lines do |t|
      t.rename :tax_rate, :tax_rate_id
    end
  end
end
