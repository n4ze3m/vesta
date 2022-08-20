import axios from "axios";
import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const user_id = req.headers.user_id;
        const data = req.body
        const url = `https://${process.env.SUPABASE_ID!}.functions.supabase.co/${process.env.SUPABASE_FUNC_NAME!}`
        const response = await axios.post(url, {
            url: data.note,
        })
        const link = response.data
        const query: any = await database.$queryRawUnsafe(`SELECT COALESCE(MAX("sort_no"), 0) + 1 FROM "public"."keep" WHERE "user_id" = uuid($1) AND "keep_type" = 'inbox'`, user_id);
        const sort_no = Number(query[0]["?column?"])
        const keep = await database.keep.create({
            data: {
                user_id,
                is_link: true,
                sort_no
            }
        })
        await database.link.create({
            data: {
                ...link,
                keep_id: keep.id,
            }
        })


        return res.json({
            message: "success"
        })


    } catch (e) {
        console.log("err", e);
        res.status(500).send({
            error: "Invalid url or something else went wrong"
        });
    }
}