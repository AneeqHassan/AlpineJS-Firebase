import express from "express";
import { sql } from '../neon.js';
const router = express.Router();
export default router; 


router.get('/years',async (req,res)=>{
    const years = await sql
    `SELECT DISTINCT(year) 
    FROM recap 
    ORDER BY year;`
    res.status(200).json(years)
}); 

router.get('/semesters/:year',async (req,res)=>{
    const semesters = await sql
    `SELECT DISTINCT(semester) 
    FROM recap
    WHERE year = ${req.params.year} ORDER BY semester;`
    res.status(200).json(semesters)
}); 

router.get('/faculty/:year/:semester',async (req,res)=>{
    const faculty = await sql
    `SELECT DISTINCT(name), f.fid 
    FROM faculty f 
    JOIN recap r 
    ON f.fid=r.fid 
    WHERE semester = ${req.params.semester} AND year = ${req.params.year} ORDER BY name;`
    res.status(200).json(faculty)
}); 

router.get('/grades/:year/:semester/:faculty',async (req,res)=>{
    const grade = await sql
    `SELECT * ,  ROUND((CAST(total AS FLOAT) * 100 / CAST(SUM AS FLOAT)):: numeric, 2) per
    FROM (
    SELECT * , (
        SELECT SUM(total)
        FROM (
            SELECT g.grade, COUNT(g.grade) total 
            FROM cmarks m, grade g
            WHERE rid in 
            (SELECT rid 
            FROM faculty f 
            JOIN recap r 
            ON f.fid = r.fid 
            WHERE f.fid = ${req.params.faculty} 
            AND semester = ${req.params.semester} 
            AND year = ${req.params.year})
            AND hid = 246
            AND ROUND(marks) BETWEEN g.start AND g.end
            GROUP BY g.grade
            ORDER BY g.grade
        ) B
    ) SUM
    FROM (
        SELECT g.grade, COUNT(g.grade) total 
        FROM cmarks m, grade g
        WHERE m.rid in
        (SELECT rid 
        FROM faculty f 
        JOIN recap r 
        ON f.fid = r.fid 
        WHERE f.fid = ${req.params.faculty} 
        AND semester = ${req.params.semester} 
        AND year = ${req.params.year})
        AND hid = 246
        AND ROUND(marks) BETWEEN g.start AND g.end
        GROUP BY g.grade
    ) A
    ) C;`
    res.status(200).json(grade)
}); 
















