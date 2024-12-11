FactoryBot.define do
  factory :invoice_line do
    invoice
    product
    discount_percentage {0}
    price {product.price}
    quantity {1}
    line_total {product.price * quantity}
    line_tax {product.price * product.tax_rate.percentage}
  end
end
