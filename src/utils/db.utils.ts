import pool from "../db";

export const checkUserCandidate = async <T>(parameter: string | number) => {
  return (await pool.query(
    `select *
     from users
     where ${typeof parameter === "string" ? 'email' : 'id'} = $1`,
    [parameter])).rowCount === 1
}
