
export const receive = (type, field, item) => ({
  type,
  [field]: item
});

export const clear = type => ({
  type
});

export const ERRORS = "errors";