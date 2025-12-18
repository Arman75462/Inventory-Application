import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    color VARCHAR(7) NOT NULL,
      CHECK (color ~ '^#[0-9A-Fa-f]{6}$')
);

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    quantity INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    description VARCHAR(255) NOT NULL,
    emoji VARCHAR(4) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

INSERT INTO categories (name, color)
VALUES 
    ('Fruits', '#FF7043'),
    ('Vegetables', '#66BB6A'),
    ('Dairy', '#FFD54F'),
    ('Snacks', '#AB47BC'),
    ('Bakery', '#FFB74D'),
    ('Beverages', '#29B6F6'),
    ('Meat', '#E53935'),
    ('Seafood', '#26C6DA'),
    ('Frozen', '#5C6BC0'),
    ('Condiments', '#FFA726'),
    ('Grains / Pasta', '#8D6E63'),
    ('Nuts / Seeds', '#FF8A65'),
    ('Desserts', '#EC407A'),
    ('Canned Goods', '#42A5F5'),
    ('Supplements', '#66BB6A');

INSERT INTO products (name, quantity, price, description, emoji, category_id)
VALUES
    -- Fruits
    ('Apple', 90, 1.15, 'Keeps doctors away. Dentists… not so much.', '🍎', 1),
    ('Banana', 120, 0.89, 'Portable energy in a yellow jacket.', '🍌', 1),
    ('Orange', 110, 1.09, 'Vitamin C in spherical form.', '🍊', 1),
    ('Strawberry', 60, 2.99, 'Tiny red hearts that taste like summer.', '🍓', 1),
    ('Grapes', 70, 2.49, 'Nature’s candy. No wrapper needed.', '🍇', 1),

    -- Vegetables
    ('Carrot', 100, 1.05, 'Orange sticks of crunch and confidence.', '🥕', 2),
    ('Broccoli', 80, 1.79, 'Looks like trees, tastes like health.', '🥦', 2),
    ('Tomato', 110, 1.29, 'A fruit in denial.', '🍅', 2),
    ('Lettuce', 90, 1.19, 'Basically crunchy water.', '🥬', 2),
    ('Cucumber', 85, 1.15, '98% water, 100% chill vibes.', '🥒', 2),

    -- Dairy
    ('Milk', 120, 2.49, 'Classic bone juice.', '🥛', 3),
    ('Cheddar Cheese', 60, 4.99, 'The king of sandwiches and nachos.', '🧀', 3),
    ('Yogurt', 100, 1.29, 'Milk but thicker and with personality.', '🥣', 3),
    ('Butter', 70, 3.49, 'Makes everything unhealthy and delicious.', '🧈', 3),
    ('Cream Cheese', 50, 3.19, 'Spreadable happiness.', '🍶', 3),

    -- Snacks
    ('Fries', 200, 2.99, 'Bet you can’t eat just one. (You won’t.)', '🍟', 4),
    ('Chocolate Bar', 180, 1.49, 'Instant serotonin.', '🍫', 4),
    ('Popcorn', 150, 1.99, 'Movie night’s best friend.', '🍿', 4),
    ('Pretzels', 130, 2.29, 'Twisted dough with big personality.', '🥨', 4),
    ('Trail Mix', 100, 3.49, 'Healthy… until you eat all the chocolate bits.', '🥜', 4),

    -- Bakery
    ('Bread Loaf', 120, 2.49, 'Fluffy carb cloud.', '🍞', 5),
    ('Croissant', 70, 1.99, 'Buttery French excellence.', '🥐', 5),
    ('Donut', 90, 1.29, 'Deep-fried happiness with a hole.', '🍩', 5),
    ('Bagel', 80, 1.49, 'A donut that went to college.', '🥯', 5),
    ('Muffin', 100, 2.09, 'Cake pretending to be breakfast.', '🧁', 5),

    -- Beverages
    ('Water Bottle', 200, 0.99, 'Hydration, but make it portable.', '💧', 6),
    ('Orange Juice', 140, 2.99, 'Liquid sunshine.', '🧃', 6),
    ('Soda', 180, 1.49, 'The bubbly destroyer of diets.', '🥤', 6),
    ('Coffee', 160, 1.99, 'Liquid motivation.', '☕', 6),
    ('Tea', 150, 1.59, 'Calmness in a cup.', '🫖', 6),

    -- Meat
    ('Chicken Breast', 90, 6.49, 'The gym bro’s soulmate.', '🍗', 7),
    ('Ground Beef', 70, 5.99, 'Beefy goodness in crumbly form.', '🥩', 7),
    ('Bacon', 110, 4.49, 'The reason vegetarians struggle.', '🥓', 7),
    ('Pork Chops', 60, 5.59, 'Juicy slabs of deliciousness.', '🍖', 7),
    ('Steak', 50, 9.99, 'Fancy meat for fancy nights.', '🥩', 7),

    -- Seafood
    ('Salmon', 70, 8.99, 'Pink fish of protein glory.', '🐟', 8),
    ('Shrimp', 90, 7.49, 'Tiny ocean dudes you can eat.', '🦐', 8),
    ('Tuna', 100, 3.99, 'Fish but make it convenient.', '🐠', 8),
    ('Crab Legs', 40, 12.99, 'Fancy seafood you have to fight to eat.', '🦀', 8),
    ('Lobster', 30, 15.99, 'Expensive sea bug, tastes elite.', '🦞', 8),

    -- Frozen Foods
    ('Frozen Pizza', 80, 5.99, 'Fast, cheesy, and cold.', '🍕', 9),
    ('Ice Cream', 60, 4.49, 'Cold happiness.', '🍨', 9),
    ('Frozen Fries', 100, 3.49, 'Crispy potential in frozen form.', '🍟', 9),
    ('Frozen Vegetables Mix', 90, 2.99, 'Healthy straight from the freezer.', '🥦', 9),
    ('Frozen Chicken Nuggets', 110, 4.99, 'Childhood joy, adult guilt.', '🍗', 9),

    -- Condiments
    ('Ketchup', 120, 1.99, 'Tomato magic in a bottle.', '🍅', 10),
    ('Mustard', 100, 1.49, 'Yellow tang.', '🌭', 10),
    ('Mayonnaise', 80, 2.99, 'Egg-based confidence booster.', '🥪', 10),
    ('Soy Sauce', 100, 1.99, 'Salt with a PhD.', '🍶', 10),
    ('Hot Sauce', 90, 2.49, 'Pain, but delicious.', '🌶️', 10),

    -- Grains & Pasta
    ('Spaghetti', 90, 2.99, 'Italian classics at home.', '🍝', 11),
    ('Rice Bag', 100, 3.49, 'Staple of every meal.', '🍚', 11),
    ('Penne', 85, 2.79, 'Tube-shaped carb perfection.', '🍝', 11),
    ('Quinoa', 70, 4.99, 'Tiny grains with big ego.', '🌾', 11),
    ('Oats', 110, 3.19, 'Breakfast fuel for champions.', '🥣', 11),

    -- Nuts & Seeds
    ('Almonds', 150, 6.99, 'Crunchy brain fuel.', '🌰', 12),
    ('Walnuts', 120, 5.99, 'Tiny wrinkled powerhouses.', '🥜', 12),
    ('Cashews', 100, 6.49, 'Soft, buttery crunch.', '🥜', 12),
    ('Sunflower Seeds', 140, 2.99, 'Tiny seeds, infinite munching.', '🌻', 12),
    ('Pumpkin Seeds', 120, 3.49, 'Green crunch of confidence.', '🎃', 12),

    -- Desserts
    ('Cupcake', 80, 2.49, 'Sweetness in a wrapper.', '🧁', 13),
    ('Chocolate Cake', 50, 15.99, 'Decadent happiness.', '🍫', 13),
    ('Brownies', 70, 4.49, 'Dense chocolate squares of joy.', '🍫', 13),
    ('Cookies', 120, 2.99, 'Just one more… always.', '🍪', 13),

    -- Canned Goods
    ('Canned Tuna', 120, 3.49, 'Convenient protein.', '🐟', 14),
    ('Canned Beans', 100, 2.19, 'Fiber-filled goodness.', '🥫', 14),
    ('Canned Corn', 110, 1.89, 'Sweet kernels of convenience.', '🌽', 14),
    ('Canned Soup', 90, 2.99, 'Sad day saver.', '🥣', 14),
    ('Canned Tomatoes', 100, 2.29, 'Sauce starter pack.', '🍅', 14),
    
    -- Supplements
    ('Protein Powder', 60, 29.99, 'Gym in a scoop.', '💪', 15),
    ('Multivitamins', 90, 12.99, 'Daily life insurance.', '💊', 15),
    ('Creatine', 70, 19.99, 'Water weight, muscle dreams.', '🏋️', 15),
    ('Fish Oil Capsules', 80, 14.99, 'Omega-3 goodness.', '🐟', 15),
    ('Vitamin D', 100, 9.99, 'Sunshine in pill form.', '☀️', 15);
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
