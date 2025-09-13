import  type {Request, Response } from 'express';
import db from "../db.js";

export const getAllDevotionals = (req: Request, res: Response) => {
    try{
        const statement =db.prepare(
            "SELECT *FROM devotionals WHERE deleted_at IS NULL OREDER BY created_aat DESC"
        );
        const devotionals = statement.all();
        res.status(200).json(devotionals);
    }catch (error) {
        res.status(500).json({ error: "Failed to retrieve devotionals."});
    }
    };

export const getDevotionalsById  = (req: Request, res:Response) => {
    try {getDevotionalsById
        const {id} = req.params;
        const statement = db.prepare(
            "SELECT FROM devotionals WHERE id = ? AND deleted_at IS NULL"
        );
        const devotional = statement.get(id);

        if(!devotional) {
            return res.status(404).json({error: "Devotional not found."});
        }
        res.status(200).json(devotional);
    }catch(error) {
        res.status(500).json({ error: "Failed to retrieve devotional."});
    }
};

export const createDevotional = (req: Request, res: Response) => {
    try {
        const { verse, content} = req.body;
        if (!verse || ! content) {
            return res.status(400).json({error: "Both verse and content are required"});
        }
        const statement = db.prepare(
            "INSERT INTO devotionals(verse, content) VALUES (?, ?)"
        );
        const result = statement.run(verse,content);
        res.status(201).json({
            message: "Devotional created successfully",
            id: result.lastInsertRowid,
            verse,
            content,});

        }catch(error) {
            res.status(500).json({ error: "Failed to created devotional."});
        }
        };
    
        export const updateDevotional = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ error: "Invalid id provided. Id must be a number." });
    }

    const { verse, content } = req.body;
    if (!verse && !content) {
      return res
        .status(400)
        .json({ error: "Either verse or content must be provided." });
    }

    if (verse) {
      db.prepare(
        "UPDATE devotionals SET verse = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL"
      ).run(verse, id);
    }
    if (content) {
      db.prepare(
        "UPDATE devotionals SET content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL"
      ).run(content, id);
    }

    const updated = db
      .prepare("SELECT * FROM devotionals WHERE id = ? AND deleted_at IS NULL")
      .get(id);

    res.status(200).json({
      message: `Devotional with id ${id} updated successfully`,
      devotional: updated,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update devotional." });
  }
};

// DELETE
export const deleteDevotional = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res
        .status(400)
        .json({ error: "Invalid id provided. Id must be a number." });
    }

    const statement = db.prepare(
      "UPDATE devotionals SET deleted_at = CURRENT_TIMESTAMP WHERE id = ? AND deleted_at IS NULL"
    );
    const result = statement.run(id);

    if (result.changes > 0) {
      res.status(204).send();
    } else {
      res
        .status(404)
        .json({ error: "Devotional not found or already deleted." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete devotional." });
  }
};


    

