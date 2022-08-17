import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const user_id = req.headers.user_id;
        const data = req.body;


        const rows = await database.$executeRawUnsafe(`UPDATE "public"."keep"
        SET "sort_no" = "sort_no" - 1
        WHERE "user_id" = uuid($1) AND "sort_no" > (SELECT "sort_no" FROM "public"."keep" WHERE "id" = uuid($2) AND "keep_type" = $3)
        AND "keep_type" = $3`, user_id, data.keep_id, data.keep_type);
        console.log("rows", rows);
        await database.link.deleteMany({
            where: {
                keep_id: data.keep_id,
            }
        })
        await database.keep.deleteMany({
            where: {
                id: data.keep_id,
            }
        })

        return res.json({
            message: "success"
        })
    } catch (e) {
        console.log("err", e);
        res.status(500).send({
            error: "Something went wrong"
        });
    }
}