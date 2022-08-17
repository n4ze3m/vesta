import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const user_id = req.headers.user_id;
        const data = req.body

        const query:any = await database.$queryRawUnsafe(`SELECT COALESCE(MAX("sort_no"), 0) + 1 FROM "public"."keep" WHERE "user_id" = uuid($1) AND "keep_type" = 'inbox'`, user_id);
        const sort_no = Number(query[0]["?column?"])
        console.log("sort_no", sort_no);
        await database.keep.create({
            data: {
                ...data,
                user_id,
                sort_no
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