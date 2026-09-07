import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";

const contactInput = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(5000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((value: unknown) => contactInput.parse(value))
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into contact_messages (name, email, message)
      values (${data.name}, ${data.email}, ${data.message})
    `;
    return { ok: true };
  });
