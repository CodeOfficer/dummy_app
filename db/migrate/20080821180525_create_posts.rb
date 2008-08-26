class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.string :title
      t.text :body
      t.boolean :published
      t.integer :comments_count, :default => 0
      t.timestamps
    end
  end

  def self.down
    drop_table :posts
  end
end
