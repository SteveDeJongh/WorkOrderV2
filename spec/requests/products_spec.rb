require 'rails_helper'

describe 'Products API', type: :request do
  it "return alls products" do
    user = build(:user)
    sign_in user
    get '/api/v1/products'
    expect(response).to have_http_status(:success)
    # expect(1).to be(1)
  end

  it "Returns a 401 if not signed in" do
    user = build(:user)

    get '/api/v1/products'
    expect(response).to have_http_status(401)
  end
end
