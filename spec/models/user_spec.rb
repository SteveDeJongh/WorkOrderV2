require 'rails_helper'
require_relative '../../app/models/user'

RSpec.describe User, type: :model do
  describe '#user' do
    it "is an admin" do
      user = User.new(roles: ['admin'])
      expect(user.roles).to include("admin")
    end

    it "is not an admin" do
      user = User.new(roles: ['user', 'manager'])
      expect(user.roles).not_to include("admin")
    end
  end
end
