import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function checkuser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { username } = req.body
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
    }

    await axios({
      method: 'GET',
      url: `https://api.github.com/users/${username}`,
      headers: {
        Authorization: headers.Authorization,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        return res.status(200).json({ status: 'ok' })
      })
      .catch((err) => {
        return res.status(404).json({
          status: 'error',
          message: 'User not found',
          raw: err,
        })
      })
  }
}
