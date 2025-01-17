# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  skip_before_action :set_current_user
  skip_before_action :authenticate_user!
  respond_to :json

  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    sleep 1 # Simulating API response delay
    login_result = catch(:warden) { super }
    return unless login_failed?(login_result)

    # Failed to sign in
    render json: {
      status: {code: 404, message: 'Email or Password incorrect.'},
    }, status: :ok
  end

  # DELETE /resource/sign_out
  def destroy
    super
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  def current_user_details
    if (current_user)
      render json: {
        message: "User for token found.",
        data: serailized_user(current_user),
      }, status: :ok
    else
      render json: {
        message: "No active session for that token.",
      }, status: :unauthorized
    end
  end

  private

  def login_failed?(login_result)
    login_result.is_a?(Hash) && login_result.key?(:scope) && login_result.key?(:recall)
  end

  def serailized_user(user)
    u = UserSerializer.new(user).serializable_hash[:data][:attributes]
    u[:preferences] = UserPreferenceSerializer.new(user.user_preference).serializable_hash[:data][:attributes]
    return u;
  end

  def respond_with(resource, _opts = {})
    render json: {
      status: {code: 200, message: 'Logged in sucessfully.'},
      data: serailized_user(resource)
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "Logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
