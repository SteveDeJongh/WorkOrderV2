require 'rails_helper'

describe 'Products API', type: :request do
  describe "/api/v1/products" do
    before do
      2.times {|x| create(:product)}
    end

    describe "not authenticated" do
      it "Returns a 401 if not signed in" do
        get '/api/v1/products'
        expect(response).to have_http_status(401)
      end
    end

    describe "Authenticated" do
      before do
        user = build(:user)
        sign_in user
      end

      it "returns 201 ok when requesting products" do
        # get '/api/v1/products'
        get api_v1_products_path # Alternate syntax instead of actual path above.
        expect(response).to have_http_status(:success)
      end

      it "return the 2 created products" do
        get api_v1_products_path
        expect(JSON.parse(response.body).length).to eq(2)
      end

      describe "/api/v1/product/:id" do
        it "Returns only the product with id of 2" do
          get api_v1_product_path(id: 2)
          expect(JSON.parse(response.body)["id"]).to eq(2)
        end

        it "returns as 404 if product id doesn't exist" do
          get api_v1_product_path(id: 3)
          expect(response).to have_http_status(404)
        end
      end
    end
  end

  describe "/api/v1/products POST" do
    before do
      @tax_rate = create(:tax_rate)
      @product = attributes_for(:product)
      @product[:tax_rate_id] = @tax_rate.id
    end

    describe "authenticated" do
      before do
        user = build(:user)
        sign_in user
      end

      it "creates a product when valid" do
        post api_v1_products_path(:params => {:product => @product})
        expect(response).to have_http_status(:created)
      end

      it "raises an error when product is invalid" do
        product = attributes_for(:product)
        post api_v1_products_path(:params => {:product => product})
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    describe "un-authenticated" do
      it "raises an error when there's no user signed in" do
        post api_v1_products_path(:params => {:product => @product})
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "/api/v1/products/:id PATCH" do
    before do
      @product = create(:product)
    end

    describe "Authenticated" do
      before do
        user = build(:user)
        sign_in user
      end

      it "updates a product" do
        newName = "Updated name!"
        patch "/api/v1/products/1", :params => {:id => 1, :product => {name: newName}}
        expect(JSON.parse(response.body)["name"]).to eq(newName)
        expect(response).to have_http_status(:ok)
      end

      it "fails to update with invalid properties" do
        patch "/api/v1/products/1", :params => {:id => 1, :product => {name: nil}}
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end

    describe "Un-Authenticated" do
      it "fails when un-authenticated" do
        patch "/api/v1/products/1", :params => {:id => 1, :product => {name: nil}}
        expect(response).to have_http_status(401)
      end
    end
  end

  describe "/api/v1/products/:id DELETE" do
    before do
      @product = create(:product)
    end

    describe "authenticated" do
      before do
        user = build(:user)
        sign_in user
      end

      it "deletes a product" do
        delete "/api/v1/products/1", :params => {:id => 1}
        expect(response).to have_http_status(:no_content)
      end
    end

    describe "un-athenticated" do
      it "fails to deletes a product when not signed in" do
        delete "/api/v1/products/1", :params => {:id => 1}
        expect(response).to have_http_status(401)
      end
    end
  end
end
