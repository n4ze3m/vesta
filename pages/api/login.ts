import * as bcrypt from "bcrypt";
import { database } from "lib/database";
import { withSessionRoute } from "lib/withSession";
import * as jwt from "jsonwebtoken";

export default withSessionRoute(loginRoute);

async function loginRoute(req: any, res: any) {
  // get user from database then:
  const data = req.body;

  const user = await database.user.findFirst({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    return res.status(400).send({
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(data.password, user.password!);

  if (!isMatch) {
    return res.status(400).send({
      message: "Invalid email or password",
    });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  await req.session.save();
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.KEEP_PASSWORD!,
    {
      algorithm: "HS256",
    }
  );
  res.status(200).json({
    id: user.id,
  });
}
