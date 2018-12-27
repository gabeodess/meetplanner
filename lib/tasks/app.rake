namespace :app do

  desc "Copies git hooks to .git/hooks"
  task install: [:environment, "install:pre_push", "install:pre_commit"]

  namespace :install do

    desc "Copies pre-commit to .git/hooks/pre-push"
    task pre_push: :environment do
      copy_git_hook('pre-push')
    end

    desc "Copies pre-commit to .git/hooks/pre-commit"
    task pre_commit: :environment do
      copy_git_hook('pre-commit')
    end

  end

  def copy_git_hook(source)
    `cp #{Rails.root.join('lib/git-hooks', source)} #{Rails.root.join(".git/hooks/")}`
  end

end
