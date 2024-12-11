require "test_helper"

class Api::V1::SearchControllerTest < ActionDispatch::IntegrationTest
  test "should get customers" do
    get api_v1_search_customers_url
    assert_response :success
  end
end
