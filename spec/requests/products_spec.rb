require 'rails_helper'

describe 'Products API', type: :request do
  describe "/api/v1/products" do
    it "returns 201 ok when requesting products" do
      user = build(:user)
      sign_in user
      # get '/api/v1/products'
      get api_v1_products_path # Alternate syntax instead of actual path above.
      expect(response).to have_http_status(:success)
    end

    it "Returns a 401 if not signed in" do
      get '/api/v1/products'
      expect(response).to have_http_status(401)
    end

    it "return the 2 created products" do
      products = 2.times {|x| create(:product)}
      user = build(:user)
      sign_in user
      get api_v1_products_path
      expect(JSON.parse(response.body).length).to eq(2)
    end
  end

  describe "/api/v1/product/:id" do
    it "Returns only the product with id of 2" do
      products = 2.times {|x| create(:product)}
      user = build(:user)
      sign_in user
      get api_v1_product_path(id: 2)
      expect(JSON.parse(response.body)["id"]).to eq(2)
    end

    it "returns as 404 if product id doesn't exist" do
      products = 2.times {|x| create(:product)}
      user = build(:user)
      sign_in user
      get api_v1_product_path(id: 3)
      expect(response).to have_http_status(404)
    end
  end

  describe "/api/v1/products POST" do
    it "creates a product" do
      tax_rate = create(:tax_rate)
      product = attributes_for(:product)
      product[:tax_rate_id] = tax_rate.id
      user = build(:user)
      sign_in user
      post api_v1_products_path(:params => {:product => product})
      expect(response).to have_http_status(:created)
    end

    it "raises an error when product is invalid" do
      product = attributes_for(:product)
      user = build(:user)
      sign_in user
      post api_v1_products_path(:params => {:product => product})
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "/api/v1/products/:id PATCH" do
    it "updates a product" do
      product = create(:product)
      user = build(:user)
      sign_in user
      newName = "Updated name!"
      patch "/api/v1/products/1", :params => {:id => 1, :product => {name: newName}}
      expect(JSON.parse(response.body)["name"]).to eq(newName)
      expect(response).to have_http_status(:ok)
    end

    it "fails to update with invalid properties" do
      product = create(:product)
      user = build(:user)
      sign_in user
      patch "/api/v1/products/1", :params => {:id => 1, :product => {name: nil}}
      puts response.status
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "/api/v1/products/:id DELETE" do
    it "deletes a product" do
      product = create(:product)
      user = build(:user)
      sign_in user
      delete "/api/v1/products/1", :params => {:id => 1}
      expect(response).to have_http_status(:no_content)
    end
  end
end
