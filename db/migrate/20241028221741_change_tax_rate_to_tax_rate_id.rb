class ChangeTaxRateToTaxRateId < ActiveRecord::Migration[7.1]
  def change
    change_table :products do |t|
      t.rename :tax_rate, :tax_rate_id
    end
  end
end
