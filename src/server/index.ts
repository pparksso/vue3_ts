import express from "express";
import cors from "cors";
import { today, thisMonth, thisWeek, Post } from "../posts";
import bodyParser from "body-parser";
import { NewUser, User } from "../users";

const app = express();

app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisMonth, thisWeek];
const allUsers: User[] = [];

app.get("/posts", (req, res) => {
  res.json(allPosts);
});
app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allPosts.push(post);
  res.json(post);
});

app.post<{}, {}, NewUser>("/users", (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allUsers.push(user);
  const { password, ...rest } = user;
  res.json(rest);
});
app.listen(8000, () => {
  console.log("Listening on port 8000");
});
