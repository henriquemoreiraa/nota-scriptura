interface ErrorResponseProps {
  message: string;
  status: number;
}

export const errorResponse = (error: ErrorResponseProps | Error) => {
  if (typeof error === "object") {
    return new Response(error.message, {
      status: "status" in error ? error.status : 500,
    });
  }
};
