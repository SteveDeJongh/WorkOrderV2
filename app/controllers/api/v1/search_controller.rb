class Api::V1::SearchController < ApplicationController
  def customers
    @customers = Customer.where('firstName LIKE ? OR lastName LIKE ? OR phone LIKE ?', "%#{params[:q]}%", "%#{params[:q]}%", "%#{params[:q]}%")

    render json: @customers
  end
end
