import prisma from '../database/connect';

async function findCommentsByEventId(eventId) {
  const data = await prisma.comment.findMany({
    where: { eventId },
  });
  return data;
}

async function createComment(comment, eventId) {
  let data;
  let error;

  const { email, name, text } = comment;

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
    error = {
      status: badRequest.status,
      message: badRequest.message,
    };
    return { data, error };
  }

  const emailInstance = await prisma.email.findUnique({
    where: { email },
  });

  if (!emailInstance) {
    error = {
      status: 400,
      message: 'email does not exists',
    };
    return { data, error };
  }

  const commentData = {
    email: {
      connect: { id: emailInstance.id },
    },
    name,
    text,
    eventId,
  };

  data = await prisma.comment.create({
    data: commentData,
  });

  return { data, error };
}

export { findCommentsByEventId, createComment };
