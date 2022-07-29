import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../utils/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {

    const {method} = req;

    switch (method) {
      case 'GET':
        // acesso ao mongodb(banco não relacional) e obter os usuarios do meu banco
        const{db} = await connectToDatabase() 
        const data = await db.collection('user').find().toArray();

        res.status(200).json(data);
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
    
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler