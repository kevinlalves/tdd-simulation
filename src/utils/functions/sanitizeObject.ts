import stringStripHtml from 'string-strip-html';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeObject(object: any) {
  for (const key of Object.keys(object)) {
    if (typeof object[key] === 'string') {
      object[key] = stringStripHtml(object[key]).result.trim();
    } else if (typeof object[key] === 'object') {
      object[key] = sanitizeObject(object[key]);
    }
  }

  return object;
}

export default sanitizeObject;
