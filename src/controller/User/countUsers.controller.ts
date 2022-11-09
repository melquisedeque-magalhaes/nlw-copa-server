import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { countUserService } from "../../service/User/countUser.service";

export async function countUserController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { count } = await countUserService()

    return {
      count
    }
  }catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: err.issues[0].code,
        message: err.issues[0].message
      })
    }

    if(err instanceof Error){
      return reply.status(400).send({
        message: err?.message
      })
    }
  }
  
}