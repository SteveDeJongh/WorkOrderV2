class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :created_at, :name, :roles

  attribute :created_date do |user|
    user.created_at && user.created_at.strftime('%m/%d/%Y')
  end
end

# UserSerializer.new(resource).serializable_hash[:data][:attributes].to_json
# And multiple records by,
# UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes].to_json}
