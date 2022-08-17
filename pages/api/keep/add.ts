import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const user_id = req.headers.user_id;
        const data = req.body;


        const sort_no = await database.keep.count({
            where: {
                keep_type: "inbox",
                user_id
            }
        })

        await database.keep.create({
            data: {
                ...data,
                user_id,
                sort_no: sort_no + 1,
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