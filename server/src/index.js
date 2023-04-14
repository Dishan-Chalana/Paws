import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(cors());
app.use(express.json());
//  getstream.io key and secret for online chat
const apiKey = "8sdjnb5cqnas";
const apiSecret =
  "p552mvqgd5yuzdqyajbmpfhxyjemrahcarkqpcsykfjvktwx9esfxfg4aw98jjhb";

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

//routes
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    res.json({
      token,
      userId,
      firstName,
      lastName,
      username,
      hashedPassword,
    });
  } catch (error) {
    res.json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //  validate user has an account
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return res.json({ message: "user not found" });

    const token = serverClient.createToken(users[0].id);

    const passwordMatch = await bcrypt.compare(
      password,
      users[0].hashedPassword
    );

    if (passwordMatch) {
      res.json({
        token,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        username,
        userId: users[0].id,
      });
    }
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
