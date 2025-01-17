# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  include SkipAuth
  respond_to :json
  before_action :configure_sign_up_params, only: [:create,]
  before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    super
    params["user"]["roles"].each do |role|
      resource.roles.push(role)
    end

    if resource.save
      UserPreference.create(user_id: resource.id, theme:"dark")
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up) do |user_params|
      user_params.permit({roles: []}, :name, :email, :password, :password_confirmation)
    end
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    # devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
    devise_parameter_sanitizer.permit(:account_update) do |user_params|
      user_params.permit({roles: []}, :name, :email, :current_password)
    end
  end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  def not_updated?(resource)
    Time.current - resource.updated_at > 1;
  end

  private

  def serailized_user(user)
    u = UserSerializer.new(user).serializable_hash[:data][:attributes]
    u[:preferences] = UserPreferenceSerializer.new(user.user_preference).serializable_hash[:data][:attributes]
    return u;
  end

  def respond_with(resource, _opts = {})
  puts "self", self
    if request.method == "POST" && resource.persisted?
      render json: {
        status: {code: 200, message: "Signed up sucessfully."},
        data: serailized_user(resource)
      }, status: :ok
    elsif request.method == "POST" && !resource.persisted?
      render json: {
        status: {code: 422, message: "Failed to create account.", error: "#{resource.errors.full_messages.to_sentence}"},
      }, status: :ok
    elsif request.method == "DELETE"
      render json: {
        status: { code: 200, message: "Account deleted successfully."}
      }, status: :ok
    elsif request.method == "PATCH" && self.not_updated?(resource)
      render json: {
        status: { code: 422, message: "Failed to updated account.", error: "#{resource.errors.full_messages.to_sentence}"},
        data: serailized_user(resource)
      }, status: :ok
    elsif request.method == "PATCH" && resource.persisted?
      render json: {
        status: { code: 200, message: "Account updated successfully."},
        data: serailized_user(resource)
      }, status: :ok
    else
      render json: {
        status: {code: 422, message: "An error occured. #{resource.errors.full_messages.to_sentence}"}
      }, status: :unprocessable_entity
    end
  end
end
