class ApplicationController < ActionController::API
  before_action :authenticate_user!
  before_action :set_current_user

  private

  def set_current_user
    @user = current_user
  end
end
