import express from "express";

import { client } from "../app";

const Router = express.Router();

Router.get("/getUsers", async (req, res) => {
  try {
    const query1 = `SELECT * FROM users_users_id WHERE user_id=1`;
    const result1 = await client.execute(query1);
    const data1 = result1.rows;

    const query2 = `SELECT * FROM users_users_number WHERE user_number='U666'`;
    const result2 = await client.execute(query2);
    const data2 = result2.rows;

    const data = [...data1, ...data2];
    return res.json({ success: true, data: data });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

Router.post("/getAccounts", async (req, res) => {
  try {
    const { user_id } = req.body.data;
    const query = `SELECT * from accounts_user_id WHERE user_id=${user_id}`;

    const result = await client.execute(query);
    const data = result.rows;
    console.log(data, "dat");

    return res.json({ success: true, data: data });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

Router.post("/getCards", async (req, res) => {
  try {
    const { account_id } = req.body.data;
    const query = ` SELECT * FROM credit_cards WHERE account_id=${account_id}`;

    const result = await client.execute(query);
    const data = result.rows;
    console.log(data, "dat cards");

    return res.json({ success: true, data: data });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

export default Router;

// //=============================================
// //=============================================
// //=============================================
// DROP TABLE IF EXISTS users_users_id;
// CREATE TABLE IF NOT EXISTS users_users_id(
//     user_id INT,
//     user_number VARCHAR,
//     name VARCHAR,
//     age INT,
//     PRIMARY KEY (user_id)
// );

// //=============================================
// DROP TABLE IF EXISTS users_users_number;
// CREATE TABLE IF NOT EXISTS users_users_number(
//     user_id INT,
//     user_number VARCHAR,
//     name VARCHAR,
//     age INT,
//     PRIMARY KEY (user_number)
// );
// CREATE INDEX useridx_id on users_users_number (user_id);
// //===================INSERTS===================
// BEGIN BATCH
//     INSERT INTO users_users_id(user_id, user_number, name, age) VALUES (1, 'U123', 'John', 55);
//     INSERT INTO users_users_id(user_id, user_number, name, age) VALUES (2, 'U666', 'Tom', 45);
// APPLY BATCH;
// //-----------------------------------------------------------------
// BEGIN BATCH
//     INSERT INTO users_users_number(user_id, user_number, name, age) VALUES (1, 'U123', 'John', 55);
//     INSERT INTO users_users_number(user_id, user_number, name, age) VALUES (2, 'U666', 'Tom', 45);
// APPLY BATCH;
// //=============================================
// //=============================================
// //=============================================
// DROP TABLE IF EXISTS accounts_account_id;
// CREATE TABLE accounts_account_id(
//     account_id INT,
//     user_id INT,
//     PRIMARY KEY (account_id)
// );
// DROP TABLE IF EXISTS accounts_user_id;
// CREATE TABLE accounts_user_id(
//     account_id INT,
//     user_id INT,
//     PRIMARY KEY (user_id, account_id)
// );
// -- CREATE INDEX useridx on accounts (user_id);
// //==================INSERTS====================
// BEGIN BATCH
//     INSERT INTO accounts_account_id(account_id, user_id) VALUES (11, 1);
//     INSERT INTO accounts_account_id(account_id, user_id) VALUES (22, 1);
//     INSERT INTO accounts_account_id(account_id, user_id) VALUES (33, 2);
//     INSERT INTO accounts_account_id(account_id, user_id) VALUES (44, 2);
// APPLY BATCH;
// //=============================================
// BEGIN BATCH
//     INSERT INTO accounts_user_id(account_id, user_id) VALUES (11, 1);
//     INSERT INTO accounts_user_id(account_id, user_id) VALUES (22, 1);
//     INSERT INTO accounts_user_id(account_id, user_id) VALUES (33, 2);
//     INSERT INTO accounts_user_id(account_id, user_id) VALUES (44, 2);
// APPLY BATCH;
// //=============================================
// //=============================================
// //=============================================
// DROP TABLE IF EXISTS credit_cards_account_id;
// CREATE TABLE IF NOT EXISTS credit_cards_account_id (
//     card_id INT,
//     account_id INT,
//     balance FLOAT,
//     PRIMARY KEY (account_id, card_id)
// );
// //===================INSERTS===================
// BEGIN BATCH
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (1, 11, 300.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (2, 11, 100.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (3, 22, 300.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (4, 22, 100.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (5, 33, 300.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (6, 33, 100.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (7, 44, 300.0);
//     INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (8, 44, 100.0);
// APPLY BATCH;
// //=============================================
// //=============================================
// //=============================================

// //==============QUERIES=================
// // Saskaitos pagal saskaitos numeri
// SELECT * FROM accounts_account_id WHERE account_id=11;
//+ // Saskaitos pagal klienta
//+ SELECT * from accounts_user_id WHERE user_id=1;
//+ // Klientai pagal ID
//+ SELECT * FROM users_users_id WHERE user_id=1;
//+ // Klientai pagal koda
//+ SELECT * FROM users_users_number WHERE user_number='U666';
// // Kredito korteles pagal ID
// SELECT * FROM credit_cards WHERE card_id=4;
// // Saskaitos numeris pagal korteles ID
// SELECT account_id FROM credit_cards WHERE card_id=3 ;

// SELECT SUM(balance) as s FROM credit_cards WHERE account_id=11;
// //=============================================

// //==============QUERIES=================
// BEGIN BATCH
//     UPDATE credit_cards
//     SET balance = 400
//     WHERE card_id = 1;
// //-----------------------------
//     UPDATE credit_cards
//     SET balance = 600
//     WHERE card_id = 2;
// APPLY BATCH;
// //=============================================
