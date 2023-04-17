import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function getTotalContributions(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { username } = req.body
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_API_ACCESS_TOKEN}`,
    }

    const body = {
      query: `query {
            user(login: "${username}") {
              name
              contributionsCollection {
                contributionCalendar {
                  colors
                  totalContributions
                  weeks {
                    contributionDays {
                      color
                      contributionCount
                      date
                      weekday
                    }
                    firstDay
                  }
                }
              }
            }
          }`,
    }

    await axios({
      method: 'POST',
      url: `https://api.github.com/users/${username}`,
      headers: {
        Authorization: headers.Authorization,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-type, Authorization, X-Requested-With',
      },
      data: body,
    })
      .then((_res) => {
        return res.status(200).json({ data: _res.data, status: 'ok' })
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
