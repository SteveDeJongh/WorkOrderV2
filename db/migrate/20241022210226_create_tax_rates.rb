class CreateTaxRates < ActiveRecord::Migration[7.1]
  def change
    create_table :tax_rates do |t|
      t.float :percentage

      t.timestamps
    end
  end
end
