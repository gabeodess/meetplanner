namespace :app do

  desc "Copies git hooks to .git/hooks"
  task install: :environment do
    `cp #{Rails.root.join("lib/git_hooks/pre-push")} #{Rails.root.join(".git/hooks/")}`
  end

end
