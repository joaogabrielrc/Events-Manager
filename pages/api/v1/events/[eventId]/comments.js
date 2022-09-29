import {
  createComment,
  findCommentsByEventId,
} from '../../../../../server/controllers/comments';

async function handler(request, response) {
  const { eventId } = request.query;

  try {
    if (request.method === 'GET') {
      const comments = await findCommentsByEventId(eventId);
      return response.status(200).json(comments);
    }

    if (request.method === 'POST') {
      const { email, name, text } = request.body;

      const { comment, error } = await createComment(
        { email, name, text },
        eventId
      );

      if (error) {
        return response.status(error.status).json(error.message);
      }

      return response.status(201).json(comment);
    }

    return response.status(405).json('Method Not Allowed');
  } catch (error) {
    return response.status(500).json('Something went wrong');
  }
}

export default handler;
