import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    // get user_id from header
    try {
        const user_id = req.headers.user_id;
        const type = req.query?.type || "inbox";
        if (!user_id) {
            res.status(400).send({
                error: "user_id is required"
            });
            return;
        }
        const keep = await database.keep.findMany({
            where: {
                user_id,
                keep_type: type
            },
            include: {
                link: true
            },
            orderBy: {
                sort_no: "desc"
            }
        })
        res.json(keep);
    } catch (e) {
        console.log("err", e);
        res.status(500).send({
            error: "Something went wrong"
        });
    }
}