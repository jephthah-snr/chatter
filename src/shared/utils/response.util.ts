export const SuccessResponse = <T>(message: string, data?: T) => {
  return {
    success: true,
    message,
    data,
  };
};

export const ErrorResponse = (message: string, errors?: any[]) => {
  return {
    success: false,
    message,
    errors,
  };
};
