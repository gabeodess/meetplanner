require 'simplecov'
SimpleCov.start 'rails' do
  add_filter '/app/channels/'
  add_filter '/app/jobs/application_job.rb'
  add_filter '/app/mailers/application_mailer.rb'
  minimum_coverage_by_file 90
end

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all
  include FactoryBot::Syntax::Methods
  # Add more helper methods to be used by all tests here...
end

class ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
end
