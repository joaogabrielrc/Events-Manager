import { v4 as uuidv4 } from 'uuid';

function handler(request, response) {
  try {
    if (request.method === 'GET') {
      const dummyData = [
        {
          id: uuidv4(),
          name: 'Max',
          text: 'A first comment.',
        },
        {
          id: uuidv4(),
          name: 'John',
          text: 'Very nice!',
        },
      ];

      return response.status(200).json(dummyData);
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

      const comment = {
        id: uuidv4(),
        email,
        name,
        text,
      };

      return response.status(201).json(comment);
    }

    return response.status(405).json('Method Not Allowed');
  } catch (error) {
    return response.status(500).json('Something went wrong');
  }
}

export default handler;
