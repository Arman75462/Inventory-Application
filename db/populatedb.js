import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR(7) NOT NULL
        CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    emoji VARCHAR(1) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
); 

INSERT INTO categories (name, color)
VALUES 
    ('Fruits', '#FF6F61'),
    ('Vegetables', '#4CAF50'),
    ('Dairy', '#F5E6CC'),
    ('Snacks', '#9C27B0'),
    ('Bakery', '#D7A86E'),
    ('Beverages', '#42A5F5'),
    ('Meat', '#D84315'),
    ('Seafood', '#26C6DA');

INSERT INTO products (name, quantity, price, description, emoji, category_id)
VALUES
    ('Apple', 90, 1.15, 'Keeps doctors away. Dentists… not so much.', '🍎', 1),
    ('Banana', 120, 0.89, 'Portable energy in a yellow jacket.', '🍌', 1),
    ('Orange', 110, 1.09, 'Vitamin C in spherical form.', '🍊', 1),
    ('Strawberry', 60, 2.99, 'Tiny red hearts that taste like summer.', '🍓', 1),
    ('Grapes', 70, 2.49, 'Nature’s candy. No wrapper needed.', '🍇', 1),
    ('Carrot', 100, 1.05, 'Orange sticks of crunch and confidence.', '🥕', 2),
    ('Broccoli', 80, 1.79, 'Looks like trees, tastes like health.', '🥦', 2),
    ('Tomato', 110, 1.29, 'A fruit in denial.', '🍅', 2),
    ('Lettuce', 90, 1.19, 'Basically crunchy water.', '🥬', 2),
    ('Cucumber', 85, 1.15, '98% water, 100% chill vibes.', '🥒', 2),
    ('Milk', 120, 2.49, 'Classic bone juice.', '🥛', 3),
    ('Cheddar Cheese', 60, 4.99, 'The king of sandwiches and nachos.', '🧀', 3),
    ('Yogurt', 100, 1.29, 'Milk but thicker and with personality.', '🥣', 3),
    ('Butter', 70, 3.49, 'Makes everything unhealthy and delicious.', '🧈', 3),
    ('Cream Cheese', 50, 3.19, 'Spreadable happiness.', '🍶', 3),
    ('Chips', 200, 2.99, 'Bet you can’t eat just one. (You won’t.)', '🍟', 4),
    ('Chocolate Bar', 180, 1.49, 'Instant serotonin.', '🍫', 4),
    ('Popcorn', 150, 1.99, 'Movie night’s best friend.', '🍿', 4),
    ('Pretzels', 130, 2.29, 'Twisted dough with big personality.', '🥨', 4),
    ('Trail Mix', 100, 3.49, 'Healthy… until you eat all the chocolate bits.', '🥜', 4),
    ('Bread Loaf', 120, 2.49, 'Fluffy carb cloud.', '🍞', 5),
    ('Croissant', 70, 1.99, 'Buttery French excellence.', '🥐', 5),
    ('Donut', 90, 1.29, 'Deep-fried happiness with a hole.', '🍩', 5),
    ('Bagel', 80, 1.49, 'A donut that went to college.', '🥯', 5),
    ('Muffin', 100, 2.09, 'Cake pretending to be breakfast.', '🧁', 5),
    ('Water Bottle', 200, 0.99, 'Hydration, but make it portable.', '💧', 6),
    ('Orange Juice', 140, 2.99, 'Liquid sunshine.', '🧃', 6),
    ('Soda', 180, 1.49, 'The bubbly destroyer of diets.', '🥤', 6),
    ('Coffee', 160, 1.99, 'Liquid motivation.', '☕', 6),
    ('Tea', 150, 1.59, 'Calmness in a cup.', '🫖', 6),
    ('Chicken Breast', 90, 6.49, 'The gym bro’s soulmate.', '🍗', 7),
    ('Ground Beef', 70, 5.99, 'Beefy goodness in crumbly form.', '🥩', 7),
    ('Bacon', 110, 4.49, 'The reason vegetarians struggle.', '🥓', 7),
    ('Pork Chops', 60, 5.59, 'Juicy slabs of deliciousness.', '🍖', 7),
    ('Steak', 50, 9.99, 'Fancy meat for fancy nights.', '🥩', 7),
    ('Salmon', 70, 8.99, 'Pink fish of protein glory.', '🐟', 8),
    ('Shrimp', 90, 7.49, 'Tiny ocean dudes you can eat.', '🦐', 8),
    ('Tuna', 100, 3.99, 'Fish but make it convenient.', '🐠', 8),
    ('Crab Legs', 40, 12.99, 'Fancy seafood you have to fight to eat.', '🦀', 8),
    ('Lobster', 30, 15.99, 'Expensive sea bug, tastes elite.', '🦞', 8);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`,
    /*     ssl: {
      rejectUnauthorized: true,
    }, */
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
