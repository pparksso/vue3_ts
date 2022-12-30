import express, { Request, Response } from "express";
import cors from "cors";
import { today, thisMonth, thisWeek, Post } from "../posts";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jsonwebtoken from "jsonwebtoken";
import { NewUser, User } from "../users";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const allPosts = [today, thisMonth, thisWeek];
const allUsers: User[] = [];

// 포스트 보내기
app.get("/posts", (req, res) => {
  res.json(allPosts);
});

// 새 포스트 저장
app.post<{}, {}, Post>("/posts", (req, res) => {
  const post = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allPosts.push(post);
  res.json(post);
});

const SECRET = "my-secret";
const COOKIE = "vuejs-jwt";

//인증 함수
function authenticate(id: string, req: Request, res: Response) {
  //1. 토큰 제작 및 서명(서명에는 인수가 필요함(첫번째:토큰으로 만들 것(객체 안), 두번째: 시크릿코드, 세번째: 옵션{issuer : 누가 제작했는지?, expiresIn: 유효기간} ))
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: "vuejs-course",
    expiresIn: "30 days",
  });
  //2. 제작하고 서명된 토큰을 쿠키에 저장
  res.cookie(COOKIE, token, { httpOnly: true });
}

//토큰 유효성 검사
app.get("/current-user", (req, res) => {
  //쿠키 요청, 가져와서 확인
  try {
    const token = req.cookies[COOKIE];
    const result = jsonwebtoken.verify(token, SECRET) as { id: string };
    console.log(result);
    res.json({ id: result.id });
  } catch (e) {
    res.status(404).end();
  }
});

//회원가입
app.post<{}, {}, NewUser>("/users", (req, res) => {
  const user: User = { ...req.body, id: (Math.random() * 100000).toFixed() };
  allUsers.push(user);
  authenticate(user.id, req, res);
  const { password, ...rest } = user;
  res.json(rest);
});

//로그인
app.post<{}, {}, NewUser>("/login", (req, res) => {
  const targetUser = allUsers.find((x) => x.username === req.body.username);
  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end();
  } else {
    authenticate(targetUser.id, req, res);
    res.status(200).end();
  }
});

//로그아웃
app.post("/logout", (req, res) => {
  //쿠키 업데이트
  res.cookie(COOKIE, "", { httpOnly: true });
  res.status(200).end();
});

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
