import { AxiosError } from "axios";

interface ErrorResponseProps {
  message: string;
  status: number;
}

export const errorResponse = (
  error: ErrorResponseProps | Error | AxiosError
) => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.data);
  }
  if (typeof error === "object") {
    return new Response(error.message, {
      status: "status" in error ? error.status : 500,
    });
  }
  if (typeof error === "string") {
    throw new Error(error);
  }
};
