require 'rails_helper'

RSpec.describe "/user_preferences", type: :request do
  # This should return the minimal set of attributes required to create a valid
  # UserPreference. As you add validations to UserPreference, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    # skip("Add a hash of attributes valid for your model")
    {view_customers: "profile", view_invoices: "profile", view_products: "profile", theme: "dark" }
  }

  let(:invalid_attributes) {
    # skip("Add a hash of attributes invalid for your model")
    {view_doesntexist: "profile", view_profile: "blah"}
  }

  # This should return the minimal set of values that should be in the headers
  # in order to pass any filters (e.g. authentication) defined in
  # UserPreferencesController, or in your router and rack
  # middleware. Be sure to keep this updated too.
  let(:valid_headers) {
    {}
  }

  before do
    @user = create(:user)
    sign_in @user
    @user_preference = UserPreference.create!({**valid_attributes, user_id: @user.id})
  end

  describe "GET /index" do
    it "renders a successful response" do
      get users_user_preferences_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get users_user_preference_url(@user_preference.id), as: :json
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new UserPreference" do
        user = create(:user)
        expect {
          post users_user_preferences_url,
               params: { user_preference: {**valid_attributes, user_id: user.id}}, headers: valid_headers, as: :json
        }.to change(UserPreference, :count).by(1)
      end

      it "renders a JSON response with the new user_preference" do
        user = create(:user)

        post users_user_preferences_url,
             params: { user_preference: {**valid_attributes, user_id: user.id} }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end

    context "with invalid parameters" do
      it "does not create a new UserPreference" do
        expect {
          post users_user_preferences_url,
               params: { user_preference: invalid_attributes }, as: :json
        }.to change(UserPreference, :count).by(0)
      end

      it "renders a JSON response with errors for the new user_preference" do
        post users_user_preferences_url,
             params: { user_preference: invalid_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "PATCH /update" do
    before do
      @user_preference = UserPreference.create({**valid_attributes, user_id: @user.id})
    end

    context "with valid parameters" do
      let(:new_attributes) {
        # skip("Add a hash of attributes valid for your model")
        {view_customers: "table" }
      }

      it "updates the requested user_preference" do
        patch users_user_preference_url(@user_preference),
              params: { user_preference: new_attributes }, as: :json
        expect(JSON.parse(response.body)["view_customers"]).to eq("table")
      end

      it "renders a JSON response with the user_preference" do
        patch users_user_preference_url(@user_preference),
              params: { user_preference: new_attributes }, headers: valid_headers, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to match(a_string_including("application/json"))
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user_preference" do
      user_preference = UserPreference.create!({**valid_attributes, user_id: @user.id})
      expect {
        delete users_user_preference_url(user_preference), headers: valid_headers, as: :json
      }.to change(UserPreference, :count).by(-1)
    end
  end
end
