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

    return res.json({ success: true, data: data });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

Router.post("/getBalance", async (req, res) => {
  try {
    const { account_id } = req.body.data;
    const query = `SELECT SUM(balance) FROM credit_cards_account_id WHERE account_id=${account_id}`;

    const result = await client.execute(query);
    const data = result.rows;

    return res.json({ success: true, data: data });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

Router.post("/getCards", async (req, res) => {
  try {
    const { account_id } = req.body.data;
    const query = ` SELECT * FROM credit_cards_account_id WHERE account_id=${account_id}`;

    const result = await client.execute(query);
    const data = result.rows;

    return res.json({ success: true, data: data });
  } catch (e) {
    return res.json({ success: false, error: e });
  }
});

Router.post("/addAccount", async (req, res) => {
  try {
    const { account_id, selectedUserId } = req.body.data;
    const query1 = `INSERT INTO accounts_account_id(account_id, user_id) VALUES(${account_id}, ${selectedUserId}) IF NOT EXISTS`;
    const query2 = `INSERT INTO accounts_user_id(account_id, user_id) VALUES (${account_id}, ${selectedUserId}) IF NOT EXISTS`;
    let insert1 = client.execute(query1);
    let insert2 = client.execute(query2);
    let [response1, respnose2] = [await insert1, await insert2];
    const data1 = response1.rows;
    const data2 = respnose2.rows;
    console.log(data1, data2, "dat cards");
    if (data1[0]["[applied]"] == true && data2[0]["[applied]"] == true)
      return res.json({ success: true });
    else return res.json({ success: false });
  } catch (e) {
    console.log("ADD ACC ERR", e);
    return res.json({ success: false, error: e });
  }
});

Router.post("/addCard", async (req, res) => {
  try {
    const { card_id, account_id, balance } = req.body.data;
    console.log(card_id, account_id, balance, "GET ADD CARD DATA");
    const query1 = `INSERT INTO credit_cards_account_id(card_id, account_id, balance) VALUES (${card_id}, ${account_id}, ${balance}) IF NOT EXISTS`;
    const query2 = `INSERT INTO credit_cards_card_id(card_id, account_id, balance) VALUES (${card_id}, ${account_id}, ${balance}) IF NOT EXISTS`;

    let insert1 = client.execute(query1);
    let insert2 = client.execute(query2);
    let [response1, respnose2] = [await insert1, await insert2];
    const data1 = response1.rows;
    const data2 = respnose2.rows;
    console.log(data1, data2, "dat cards CARD INSERT");
    if (data1[0]["[applied]"] == true && data2[0]["[applied]"] == true)
      return res.json({ success: true });
    else return res.json({ success: false });
  } catch (e) {
    console.log("ADD ACC ERR", e);
    return res.json({ success: false, error: e });
  }
});

export default Router;
