// Every error leaves the API in the same shape: { error: { code, message } }.
export function notFound(req, res) {
  res.status(404).json({
    error: { code: 'NOT_FOUND', message: `No route for ${req.method} ${req.originalUrl}` },
  });
}

// Express recognises an error handler by its four parameters, so `next` must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = Number.isInteger(err.status) ? err.status : 500;
  // Malformed JSON bodies arrive as status 400 from express.json().
  const code = err.code && typeof err.code === 'string' ? err.code : status === 500 ? 'INTERNAL_ERROR' : 'BAD_REQUEST';
  const message = status === 500 ? 'Something went wrong on the server.' : err.message;
  if (status === 500) console.error(err);
  res.status(status).json({ error: { code, message } });
}
