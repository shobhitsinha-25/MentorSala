import { z } from "zod";

export const attachQuestionsSchema =
  z.object({

    questions: z
      .array(

        z.object({

          questionId:
            z.string(),

          displayOrder:
            z.number().min(1),

        })

      )

      .min(1),

  });

export type AttachQuestionsDto =
  z.infer<
    typeof attachQuestionsSchema
  >;

export const reorderQuestionsSchema =
  z.object({

    questions: z.array(

      z.object({

        questionId:
          z.string(),

        displayOrder:
          z.number().min(1),

      })

    ).min(1),

  });

export type ReorderQuestionsDto =
  z.infer<
    typeof reorderQuestionsSchema
  >;