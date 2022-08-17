import { database } from "lib/database";

export default async function handler(req: any, res: any) {
    try {
        const data = req.body;

        await database.keep.update({
            where: {
                id: data.keep_id,
            },
            data: {
                note: data.note,
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