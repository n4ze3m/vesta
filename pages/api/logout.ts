import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "lib/withSession";
import { NextApiRequest, NextApiResponse } from "next";

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

function logoutRoute(req: NextApiRequest, res: NextApiResponse<any>) {
  req.session.destroy();
  res.redirect("/login");
}
