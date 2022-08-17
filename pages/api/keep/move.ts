import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const user_id = req.headers.user_id;
        const {
            keep_id,
            current_keep_type,
            new_keep_type
        } = req.body


        await database.$executeRawUnsafe(`UPDATE "public"."keep"
        SET "sort_no" = "sort_no" - 1
        WHERE "user_id" = uuid($2) AND "sort_no" > (SELECT "sort_no" FROM "public"."keep" WHERE "id" = uuid($1) AND "keep_type" = $3)
        AND "keep_type" = $3`, keep_id, user_id, current_keep_type)

        const query: any = await database.$queryRawUnsafe(`SELECT COALESCE(MAX("sort_no"), 0) + 1 FROM "public"."keep" WHERE "user_id" = uuid($1) AND "keep_type" = $2`, user_id, new_keep_type);
        const sort_no = Number(query[0]["?column?"])


        await database.keep.update({
            where: {
                id: keep_id
            },
            data: {
                keep_type: new_keep_type,
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