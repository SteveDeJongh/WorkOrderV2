class Users::UserPreferencesController < ApplicationController
  before_action :set_user_preference, only: %i[ show update destroy ]

  # GET /user_preferences
  def index
    @user_preferences = UserPreference.all

    render json: @user_preferences
  end

  # GET /user_preferences/1
  def show
    render json: @user_preference
  end

  # POST /user_preferences
  def create
    @user_preference = UserPreference.new(user_preference_params)

    if @user_preference.save
      render json: @user_preference, status: :created
    else
      render json: @user_preference.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_preferences/1
  def update
    if @user_preference.update(user_preference_params)
      render json: serialized_preferences(@user_preference)
    else
      render json: @user_preference.errors, status: :unprocessable_entity
    end
  end

  # DELETE /user_preferences/1
  def destroy
    @user_preference.destroy!
  end

  private
    def serialized_preferences(preferences)
      UserPreferenceSerializer.new(preferences).serializable_hash[:data][:attributes]
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_user_preference
      @user_preference = UserPreference.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_preference_params
      params.require(:user_preference).permit(:user_id, :view_customers, :view_products, :view_invoices, :theme, :customer_columns, :product_columns, :invoice_columns)
    end
end
