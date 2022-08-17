import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const user_id = req.headers.user_id;
        const {
            oldPosition,
            newPosition,
            keep_id,
            keep_type,
            move
        } = req.body


        if (move === "up") {
            await database.$executeRawUnsafe(`UPDATE "public"."keep"
            SET "sort_no" = "sort_no" - 1
            WHERE "sort_no" <= $2
            AND "sort_no" > $1
            AND "user_id" = uuid($3)
            AND "keep_type" = $4
            AND "id" <> uuid($5)`, oldPosition, newPosition, user_id, keep_type, keep_id)
        } else {
            await database.$executeRawUnsafe(`UPDATE "public"."keep"
            SET "sort_no" = "sort_no" + 1
            WHERE "sort_no" >= $2
            AND "sort_no" < $1
            AND "user_id" = uuid($4)
            AND "keep_type" = $5
            AND "id" <> uuid($3)`, oldPosition, newPosition, keep_id, user_id, keep_type)
        }

        await database.keep.update({
            where: {
                id: keep_id,
            },
            data: {
                sort_no: newPosition,
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