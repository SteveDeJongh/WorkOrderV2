class ApplicationController < ActionController::API
  before_action :authenticate_user!
  # before_action :say_hi
  # before_action :set_current_user
  # after_action :say_bye

  private

  # def set_current_user

  # end

  def say_hi
    puts "Hello from Before"
    puts session.inspect
    puts request.headers["Authorization"] # gets bearer token.
    if (:authenticate_user!)
      puts current_user.inspect
      puts("User Authenticated.")
    else
      puts("false")
    end
  end

  def say_bye
    puts "Hello from After!"
    if (:authenticate_user!)
      puts current_user.inspect
      puts("User Authenticated.")
    else
      puts("false")
    end
  end
end
