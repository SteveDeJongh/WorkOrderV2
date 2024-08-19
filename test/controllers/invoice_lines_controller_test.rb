require "test_helper"

class InvoiceLinesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @invoice_line = invoice_lines(:one)
  end

  test "should get index" do
    get invoice_lines_url, as: :json
    assert_response :success
  end

  test "should create invoice_line" do
    assert_difference("InvoiceLine.count") do
      post invoice_lines_url, params: { invoice_line: { discount_percentage: @invoice_line.discount_percentage, invoice_id: @invoice_line.invoice_id, line_tax: @invoice_line.line_tax, line_total: @invoice_line.line_total, price: @invoice_line.price, product_id: @invoice_line.product_id, quantiy: @invoice_line.quantiy, tax_rate: @invoice_line.tax_rate } }, as: :json
    end

    assert_response :created
  end

  test "should show invoice_line" do
    get invoice_line_url(@invoice_line), as: :json
    assert_response :success
  end

  test "should update invoice_line" do
    patch invoice_line_url(@invoice_line), params: { invoice_line: { discount_percentage: @invoice_line.discount_percentage, invoice_id: @invoice_line.invoice_id, line_tax: @invoice_line.line_tax, line_total: @invoice_line.line_total, price: @invoice_line.price, product_id: @invoice_line.product_id, quantiy: @invoice_line.quantiy, tax_rate: @invoice_line.tax_rate } }, as: :json
    assert_response :success
  end

  test "should destroy invoice_line" do
    assert_difference("InvoiceLine.count", -1) do
      delete invoice_line_url(@invoice_line), as: :json
    end

    assert_response :no_content
  end
end
