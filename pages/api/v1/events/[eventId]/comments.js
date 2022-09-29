import prisma from '../../../../../src/database/connect';

async function handler(request, response) {
  const { eventId } = request.query;

  try {
    if (request.method === 'GET') {
      const data = await prisma.comment.findMany({
        where: { eventId },
      });
      return response.status(200).json(data);
    }

    if (request.method === 'POST') {
      const { email, name, text } = request.body;

      let badRequest = {
        hasError: false,
        status: 400,
        message: {},
      };

      if (!email || !email.includes('@')) {
        badRequest.hasError = true;
        badRequest.message.email = 'invalid email';
      }

      if (!email || email.trim() === '') {
        badRequest.hasError = true;
        badRequest.message.email = 'email is required';
      }

      if (!name || name.trim() === '') {
        badRequest.hasError = true;
        badRequest.message.name = 'name is required';
      }

      if (!text || text.trim() === '') {
        badRequest.hasError = true;
        badRequest.message.text = 'text is required';
      }

      if (badRequest.hasError) {
        return response
          .status(badRequest.status)
          .json(badRequest.message);
      }

      const emailInstance = await prisma.email.findUnique({
        where: { email },
      });

      if (!emailInstance) {
        return response
          .status(400)
          .json({ message: 'email does not exists' });
      }

      const commentData = {
        email: {
          connect: { id: emailInstance.id },
        },
        name,
        text,
        eventId,
      };

      const data = await prisma.comment.create({
        data: commentData,
      });

      return response.status(201).json(data);
    }

    return response.status(405).json('Method Not Allowed');
  } catch (error) {
    return response.status(500).json('Something went wrong');
  }
}

export default handler;
