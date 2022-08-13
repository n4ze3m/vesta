import * as bcrypt from "bcrypt";
import { database } from "lib/database";
import { withSessionRoute } from "lib/withSession";
import * as jwt from "jsonwebtoken";
export default withSessionRoute(registerRoute);

async function registerRoute(req: any, res: any) {
  const data = req.body;
  const hashpassword = await bcrypt.hash(data.password, 12);
  const isEmailExist = await database.user.findFirst({
    where: {
      email: data.email,
    },
  });
  if (isEmailExist) {
    return res.status(400).json({
      message: "Email already exist",
    });
  }
  const user = await database.user.create({
    data: {
      ...data,
      password: hashpassword,
    },
  });

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.KEEP_PASSWORD!,
    {
      algorithm: "HS256",
    }
  );

  await req.session.save();
  res.status(200).json({
    id: user.id,
  });
}
