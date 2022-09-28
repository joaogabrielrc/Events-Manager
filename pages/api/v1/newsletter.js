function handler(request, response) {
  try {
    if (request.method === 'POST') {
      const { email } = request.body;

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

      if (badRequest.hasError) {
        return response
          .status(badRequest.status)
          .json(badRequest.message);
      }

      return response.status(201).json({ email });
    } else {
      return response.status(405).json('Method Not Allowed');
    }
  } catch (error) {
    return response.status(500).json('Something went wrong');
  }
}

export default handler;
